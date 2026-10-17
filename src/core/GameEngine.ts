import { type GameState, MAX_AMOUNT, createInitialState } from './GameState.ts';
import { AGENTS, type AgentDef, getTeamTierMultiplier } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';
import { REFERENCES, REFERENCE_INCOME_BONUS, type ReferenceCondition } from '../config/references.ts';
import { ACADEMY_LESSONS, LEGACY_ACADEMY_MAP, type AcademyEffect, type AcademyLesson, type LessonCondition } from '../config/academy.ts';
import {
  REPUTATION_PERKS, getPrestigeRP, NOTORIETE_IDS, NOTORIETE_MAX_LEVEL, NOTORIETE_INCOME_PER_LEVEL, getNotorieteCost,
  PRESTIGE_V2_KEY,
} from '../config/reputationPerks.ts';

const PRESTIGE_BASE           = 10_000_000; // atteint juste après le dernier client (~30 min la 1re partie)
const PRESTIGE_EXPONENT       = 4;    // seuil = base × (1 + ventes)^4 : fort au début, puis de plus en plus doux
const LEGACY_PRESTIGE_SCALE   = 1.5;  // seuil 1.1, plafond de transition tant que rep-seuil-v2 n'est pas posée
const PRESTIGE_BONUS_PER_LEVEL = 0.15;
const BASE_CLICK_VALUE         = 1;  // 10 clics pour le premier agent (10 €)
const MAX_OFFLINE_HOURS        = 8;
const ECHO_REPLAY_SECONDS      = 60;
const MAX_BULK_BUY             = 1_000; // garde-fou du mode d'achat « max »

export interface TickResult {
  newClients: string[];
}

/** Somme plafonnée à MAX_AMOUNT : jamais d'Infinity ni de NaN dans l'état. */
function addCapped(a: number, b: number): number {
  const sum = a + b;
  if (Number.isNaN(sum)) return a;
  return Math.min(sum, MAX_AMOUNT);
}

export class GameEngine {
  // ─── PRODUTION ─────────────────────────────────────────────

  getPrestigeMultiplier(state: GameState): number {
    return 1 + state.prestigeCount * PRESTIGE_BONUS_PER_LEVEL;
  }

  getGlobalUpgradeMultiplier(state: GameState): number {
    return UPGRADES.filter(u =>
      state.upgradesPurchased[u.id] && u.effect.type === 'global_multiplier'
    ).reduce((acc, u) => {
      return acc * (u.effect.type === 'global_multiplier' ? u.effect.multiplier : 1);
    }, 1);
  }

  getAgentMultiplier(state: GameState, agentId: string): number {
    const upgrades = UPGRADES.filter(u =>
      state.upgradesPurchased[u.id] &&
      u.effect.type === 'agent_multiplier' &&
      u.effect.agentId === agentId
    ).reduce((acc, u) => {
      return acc * (u.effect.type === 'agent_multiplier' ? u.effect.multiplier : 1);
    }, 1);
    const lessons = this.academyEffects(state, 'agent_multiplier')
      .reduce((acc, e) => e.agentId === agentId ? acc * e.multiplier : acc, 1);
    return upgrades * lessons;
  }

  /** Synergies achetées (ex. Orchestration) : chaque agent source renforce les autres types. */
  getSynergyMultiplier(state: GameState, agentId: string): number {
    return UPGRADES.reduce((acc, u) => {
      if (!state.upgradesPurchased[u.id] || u.effect.type !== 'synergy' || u.effect.sourceAgentId === agentId) return acc;
      const sources = state.agents[u.effect.sourceAgentId]?.count ?? 0;
      return acc * (1 + u.effect.perUnit * sources);
    }, 1);
  }

  getAgentProduction(state: GameState, def: AgentDef): number {
    const count = state.agents[def.id]?.count ?? 0;
    if (count === 0) return 0;
    const agentMult = this.getAgentMultiplier(state, def.id);
    return def.baseProduction * count * agentMult * getTeamTierMultiplier(count)
      * this.getSynergyMultiplier(state, def.id);
  }

  /** Multiplicateur des bonus clients (ex. Clients récurrents). */
  getClientMultiplier(state: GameState): number {
    return UPGRADES.reduce((acc, u) =>
      state.upgradesPurchased[u.id] && u.effect.type === 'client_multiplier' ? acc * u.effect.multiplier : acc, 1)
      * this.academyEffects(state, 'client_multiplier').reduce((acc, e) => acc * e.multiplier, 1);
  }

  getClientBonus(state: GameState): number {
    return CLIENTS.filter(c => state.clientsUnlocked[c.id])
      .reduce((acc, c) => acc + c.bonusPerSecond, 0) * this.getClientMultiplier(state);
  }

  // ─── NOUVEAUX MARCHÉS (réservés aux parties après un prestige) ─

  /** L'agent peut-il être recruté dans cette partie (prestiges requis atteints) ? */
  isAgentAvailable(state: GameState, agentId: string): boolean {
    const def = AGENTS.find(a => a.id === agentId);
    return !!def && state.prestigeCount >= (def.minPrestige ?? 0);
  }

  /** Le client peut-il signer dans cette partie (prestiges requis atteints) ? */
  isClientAvailable(state: GameState, clientId: string): boolean {
    const def = CLIENTS.find(c => c.id === clientId);
    return !!def && state.prestigeCount >= (def.minPrestige ?? 0);
  }

  getTotalRate(state: GameState, marketMult = 1): number {
    const agentProd = AGENTS.reduce(
      (acc, def) => acc + this.getAgentProduction(state, def), 0
    );
    const clientBonus   = this.getClientBonus(state);
    return (agentProd + clientBonus) * this.getIncomeMultiplier(state) * marketMult;
  }

  /**
   * Production des agents seuls (hors bonus clients et hors événement de marché).
   * Sert au déblocage des clients : inclure leurs bonus créait une cascade
   * où chaque client débloquait immédiatement le suivant.
   */
  getAgentRate(state: GameState): number {
    const agentProd = AGENTS.reduce(
      (acc, def) => acc + this.getAgentProduction(state, def), 0
    );
    return agentProd * this.getIncomeMultiplier(state);
  }

  /** Multiplicateurs permanents de revenu : upgrades globaux × prestige × réputation × Academy × références. */
  private getIncomeMultiplier(state: GameState): number {
    return this.getGlobalUpgradeMultiplier(state)
      * this.getPrestigeMultiplier(state)
      * this.getReputationIncomeMult(state)
      * this.academyEffects(state, 'global_multiplier').reduce((acc, e) => acc * e.multiplier, 1)
      * this.getReferenceIncomeMult(state);
  }

  // ─── CLIC ──────────────────────────────────────────────────

  /** Part de la production des agents ajoutée à chaque clic (Copilote : 0.02). */
  getClickShare(state: GameState): number {
    return UPGRADES.reduce((acc, u) =>
      state.upgradesPurchased[u.id] && u.effect.type === 'click_share' ? acc + u.effect.share : acc, 0)
      + this.academyEffects(state, 'click_share').reduce((acc, e) => acc + e.share, 0);
  }

  getClickValue(state: GameState, marketClickMult = 1): number {
    const clickMult = UPGRADES.filter(u =>
      state.upgradesPurchased[u.id] && u.effect.type === 'click_multiplier'
    ).reduce((acc, u) => {
      return acc * (u.effect.type === 'click_multiplier' ? u.effect.multiplier : 1);
    }, 1);
    const prestigeMult = this.getPrestigeMultiplier(state);
    const repClickMult = this.getReputationClickMult(state);
    const acadClickMult = this.academyEffects(state, 'click_multiplier').reduce((acc, e) => acc * e.multiplier, 1);
    const base = BASE_CLICK_VALUE * clickMult * prestigeMult * repClickMult * acadClickMult;
    const share = this.getClickShare(state);
    const copilot = share > 0 ? share * this.getAgentRate(state) : 0;
    return (base + copilot) * marketClickMult;
  }

  click(state: GameState, marketClickMult = 1): GameState {
    return this.earn(state, this.getClickValue(state, marketClickMult));
  }

  /**
   * Ajoute un gain à la trésorerie et au total gagné, plafonnés à MAX_AMOUNT.
   * Passage obligé de tout revenu (clic, tick, hors ligne, contrats, incidents, Academy).
   */
  earn(state: GameState, amount: number): GameState {
    if (!(amount > 0)) return state;
    return {
      ...state,
      currency: addCapped(state.currency, amount),
      totalEarned: addCapped(state.totalEarned, amount),
    };
  }

  // ─── AGENTS ────────────────────────────────────────────────

  getAgentCost(state: GameState, agentId: string): number {
    const def = AGENTS.find(a => a.id === agentId)!;
    const count = state.agents[agentId]?.count ?? 0;
    const base = def.baseCost * Math.pow(def.costMultiplier, count);
    return base * (1 - this.getAgentDiscount(state));
  }

  /** Réduction totale du prix des agents : réputation (−20 %) puis Academy (−10 %), cumulées. */
  getAgentDiscount(state: GameState): number {
    const lessons = this.academyEffects(state, 'agent_discount').reduce((acc, e) => acc * (1 - e.reduction), 1);
    return 1 - (1 - this.getReputationAgentDiscount(state)) * lessons;
  }

  canBuyAgent(state: GameState, agentId: string): boolean {
    return this.isAgentAvailable(state, agentId) && state.currency >= this.getAgentCost(state, agentId);
  }

  buyAgent(state: GameState, agentId: string): GameState {
    if (!this.canBuyAgent(state, agentId)) return state;
    const cost = this.getAgentCost(state, agentId);
    return {
      ...state,
      currency: state.currency - cost,
      agents: {
        ...state.agents,
        [agentId]: { count: (state.agents[agentId]?.count ?? 0) + 1 },
      },
    };
  }

  /** Coût cumulé de `n` agents achetés d'affilée (série géométrique du prix). */
  getAgentBulkCost(state: GameState, agentId: string, n: number): number {
    if (n <= 0) return 0;
    const def = AGENTS.find(a => a.id === agentId)!;
    const first = this.getAgentCost(state, agentId);
    const m = def.costMultiplier;
    return m === 1 ? first * n : first * (Math.pow(m, n) - 1) / (m - 1);
  }

  /** Nombre d'agents qu'on peut acheter d'affilée avec la trésorerie actuelle (plafonné). */
  getAffordableAgentCount(state: GameState, agentId: string): number {
    if (!this.isAgentAvailable(state, agentId)) return 0;
    const def = AGENTS.find(a => a.id === agentId)!;
    let price = this.getAgentCost(state, agentId);
    let budget = state.currency;
    let n = 0;
    while (n < MAX_BULK_BUY && budget >= price) {
      budget -= price;
      price *= def.costMultiplier;
      n++;
    }
    return n;
  }

  /** Achète jusqu'à `n` agents, un par un (chaque achat est validé comme un achat simple). */
  buyAgents(state: GameState, agentId: string, n: number): GameState {
    let next = state;
    for (let i = 0; i < Math.min(n, MAX_BULK_BUY); i++) {
      const after = this.buyAgent(next, agentId);
      if (after === next) break;
      next = after;
    }
    return next;
  }

  // ─── UPGRADES ──────────────────────────────────────────────

  isUpgradeVisible(state: GameState, upgradeId: string): boolean {
    const def = UPGRADES.find(u => u.id === upgradeId)!;
    if (state.prestigeCount < (def.minPrestige ?? 0)) return false; // invisible avant le prestige requis
    if (!def.requiresAgentId) return true;
    const count = state.agents[def.requiresAgentId]?.count ?? 0;
    return count >= (def.requiresAgentCount ?? 1);
  }

  canBuyUpgrade(state: GameState, upgradeId: string): boolean {
    if (state.upgradesPurchased[upgradeId]) return false;
    const def = UPGRADES.find(u => u.id === upgradeId)!;
    return state.currency >= def.cost && this.isUpgradeVisible(state, upgradeId);
  }

  buyUpgrade(state: GameState, upgradeId: string): GameState {
    if (!this.canBuyUpgrade(state, upgradeId)) return state;
    const def = UPGRADES.find(u => u.id === upgradeId)!;
    return {
      ...state,
      currency: state.currency - def.cost,
      upgradesPurchased: { ...state.upgradesPurchased, [upgradeId]: true },
    };
  }

  // ─── TICK ──────────────────────────────────────────────────

  tick(state: GameState, deltaSeconds: number, marketMult = 1): { state: GameState; result: TickResult } {
    const rate = this.getTotalRate(state, marketMult);
    const earned = rate * deltaSeconds;
    const prevClientStates = { ...state.clientsUnlocked };

    // Unlock clients automatically — sur la production des agents seuls
    const agentRate = this.getAgentRate(state);
    const newClientStates = { ...state.clientsUnlocked };
    CLIENTS.forEach(c => {
      if (!newClientStates[c.id] && agentRate >= c.unlockRateRequired && state.prestigeCount >= (c.minPrestige ?? 0)) {
        newClientStates[c.id] = true;
      }
    });

    const newClients = CLIENTS
      .filter(c => newClientStates[c.id] && !prevClientStates[c.id])
      .map(c => c.id);

    const newState: GameState = {
      ...this.earn(state, earned),
      clientsUnlocked: newClientStates,
    };

    return { state: newState, result: { newClients } };
  }

  // ─── OFFLINE ───────────────────────────────────────────────

  applyOfflineEarnings(state: GameState, seconds: number): { state: GameState; earned: number } {
    const capped = Math.min(seconds, this.getMaxOfflineHours(state) * 3600);
    const rate = this.getTotalRate(state);
    const offlineRate = this.getOfflineRate(state);
    const earned = Math.min(rate * capped * offlineRate, MAX_AMOUNT);
    if (!(earned > 0)) return { state, earned: 0 };
    return { state: this.earn(state, earned), earned };
  }

  // ─── PRESTIGE ──────────────────────────────────────────────

  /**
   * Objectif de vente de la partie : 10 M€ × (1 + ventes)^4. Pour une partie commencée en 1.1
   * (clé de transition absente), l'ancien seuil ×1,5 par vente reste un plafond.
   */
  getPrestigeThreshold(state: GameState): number {
    const n = state.prestigeCount;
    const v2 = PRESTIGE_BASE * Math.pow(1 + n, PRESTIGE_EXPONENT);
    if (state.reputationPurchased?.[PRESTIGE_V2_KEY]) return Math.round(v2);
    return Math.round(Math.min(v2, PRESTIGE_BASE * Math.pow(LEGACY_PRESTIGE_SCALE, n)));
  }

  canPrestige(state: GameState): boolean {
    return state.totalEarned >= this.getPrestigeThreshold(state);
  }

  getPrestigeProgress(state: GameState): number {
    return Math.min(state.totalEarned / this.getPrestigeThreshold(state), 1);
  }

  /** RP gagnés en vendant maintenant (au minimum ceux du seuil), × 1,25 avec la leçon « Petit ou grand modèle ? ». */
  getPrestigeRP(state: GameState): number {
    const threshold = this.getPrestigeThreshold(state);
    const base = getPrestigeRP(Math.max(state.totalEarned, threshold), threshold, state.prestigeCount);
    const mult = this.academyEffects(state, 'rp_multiplier').reduce((acc, e) => acc * e.multiplier, 1);
    return Math.floor(base * mult);
  }

  /** Objectif de la partie suivante, calculé comme après la vente (clé de transition posée). */
  getNextPrestigeThreshold(state: GameState): number {
    return this.getPrestigeThreshold({
      ...state,
      prestigeCount: state.prestigeCount + 1,
      reputationPurchased: { ...state.reputationPurchased, [PRESTIGE_V2_KEY]: true },
    });
  }

  prestige(state: GameState): GameState {
    if (!this.canPrestige(state)) return state;
    const newPrestigeCount = state.prestigeCount + 1;
    const earnedRP         = this.getPrestigeRP(state);
    const startBonus       = this.getReputationStartBonus(state);

    // Agents, clients et améliorations repartent de zéro, avec tous les ids de la config
    // (y compris ceux des nouveaux marchés) ; seule la réputation survit.
    const blank = createInitialState();
    const fresh: GameState = {
      currency:          startBonus,
      totalEarned:       startBonus,
      prestigeCount:     newPrestigeCount,
      agents:            blank.agents,
      clientsUnlocked:   blank.clientsUnlocked,
      upgradesPurchased: blank.upgradesPurchased,
      lastSave:          Date.now(),
      // Réputation : survit au prestige
      reputationPoints:    (state.reputationPoints ?? 0) + earnedRP,
      // La 1re vente faite en 1.2 pose la clé de transition : la partie suivante a le nouveau seuil
      reputationPurchased: { ...(state.reputationPurchased ?? {}), [PRESTIGE_V2_KEY]: true },
    };
    return fresh;
  }

  // ─── RÉPUTATION ────────────────────────────────────────────

  hasRepPerk(state: GameState, perkId: string): boolean {
    return !!(state.reputationPurchased?.[perkId]);
  }

  canBuyRepPerk(state: GameState, perkId: string): boolean {
    const perk = REPUTATION_PERKS.find(p => p.id === perkId);
    if (!perk || this.hasRepPerk(state, perkId)) return false;
    return (state.reputationPoints ?? 0) >= perk.cost;
  }

  buyRepPerk(state: GameState, perkId: string): GameState {
    if (!this.canBuyRepPerk(state, perkId)) return state;
    const perk = REPUTATION_PERKS.find(p => p.id === perkId)!;
    return {
      ...state,
      reputationPoints: (state.reputationPoints ?? 0) - perk.cost,
      reputationPurchased: { ...(state.reputationPurchased ?? {}), [perkId]: true },
    };
  }

  getReputationIncomeMult(state: GameState): number {
    const expertise = this.hasRepPerk(state, 'rep-income-x125') ? 1.25 : 1;
    return expertise * (1 + NOTORIETE_INCOME_PER_LEVEL * this.getNotorieteLevel(state));
  }

  // ─── NOTORIÉTÉ ─────────────────────────────────────────────

  /** Niveau de Notoriété : nombre de clés `rep-notoriete-<n>` achetées. */
  getNotorieteLevel(state: GameState): number {
    return NOTORIETE_IDS.filter(id => state.reputationPurchased?.[id]).length;
  }

  /** La Notoriété s'ouvre une fois tous les bonus de réputation de base acquis. */
  isNotorieteOpen(state: GameState): boolean {
    return REPUTATION_PERKS.every(p => this.hasRepPerk(state, p.id));
  }

  /** Coût en RP du prochain niveau de Notoriété (Infinity au dernier niveau). */
  getNextNotorieteCost(state: GameState): number {
    const level = this.getNotorieteLevel(state);
    return level >= NOTORIETE_MAX_LEVEL ? Infinity : getNotorieteCost(level + 1);
  }

  canBuyNotoriete(state: GameState): boolean {
    return this.isNotorieteOpen(state) && (state.reputationPoints ?? 0) >= this.getNextNotorieteCost(state);
  }

  buyNotoriete(state: GameState): GameState {
    if (!this.canBuyNotoriete(state)) return state;
    const next = NOTORIETE_IDS.find(id => !state.reputationPurchased?.[id])!;
    return {
      ...state,
      reputationPoints: (state.reputationPoints ?? 0) - this.getNextNotorieteCost(state),
      reputationPurchased: { ...(state.reputationPurchased ?? {}), [next]: true },
    };
  }

  getReputationClickMult(state: GameState): number {
    return this.hasRepPerk(state, 'rep-click-x2') ? 2 : 1;
  }

  getReputationAgentDiscount(state: GameState): number {
    return this.hasRepPerk(state, 'rep-agent-discount') ? 0.2 : 0;
  }

  getReputationOfflineRate(state: GameState): number {
    return this.hasRepPerk(state, 'rep-offline-rate') ? 0.75 : 0.5;
  }

  getReputationStartBonus(state: GameState): number {
    return this.hasRepPerk(state, 'rep-start-bonus') ? 2_000 : 0;
  }

  getReputationContractBonus(state: GameState): number {
    return this.hasRepPerk(state, 'rep-contract-bonus') ? 1.25 : 1;
  }

  getReputationExtraSlot(state: GameState): boolean {
    return this.hasRepPerk(state, 'rep-contract-slot');
  }

  getReputationEchoCooldownMult(state: GameState): number {
    return this.hasRepPerk(state, 'rep-echo-boost') ? 0.5 : 1;
  }

  // ─── ACADEMY (arbre de recherche) ──────────────────────────

  /** Bonus des leçons acquises, filtrés par type. */
  private academyEffects<T extends AcademyEffect['type']>(state: GameState, type: T): Extract<AcademyEffect, { type: T }>[] {
    const out: Extract<AcademyEffect, { type: T }>[] = [];
    for (const l of ACADEMY_LESSONS) {
      if (l.effect.type === type && state.reputationPurchased?.[l.id]) out.push(l.effect as Extract<AcademyEffect, { type: T }>);
    }
    return out;
  }

  isLessonLearned(state: GameState, lessonId: string): boolean {
    return !!state.reputationPurchased?.[lessonId];
  }

  getLearnedLessonCount(state: GameState): number {
    return ACADEMY_LESSONS.filter(l => this.isLessonLearned(state, l.id)).length;
  }

  /** Les leçons prérequises sont-elles toutes acquises ? */
  areLessonPrereqsMet(state: GameState, lesson: AcademyLesson): boolean {
    return lesson.requires.every(id => this.isLessonLearned(state, id));
  }

  isLessonConditionMet(state: GameState, c: LessonCondition): boolean {
    switch (c.type) {
      case 'agents':   return (state.agents[c.agentId]?.count ?? 0) >= c.count;
      case 'clients':  return this.getUnlockedClientCount(state) >= c.count;
      case 'prestige': return state.prestigeCount >= c.count;
    }
  }

  /** La leçon peut-elle être étudiée (prérequis acquis, conditions de jeu remplies, pas encore acquise) ? */
  canStudyLesson(state: GameState, lessonId: string): boolean {
    const lesson = ACADEMY_LESSONS.find(l => l.id === lessonId);
    if (!lesson || this.isLessonLearned(state, lessonId)) return false;
    return this.areLessonPrereqsMet(state, lesson) && lesson.conditions.every(c => this.isLessonConditionMet(state, c));
  }

  canLearnLesson(state: GameState, lessonId: string): boolean {
    const lesson = ACADEMY_LESSONS.find(l => l.id === lessonId);
    return !!lesson && this.canStudyLesson(state, lessonId) && state.currency >= lesson.cost;
  }

  /** Bonne réponse : la leçon est payée en euros de la partie et acquise pour toujours. */
  learnLesson(state: GameState, lessonId: string): GameState {
    if (!this.canLearnLesson(state, lessonId)) return state;
    const lesson = ACADEMY_LESSONS.find(l => l.id === lessonId)!;
    return {
      ...state,
      currency: state.currency - lesson.cost,
      reputationPurchased: { ...state.reputationPurchased, [lessonId]: true },
    };
  }

  /**
   * Report gratuit des réussites de l'ancienne Academy (clé `bot-empire-academy`).
   * Idempotent : ne renvoie que les leçons nouvellement reportées.
   */
  migrateLegacyAcademy(state: GameState, completedIds: readonly string[]): { state: GameState; migrated: string[] } {
    const migrated = completedIds
      .map(id => LEGACY_ACADEMY_MAP[id])
      .filter((id): id is string => !!id && !this.isLessonLearned(state, id));
    if (!migrated.length) return { state, migrated };
    const reputationPurchased = { ...state.reputationPurchased };
    for (const id of migrated) reputationPurchased[id] = true;
    return { state: { ...state, reputationPurchased }, migrated };
  }

  /** Revenu hors ligne : 50 % (75 % avec la réputation), + 10 points avec la leçon « backoff ». */
  getOfflineRate(state: GameState): number {
    return this.getReputationOfflineRate(state)
      + this.academyEffects(state, 'offline_rate').reduce((acc, e) => acc + e.points, 0);
  }

  /** Plafond du hors ligne : 8 h, 12 h avec la leçon « condition d'arrêt ». */
  getMaxOfflineHours(state: GameState): number {
    return this.academyEffects(state, 'offline_cap').reduce((acc, e) => Math.max(acc, e.hours), MAX_OFFLINE_HOURS);
  }

  /** Durée de rejeu de l'Écho (s). */
  getEchoReplaySeconds(state: GameState): number {
    return this.academyEffects(state, 'echo_replay').reduce((acc, e) => Math.max(acc, e.seconds), ECHO_REPLAY_SECONDS);
  }

  /** Durée de travail des contrats (multiplicateur). */
  getContractWorkTimeMult(state: GameState): number {
    return this.academyEffects(state, 'contract_speed').reduce((acc, e) => acc * e.factor, 1);
  }

  /** Récompense des contrats : réputation (×1,25) et Academy (×1,25), cumulées. */
  getContractRewardMult(state: GameState): number {
    return this.getReputationContractBonus(state)
      * this.academyEffects(state, 'contract_reward').reduce((acc, e) => acc * e.multiplier, 1);
  }

  /** Emplacements de contrat en plus des 3 de base (réputation, Academy). */
  getExtraContractSlots(state: GameState): number {
    return (this.getReputationExtraSlot(state) ? 1 : 0) + this.academyEffects(state, 'contract_slot').length;
  }

  /** Multiplicateur d'un événement de marché après la leçon « injection » : la perte est divisée par 2. */
  getEffectiveMarketMult(state: GameState, mult: number): number {
    if (mult >= 1 || !this.academyEffects(state, 'market_soften').length) return mult;
    return 1 - (1 - mult) / 2;
  }

  /** Intervalle entre deux lettres ambre (multiplicateur, 0,8 avec la leçon « streaming »). */
  getLeadIntervalMult(state: GameState): number {
    return this.academyEffects(state, 'lead_frequency').reduce((acc, e) => acc * e.factor, 1);
  }

  /** Affichage « rentabilisé en X » (leçon « le prix d'un token »). */
  hasPaybackDisplay(state: GameState): boolean {
    return this.academyEffects(state, 'payback').length > 0;
  }

  /** Niveau de Délégation (0, I ou II) donné par l'arbre. */
  getDelegationLevel(state: GameState): 0 | 1 | 2 {
    return this.academyEffects(state, 'delegation').reduce<0 | 1 | 2>((acc, e) => (e.level > acc ? e.level : acc), 0);
  }

  // ─── CARNET DE RÉFÉRENCES ──────────────────────────────────

  getReferenceCount(state: GameState): number {
    return REFERENCES.filter(r => state.reputationPurchased?.[r.id]).length;
  }

  /** +0,5 % de revenu par référence obtenue. */
  getReferenceIncomeMult(state: GameState): number {
    return 1 + REFERENCE_INCOME_BONUS * this.getReferenceCount(state);
  }

  /** La condition d'une référence est-elle remplie ? `letters` : lettres ambre attrapées (statistiques locales). */
  isReferenceConditionMet(state: GameState, c: ReferenceCondition, letters: number): boolean {
    switch (c.type) {
      case 'agents':   return (state.agents[c.agentId]?.count ?? 0) >= c.count;
      case 'client':   return !!state.clientsUnlocked[c.clientId];
      case 'prestige': return state.prestigeCount >= c.count;
      case 'lessons':  return this.getLearnedLessonCount(state) >= c.count;
      case 'letters':  return letters >= c.count;
    }
  }

  /** Références nouvellement obtenues (condition remplie, pas encore dans le carnet). */
  getNewReferences(state: GameState, letters: number): string[] {
    return REFERENCES
      .filter(r => !state.reputationPurchased?.[r.id] && this.isReferenceConditionMet(state, r.condition, letters))
      .map(r => r.id);
  }

  /** Ajoute des références au carnet (clés ref-* de reputationPurchased, gardées pour toujours). */
  grantReferences(state: GameState, ids: readonly string[]): GameState {
    if (!ids.length) return state;
    const reputationPurchased = { ...state.reputationPurchased };
    for (const id of ids) reputationPurchased[id] = true;
    return { ...state, reputationPurchased };
  }

  // ─── STATS ─────────────────────────────────────────────────

  getTotalAgentCount(state: GameState): number {
    return Object.values(state.agents).reduce((acc, a) => acc + a.count, 0);
  }

  getUnlockedClientCount(state: GameState): number {
    return Object.values(state.clientsUnlocked).filter(Boolean).length;
  }

  getPurchasedUpgradeCount(state: GameState): number {
    return Object.values(state.upgradesPurchased).filter(Boolean).length;
  }
}
