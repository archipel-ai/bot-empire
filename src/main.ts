/**
 * Bot Empire — Main entry point
 * Stack: Vanilla TypeScript + Vite (pas de Phaser — les idle games sont DOM-natifs)
 */

import './style.css';
import { GameEngine } from './core/GameEngine.ts';
import { SaveSystem } from './core/SaveSystem.ts';
import { type GameState } from './core/GameState.ts';
import { Renderer, type BuyMode } from './ui/Renderer.ts';
import { Bureau } from './ui/Bureau.ts';
import { formatCurrency, formatCurrencyCompact, formatDuration, setText } from './utils/format.ts';
import { playClick, playPurchase, playClientUnlock, playMilestone, playPrestige, playLead, isSoundOn, setSoundOn } from './utils/audio.ts';
import { EchoSystem } from './systems/EchoSystem.ts';
import { IncidentSystem, getIncidentReward, type IncidentQuestion } from './systems/IncidentSystem.ts';
import { LeadSystem } from './systems/LeadSystem.ts';
import {
  runDelegation, getDelegableAgentIds, loadDelegationSettings, saveDelegationSettings, DELEGATION_PERIOD_S,
} from './systems/DelegationSystem.ts';
import { LeadLetter } from './ui/LeadLetter.ts';
import { StatsSystem } from './systems/StatsSystem.ts';
import { REFERENCES, REFERENCE_INCOME_BONUS, type ReferenceDef } from './config/references.ts';
import { Hints, type HintId } from './ui/Hints.ts';
import { Drawer, PHONE_QUERY } from './ui/Drawer.ts';
import { CLIENTS } from './config/clients.ts';
import { UPGRADES } from './config/upgrades.ts';
import { CloudSave } from './core/CloudSave.ts';
import { FIREBASE_CONFIG, CLOUD_SAVE_ENABLED } from './config/firebase.ts';
import { ContractSystem, CONTRACT_REWARD_SECONDS, type ActiveContract } from './systems/ContractSystem.ts';
import { MarketSystem } from './systems/MarketSystem.ts';
import { AcademySystem } from './systems/AcademySystem.ts';
import {
  ACADEMY_LESSONS, ACADEMY_BRANCHES, XP_PER_LESSON, getAcademyGrade,
  type AcademyLesson, type AcademyEffect, type LessonCondition,
} from './config/academy.ts';
import type { UiKey } from './i18n/ui.ts';
import { REPUTATION_PERKS, NOTORIETE_IDS, NOTORIETE_INCOME_PER_LEVEL } from './config/reputationPerks.ts';
import { spawnInkLetters, flashScreen } from './utils/gamefeel.ts';
import { formatRate, formatMultiplier, formatNumber } from './utils/format.ts';
import { AGENTS, TEAM_TIERS, getTeamTier, getTeamTierMultiplier } from './config/agents.ts';
import { LANG, setLang, t, translateStaticDom } from './i18n/i18n.ts';
import { applyContentLanguage } from './i18n/content.ts';
import { icon, hydrateIcons, PERK_ICONS } from './ui/icons.ts';

// ─── LANGUE ──────────────────────────────────────────────────
// Avant toute création de système : les configs sont traduites en place.
applyContentLanguage();
translateStaticDom();
hydrateIcons();

// ─── INIT ────────────────────────────────────────────────────

const saveSystem  = new SaveSystem();
const engine      = new GameEngine();
const renderer    = new Renderer(engine);
const bureau      = new Bureau();
const echo        = new EchoSystem();
const incident    = new IncidentSystem();
const hints       = new Hints();
new Drawer();
const cloud       = new CloudSave();
const contractSys = new ContractSystem();
contractSys.setRateProvider(s => engine.getTotalRate(s));
const market      = new MarketSystem();
const academy     = new AcademySystem();
const lead        = new LeadSystem();
const leadLetter  = new LeadLetter(() => catchLead());
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const stats       = new StatsSystem();
const GAME_VERSION = '1.2';
const REFERENCE_CHECK_S = 1; // le carnet vérifie ses conditions une fois par seconde
const REFERENCE_GROUP_FROM = 3; // à partir de 3 références d'un coup (1re visite en 1.2) : une seule notification
let referenceTimer = 0;
const delegation  = loadDelegationSettings();
let delegationTimer = 0;
renderer.agentsHeader = delegationPanel;

// Marché IA Vivant — éléments bannière
const marketBanner     = document.getElementById('market-banner')!;
const marketBannerIcon = document.getElementById('market-banner-icon')!;
const marketBannerName = document.getElementById('market-banner-name')!;
const marketBannerDesc = document.getElementById('market-banner-desc')!;
const marketBannerEff  = document.getElementById('market-banner-effect')!;
const marketBannerTime = document.getElementById('market-banner-timer')!;

function marketEffectLabel(type: 'income' | 'click', raw: number): string {
  if (type === 'click') return t('market.click', { mult: raw });
  const mult = engine.getEffectiveMarketMult(state, raw); // leçon « injection » : perte divisée par 2
  return mult >= 1
    ? t('market.incomeUp',   { n: Math.round((mult - 1) * 100) })
    : t('market.incomeDown', { n: Math.round((1 - mult) * 100) });
}

market.setCallbacks(
  (ev) => {
    const mult   = ev.event.effect.multiplier;
    const isBoost = mult >= 1;
    const label  = marketEffectLabel(ev.event.effect.type, mult);
    marketBannerIcon.innerHTML = icon(isBoost ? 'trendUp' : 'trendDown');
    marketBannerName.textContent = ev.event.name;
    marketBannerDesc.textContent = ev.event.description;
    marketBannerEff.textContent  = label;
    marketBannerEff.className    = `market-banner-effect${isBoost ? '' : ' malus'}`;
    marketBanner.classList.remove('hidden');
    notifyMilestone(`${ev.event.name} — ${ev.event.description}`);
    playMilestone();
  },
  (ev) => {
    marketBanner.classList.add('hidden');
    notify(t('market.end', { name: ev.event.name }), 'orange');
  },
);

// Réputation — onglet
const tabReputation      = document.getElementById('tab-reputation')!;
const tabCountReputation = document.getElementById('tab-count-reputation')!;

// Academy — onglet
const tabAcademy      = document.getElementById('tab-academy')!;
const tabCountAcademy = document.getElementById('tab-count-academy')!;

// Registre — onglet
const tabRegistre      = document.getElementById('tab-registre')!;
const tabCountRegistre = document.getElementById('tab-count-registre')!;
let academyOpenId: string | null = null;      // fiche de leçon ouverte (null : le cahier)
let academyWrongId: string | null = null;     // dernière leçon ratée (message sous la question)
const academyOpenBranches = new Set<string>(); // branches dépliées par le joueur

// Incident elements
const incidentUrgency    = document.getElementById('incident-urgency')!;
const incidentClient     = document.getElementById('incident-client')!;
const incidentProblem    = document.getElementById('incident-problem')!;
const incidentQuestion   = document.getElementById('incident-question')!;
const incidentAnswers    = document.getElementById('incident-answers')!;
const incidentSkipBtn    = document.getElementById('btn-incident-skip') as HTMLButtonElement;
const incidentResult     = document.getElementById('incident-result')!;
const incidentResultIcon = document.getElementById('incident-result-icon')!;
const incidentLesson     = document.getElementById('incident-lesson')!;
let incidentResolved     = false;
let incidentOfferLeft    = 0;   // secondes avant que la notification d'incident ne disparaisse
let incidentNotice: HTMLElement | null = null;
const INCIDENT_OFFER_DURATION = 90; // l'offre reste visible 90 s, sans pénalité si ignorée
const NEW_MARKETS_DELAY_MS    = 3_200; // bandeau « nouveaux marchés » après l'animation de prestige

// Éléments ÉCHO
const btnEcho       = document.getElementById('btn-echo')     as HTMLButtonElement;
const echoSub       = document.getElementById('echo-sub')!;
const echoBarWrap   = document.getElementById('echo-bar-wrap')!;
const echoBarFill   = document.getElementById('echo-bar-fill')!;
const echoTimerLbl  = document.getElementById('echo-timer-label')!;
const btnClick      = document.getElementById('btn-click')    as HTMLButtonElement;
const elCurrency    = document.getElementById('hd-currency')!;
const CLICK_LETTERS_MIN = 3; // 3 à 5 lettres s'envolent à chaque clic

let state = saveSystem.load();
migrateLegacyAcademy();

// Autosave
saveSystem.startAutosave(() => state);

// Appliquer réputation au démarrage
applyReputationEffects();
updateRegistreBadge();

// Restaurer la bannière marché si un événement est déjà actif
{
  const ev = market.getCurrent();
  if (ev) {
    const mult    = ev.event.effect.multiplier;
    const isBoost = mult >= 1;
    const label   = marketEffectLabel(ev.event.effect.type, mult);
    marketBannerIcon.innerHTML = icon(isBoost ? 'trendUp' : 'trendDown');
    marketBannerName.textContent = ev.event.name;
    marketBannerDesc.textContent = ev.event.description;
    marketBannerEff.textContent  = label;
    marketBannerEff.className    = `market-banner-effect${isBoost ? '' : ' malus'}`;
    marketBanner.classList.remove('hidden');
  }
}

// Contrats — init
const tabContracts     = document.getElementById('tab-contracts')!;
const tabCountContracts = document.getElementById('tab-count-contracts')!;

contractSys.init(
  (contract) => {
    // Nouveau contrat disponible (annoncé seulement une fois l'onglet Contrats apparu)
    if (isTabShown('contracts')) notify(t('contract.new', { title: contract.title }), 'orange');
    tabCountContracts.classList.add('has-new');
    renderContracts();
  },
  (contract) => {
    // Contrat complété
    state = engine.earn(state, contract.reward);
    stats.contractDone();
    saveSystem.save(state);
    renderer.markDirty();
    notifyMilestone(t('contract.done', { reward: formatCurrency(contract.reward), client: contract.client }));
    playPurchase();
    renderContracts();
  },
);

// ─── OVERLAY MANAGER ─────────────────────────────────────────
// Un seul overlay visible à la fois — file d'attente FIFO

const OVERLAY_IDS = [
  'offline-overlay', 'import-url-overlay',
  'incident-overlay', 'prestige-overlay', 'share-overlay',
];
const overlayQueue: Array<() => void> = [];
let activeOverlay: string | null = null;

function anyModalOpen(): boolean {
  return OVERLAY_IDS.some(id => !document.getElementById(id)!.classList.contains('hidden'));
}

function openModal(id: string, setup?: () => void): void {
  if (activeOverlay) {
    overlayQueue.push(() => openModal(id, setup));
    return;
  }
  setup?.();
  document.getElementById(id)!.classList.remove('hidden');
  activeOverlay = id;
}

function closeModal(id: string): void {
  document.getElementById(id)!.classList.add('hidden');
  if (activeOverlay === id) activeOverlay = null;
  const next = overlayQueue.shift();
  if (next) setTimeout(next, 200); // légère pause entre modals
}

// Stage change callback
// Étape franchie : le bureau affiche son bandeau, on joue l'accord
bureau.onStageChange = () => {
  playMilestone();
};

// ─── SÉQUENCE DE DÉMARRAGE ───────────────────────────────────
// Ordre : offline → URL import (jamais en simultané). Les bulles d'aide ne bloquent rien.

// 1. Offline earnings
const offlineSeconds = saveSystem.getOfflineSeconds(state, engine.getMaxOfflineHours(state));
if (offlineSeconds > 10) {
  const { state: newState, earned } = engine.applyOfflineEarnings(state, offlineSeconds);
  state = newState;
  if (earned > 0) openModal('offline-overlay', () => {
    renderer.setOfflineStat(formatDuration(offlineSeconds));
    document.getElementById('offline-earned-amount')!.textContent = formatCurrency(earned);
  });
}

// 2. URL import (après offline)
const urlState = saveSystem.decodeFromURL();
if (urlState) {
  const totalAgents = Object.values(urlState.agents).reduce((s, a) => s + a.count, 0);
  const unlockedCli = Object.values(urlState.clientsUnlocked).filter(Boolean).length;
  openModal('import-url-overlay', () => {
    document.getElementById('import-stats')!.innerHTML = `
      <div class="import-stat-row"><span>${t('import.treasury')}</span><span>${formatCurrency(urlState.currency)}</span></div>
      <div class="import-stat-row"><span>${t('import.total')}</span><span>${formatCurrency(urlState.totalEarned)}</span></div>
      <div class="import-stat-row"><span>${t('import.agents')}</span><span>${totalAgents}</span></div>
      <div class="import-stat-row"><span>${t('import.clients')}</span><span>${unlockedCli}</span></div>
      <div class="import-stat-row"><span>${t('import.prestiges')}</span><span>${urlState.prestigeCount}</span></div>
    `;
  });
}

// 3. Bulle d'aide : premier clic (nouvelle partie uniquement)
if (state.totalEarned === 0 && state.prestigeCount === 0) hints.show('first-click');

// ─── MISE À JOUR 1.1 : annonce unique pour les joueurs qui avaient déjà vendu leur agence ──
// Le drapeau vit dans sa propre clé localStorage : GameState ne peut pas gagner de champ (règles Firebase).
const SEEN_V11_KEY = 'bot-empire-seen-v1.1';
try {
  if (!localStorage.getItem(SEEN_V11_KEY)) {
    localStorage.setItem(SEEN_V11_KEY, '1');
    if (state.prestigeCount >= 1) announceUpdate11(state.prestigeCount);
  }
} catch { /* stockage indisponible : pas d'annonce */ }

function announceUpdate11(prestigeCount: number): void {
  const opened = <T extends { minPrestige?: number; name: string }>(list: T[]) =>
    list.filter(x => (x.minPrestige ?? 0) >= 1 && (x.minPrestige ?? 0) <= prestigeCount).map(x => x.name);
  const names = [...opened(AGENTS), ...opened(CLIENTS), ...opened(UPGRADES)];
  if (!names.length) return;
  // Après la rafale de signatures du chargement, pour ne pas être chassée par elle
  setTimeout(() => {
    notifyMilestone(t('markets.list', { list: names.join(', ') }));
    bureau.announce(t('markets.kicker'), names.slice(0, 2).join(' · '), names.slice(2).join(' · '));
  }, NEW_MARKETS_DELAY_MS);
}

// ─── STOCKAGE INDISPONIBLE ───────────────────────────────────
// Sans stockage, rien n'est gardé (et Firebase créerait un nouveau compte anonyme à chaque visite) :
// on prévient le joueur, sans fermeture automatique, et on coupe la sauvegarde cloud.
const storageOk = saveSystem.isAvailable();
if (!storageOk) {
  const el = document.createElement('div');
  el.className = 'notif orange incident-notice storage-notice';
  el.setAttribute('role', 'alert');
  el.textContent = t('storage.unavailable');
  document.getElementById('notifications')!.prepend(el);
}

// ─── CLOUD SAVE INIT ─────────────────────────────────────────
if (CLOUD_SAVE_ENABLED && storageOk) {
  cloud.init(FIREBASE_CONFIG).then(async (ok) => {
    if (!ok) return;
    const cloudState = await cloud.getIfNewer(state);
    if (cloudState) {
      state = cloudState;
      migrateLegacyAcademy();
      saveSystem.save(state);
      renderer.markDirty();
      bureau.update(0, state);
      // Restauration depuis le cloud — important quand on change d'appareil ou de contexte (PWA iOS)
      notifyMilestone(t('save.cloudRestored'));
    } else {
      cloud.push(state);
    }
    cloud.startAutoSync(() => state);
  });
}

// ─── MILESTONES ──────────────────────────────────────────────

const MILESTONES = [10, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000];
const MILESTONE_LABELS: Record<number, string> = {
  10: t('milestone.10'),
  100: t('milestone.100'),
  1_000: t('milestone.1k'),
  10_000: t('milestone.10k'),
  100_000: t('milestone.100k'),
  1_000_000: t('milestone.1m'),
  10_000_000: t('milestone.10m'),
  100_000_000: t('milestone.100m'),
};
// Initialiser l'index milestone en fonction de l'état chargé
let milestoneIdx = MILESTONES.findIndex(m => m > state.totalEarned);
if (milestoneIdx === -1) milestoneIdx = MILESTONES.length;

// ─── GAME LOOP ───────────────────────────────────────────────

const TICK_MS = 100;
const HINT_CLIENT_AUTOHIDE_MS = 12_000;
let accumulator = 0;
let lastTimestamp = 0;

function gameLoop(timestamp: number): void {
  if (lastTimestamp === 0) lastTimestamp = timestamp;
  const delta = Math.min(timestamp - lastTimestamp, 1000); // cap à 1s pour éviter les sauts
  lastTimestamp = timestamp;
  accumulator += delta;

  while (accumulator >= TICK_MS) {
    const dt = TICK_MS / 1000;

    // Marché IA Vivant
    market.tick();
    updateMarketBannerTimer();

    // Clics automatiques ÉCHO
    const echoClicks = echo.tick(dt);
    const clickMult  = market.getClickMultiplier() * lead.getClickMultiplier();
    for (let i = 0; i < echoClicks; i++) {
      state = engine.click(state, clickMult);
      triggerGhostClick();
    }

    // Lettre ambre : apparaît en jeu actif seulement ; son ×3 se cumule avec un événement de marché
    const leadEvent = lead.tick(dt, canSpawnLead(), engine.getLeadIntervalMult(state), reducedMotion.matches);
    if (leadEvent === 'spawn') { leadLetter.show(reducedMotion.matches); stats.letterSeen(); }
    if (leadEvent === 'expire') leadLetter.hide();

    const incomeMult = engine.getEffectiveMarketMult(state, market.getIncomeMultiplier()) * lead.getIncomeMultiplier();
    const { state: nextState, result } = engine.tick(state, dt, incomeMult);
    state = nextState;
    accumulator -= TICK_MS;

    // Nouveaux clients déverrouillés
    result.newClients.forEach(clientId => {
      renderer.markDirty();
      const def = CLIENTS.find(c => c.id === clientId);
      const msg = def?.unlockDialogue ?? t('client.new', { name: clientId });
      notifyMilestone(msg);
      bureau.stamp(def?.name ?? clientId);
      playClientUnlock();
      hints.show('first-client', HINT_CLIENT_AUTOHIDE_MS);
    });

    // Bulle d'aide : premier agent achetable
    if (!hints.isSeen('first-agent') && engine.getTotalAgentCount(state) === 0
        && engine.canBuyAgent(state, AGENTS[0]!.id)) {
      hints.show('first-agent');
    }

    // Milestones
    while (milestoneIdx < MILESTONES.length && state.totalEarned >= MILESTONES[milestoneIdx]) {
      const label = MILESTONE_LABELS[MILESTONES[milestoneIdx]] ?? t('milestone.generic', { amount: formatCurrency(MILESTONES[milestoneIdx]) });
      notifyMilestone(label);
      playMilestone();
      flashScreen('outremer', 7);
      milestoneIdx++;
    }

    // Incidents — simple notification, le joueur choisit de l'ouvrir ou non
    const hasAgents = Object.values(state.agents).some(a => a.count > 0);
    const newIncident = incident.tick(dt, hasAgents);
    if (newIncident) offerIncident(newIncident);

    stats.tick(dt, engine.getTotalRate(state));
    referenceTimer += dt;
    if (referenceTimer >= REFERENCE_CHECK_S) {
      referenceTimer -= REFERENCE_CHECK_S;
      checkReferences();
      updateTabs(false);
    }

    // Délégation : une passe par seconde
    delegationTimer += dt;
    if (delegationTimer >= DELEGATION_PERIOD_S) {
      delegationTimer -= DELEGATION_PERIOD_S;
      delegate();
    }

    // Contrats
    contractSys.tick(state);

    // Offre d'incident non ouverte : expire en silence
    if (incidentNotice) {
      incidentOfferLeft -= dt;
      if (incidentOfferLeft <= 0) endIncident();
    }
  }

  bureau.update(delta / 1000, state);
  renderer.update(state);
  updateEchoUI();
  updateContractProgressBars();
  updateAcademyLive();
  updateLeadUI();
  updateRegistreLive();
  hints.reposition();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// ─── EVENTS ──────────────────────────────────────────────────

// Bouton de travail
function handleClick(e: MouseEvent | PointerEvent): void {
  state = engine.click(state, market.getClickMultiplier() * lead.getClickMultiplier());
  echo.recordClick();
  stats.addClick();
  renderer.markDirty();
  spawnInkLetters(e.currentTarget as HTMLElement, elCurrency, CLICK_LETTERS_MIN + Math.floor(Math.random() * 3));
  playClick();
  hints.dismiss('first-click');
}

btnClick.addEventListener('click', (e) => {
  spawnRipple(e);
  handleClick(e);
});

// Bouton ÉCHO
btnEcho.addEventListener('click', () => {
  if (!echo.canActivate()) return;
  echo.activate();
  notify(t('echo.activated', { n: engine.getEchoReplaySeconds(state) }), 'orange');
});

// Onglet Agents (délégation d'événements) : Délégation, sélecteur ×1 / ×10 / max, achat d'agents
document.getElementById('tab-agents')!.addEventListener('click', (e) => {
  const delegBtn = (e.target as Element).closest('[data-deleg]') as HTMLElement | null;
  if (delegBtn) {
    toggleDelegation(delegBtn.dataset['deleg']!);
    return;
  }
  const modeBtn = (e.target as Element).closest('[data-buy-mode]') as HTMLElement | null;
  if (modeBtn) {
    renderer.setBuyMode(modeBtn.dataset['buyMode'] as BuyMode);
    return;
  }
  // Toute la carte recrute (compteur, nom, prix), pas seulement le bouton
  const target = e.target as Element;
  const btn = (target.closest('[data-buy-agent]')
    ?? target.closest('.agent-card:not(.silhouette)')?.querySelector('[data-buy-agent]')) as HTMLButtonElement | null;
  if (!btn || btn.disabled) return;
  const agentId = btn.dataset['buyAgent']!;
  const prev = state.agents[agentId]?.count ?? 0;
  const qty = renderer.getBuyQuantity(state, agentId);
  // N'achète que si la quantité affichée est abordable (×10 : tout ou rien)
  if (state.currency < engine.getAgentBulkCost(state, agentId, qty)) return;
  state = engine.buyAgents(state, agentId, qty);
  const now = state.agents[agentId]?.count ?? 0;
  if (now > prev) {
    renderer.markDirty();
    playPurchase();
    bureau.celebratePurchase(agentId);
    announceTier(agentId, prev, now);
    hints.dismiss('first-agent');
    // Flash achat sur la card
    const card = btn.closest('.agent-card');
    if (card) {
      card.classList.add('just-bought');
      setTimeout(() => card.classList.remove('just-bought'), 600);
    }
  }
});

// Onglet Améliorations — achat
document.getElementById('tab-upgrades')!.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest('[data-buy-upgrade]') as HTMLElement | null;
  if (!btn) return;
  const upgradeId = btn.dataset['buyUpgrade']!;
  const prev = state.upgradesPurchased[upgradeId];
  state = engine.buyUpgrade(state, upgradeId);
  if (!prev && state.upgradesPurchased[upgradeId]) {
    renderer.markDirty();
    notify(t('upgrade.activated'), 'purple');
    playPurchase();
    // Flash achat sur la card
    const card = btn.closest('.upgrade-card');
    if (card) {
      card.classList.add('just-bought');
      setTimeout(() => card.classList.remove('just-bought'), 600);
    }
  }
});

// Tabs
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const target = (tab as HTMLElement).dataset['tab']!;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(`tab-${target}`)!.classList.add('active');
    renderer.markDirty();
    if (target === 'contracts') {
      tabCountContracts.classList.remove('has-new');
      renderContracts();
    }
    if (target === 'clients') hints.dismiss('first-client');
    if (target === 'reputation') {
      renderReputation();
    }
    if (target === 'academy') {
      academyOpenId = null;
      renderAcademy();
    }
    if (target === 'registre') {
      tabCountRegistre.classList.remove('has-new');
      renderRegistre();
    }
  });
});

// Prestige — ouvre la modal (uniquement si aucune autre modal ouverte)
document.getElementById('btn-prestige')!.addEventListener('click', () => {
  if (!engine.canPrestige(state) || anyModalOpen()) return;
  const newMult   = 1 + (state.prestigeCount + 1) * 0.15;
  const earnedRP  = engine.getPrestigeRP(state);
  const nextThreshold = engine.getNextPrestigeThreshold(state);
  openModal('prestige-overlay', () => {
    document.getElementById('modal-value')!.textContent       = formatCurrency(state.totalEarned);
    document.getElementById('modal-multiplier')!.textContent  = t('prestige.gain', { rp: earnedRP });
    document.getElementById('modal-total-multi')!.textContent = t('prestige.next', { mult: newMult.toFixed(2), amount: formatCurrency(nextThreshold) });
  });
});

document.getElementById('btn-prestige-confirm')!.addEventListener('click', () => {
  const rpGained = engine.getPrestigeRP(state);
  stats.prestige(state.totalEarned);
  state = engine.prestige(state);
  milestoneIdx = 0;
  applyReputationEffects();
  saveSystem.save(state);
  renderer.markDirty();
  closeModal('prestige-overlay');
  playPrestige();
  bureau.playPrestige();
  flashScreen('ambre', 12);
  notify(t('prestige.done', { rp: rpGained }), 'purple');
  renderReputation();
  announceNewMarkets(state.prestigeCount);
});

/** Contenu qui s'ouvre exactement à ce nombre de prestiges : bandeau sur la scène + notification. */
function announceNewMarkets(prestigeCount: number): void {
  const names = [
    ...AGENTS.filter(a => (a.minPrestige ?? 0) === prestigeCount).map(a => a.name),
    ...CLIENTS.filter(c => (c.minPrestige ?? 0) === prestigeCount).map(c => c.name),
    ...UPGRADES.filter(u => (u.minPrestige ?? 0) === prestigeCount).map(u => u.name),
  ];
  if (prestigeCount === 0 || !names.length) return;
  notifyMilestone(t('markets.list', { list: names.join(', ') }));
  // Après la vague d'encre du prestige
  setTimeout(() => bureau.announce(t('markets.kicker'), names.slice(0, 2).join(' · '), names.slice(2).join(' · ')), NEW_MARKETS_DELAY_MS);
}

document.getElementById('btn-prestige-cancel')!.addEventListener('click', () => {
  closeModal('prestige-overlay');
});

// Offline modal
document.getElementById('btn-offline-close')!.addEventListener('click', () => {
  closeModal('offline-overlay');
});

// Import URL modal
document.getElementById('btn-import-url-confirm')!.addEventListener('click', () => {
  if (!urlState) return;
  state = urlState;
  migrateLegacyAcademy();
  applyReputationEffects();
  saveSystem.save(state);
  renderer.markDirty();
  closeModal('import-url-overlay');
  history.replaceState(null, '', window.location.pathname);
  notify(t('save.importedUrl'), 'green');
});
document.getElementById('btn-import-url-cancel')!.addEventListener('click', () => {
  closeModal('import-url-overlay');
  history.replaceState(null, '', window.location.pathname);
});

// ─── LANGUE ──────────────────────────────────────────────────

// Bouton FR/EN : mémorise le choix puis recharge (tous les textes sont posés au démarrage)
document.getElementById('btn-lang')!.addEventListener('click', () => {
  saveSystem.save(state);
  setLang(LANG === 'fr' ? 'en' : 'fr');
  window.location.reload();
});

// ─── SON ─────────────────────────────────────────────────────

const btnSound = document.getElementById('btn-sound') as HTMLButtonElement;
function renderSoundButton(): void {
  const on = isSoundOn();
  btnSound.innerHTML = icon(on ? 'soundOn' : 'soundOff');
  btnSound.setAttribute('aria-pressed', String(on));
  btnSound.setAttribute('aria-label', t(on ? 'sound.mute' : 'sound.unmute'));
  btnSound.title = t(on ? 'sound.mute' : 'sound.unmute');
}
btnSound.addEventListener('click', () => {
  setSoundOn(!isSoundOn());
  renderSoundButton();
});
renderSoundButton();

// ─── SAVE ACTIONS ────────────────────────────────────────────

// Export JSON
document.getElementById('btn-export')!.addEventListener('click', () => {
  saveSystem.exportToFile(state);
  notify(t('save.exported'), 'green');
});

// Import JSON
document.getElementById('btn-import')!.addEventListener('change', (e) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const raw = ev.target?.result as string;
    const imported = saveSystem.importFromText(raw);
    if (imported) {
      state = imported;
      migrateLegacyAcademy();
      applyReputationEffects();
      saveSystem.save(state);
      renderer.markDirty();
      notify(t('save.imported'), 'green');
    } else {
      notify(t('save.invalid'), 'orange');
    }
    // Reset input pour permettre de re-importer le même fichier
    (e.target as HTMLInputElement).value = '';
  };
  reader.readAsText(file);
});

// Share URL
const shareUrlInput = document.getElementById('share-url-input') as HTMLInputElement;

document.getElementById('btn-share')!.addEventListener('click', () => {
  openModal('share-overlay', () => { shareUrlInput.value = saveSystem.encodeForURL(state); });
});
document.getElementById('btn-share-close')!.addEventListener('click', () => {
  closeModal('share-overlay');
});
document.getElementById('btn-copy-url')!.addEventListener('click', () => {
  navigator.clipboard.writeText(shareUrlInput.value).then(() => {
    notify(t('save.linkCopied'), 'green');
    closeModal('share-overlay');
  }).catch(() => {
    shareUrlInput.select();
    document.execCommand('copy');
    notify(t('save.linkCopied'), 'green');
    closeModal('share-overlay');
  });
});

// ─── HELPERS ─────────────────────────────────────────────────

// Enregistrement SW pour PWA — uniquement sur GitHub Pages.
// Ailleurs (itch.io sert le jeu dans une iframe cross-origin, dev local) on s'en passe.
const PWA_HOST_SUFFIX = '.github.io';
if ('serviceWorker' in navigator && window.location.hostname.endsWith(PWA_HOST_SUFFIX)) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {/* SW indisponible : le jeu marche sans */});
  });
}

function updateEchoUI(): void {
  const es = echo.getState();
  btnEcho.disabled = !es.canActivate && !es.isActive;
  btnEcho.classList.toggle('active-echo', es.isActive);

  if (es.isActive) {
    setText(echoSub, t('echo.active', { n: es.replayRemaining }));
    echoBarWrap.style.display = '';
    echoBarFill.style.width   = `${(es.replayRemaining / es.replayDuration) * 100}%`;
    setText(echoTimerLbl, `${es.replayRemaining}s`);
  } else if (es.isOnCooldown) {
    const m = Math.floor(es.cooldownRemaining / 60);
    const s = es.cooldownRemaining % 60;
    setText(echoSub, t('echo.cooldown', { time: `${m}:${String(s).padStart(2,'0')}` }));
    echoBarWrap.style.display = '';
    echoBarFill.style.width   = `${((120 - es.cooldownRemaining) / 120) * 100}%`;
    setText(echoTimerLbl, `${m}:${String(s).padStart(2,'0')}`);
    echoBarFill.classList.add('cooldown');
  } else {
    echoBarFill.classList.remove('cooldown');
    echoBarWrap.style.display    = 'none';
    if (es.clicksRecorded < 3) {
      setText(echoSub, t('echo.needClicks', { n: 3 - es.clicksRecorded }));
    } else {
      setText(echoSub, t('echo.ready', { n: es.clicksRecorded }));
    }
  }
}

let ghostClickTimeout: ReturnType<typeof setTimeout> | null = null;
function triggerGhostClick(): void {
  btnClick.classList.add('ghost-clicking');
  if (ghostClickTimeout) clearTimeout(ghostClickTimeout);
  ghostClickTimeout = setTimeout(() => {
    btnClick.classList.remove('ghost-clicking');
  }, 300);
}

const MAX_NOTIFS = 3; // au-delà, les plus anciennes s'effacent pour ne pas recouvrir la scène

function pushNotif(el: HTMLElement): void {
  const container = document.getElementById('notifications')!;
  container.appendChild(el);
  const pile = container.querySelectorAll('.notif:not(.incident-notice)');
  for (let i = 0; i < pile.length - MAX_NOTIFS; i++) pile[i].remove();
}

function notifyMilestone(message: string): void {
  const el = document.createElement('div');
  el.className = 'notif milestone';
  el.textContent = message;
  pushNotif(el);
  setTimeout(() => {
    el.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, 5000); // milestones restent 5s
}

function notify(message: string, color: 'green' | 'purple' | 'orange' = 'green'): void {
  const el = document.createElement('div');
  el.className = `notif ${color === 'purple' ? 'purple' : color === 'orange' ? 'orange' : ''}`;
  el.textContent = message;
  pushNotif(el);
  setTimeout(() => {
    el.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

function spawnRipple(e: MouseEvent): void {
  const btn = e.currentTarget as HTMLElement;
  const dot = document.createElement('div');
  dot.className = 'ripple-dot';
  const rect = btn.getBoundingClientRect();
  dot.style.left = `${e.clientX - rect.left}px`;
  dot.style.top = `${e.clientY - rect.top}px`;
  btn.appendChild(dot);
  setTimeout(() => dot.remove(), 500);
}


// ─── DÉLÉGATION (le fauteuil vide) ───────────────────────────

/** Palier d'équipe franchi (25, 50, 100, 200) : notification et accord. */
function announceTier(agentId: string, prev: number, now: number): void {
  const tier = getTeamTier(now);
  if (tier <= getTeamTier(prev)) return;
  const def = AGENTS.find(a => a.id === agentId);
  notifyMilestone(t('tier.reached', {
    name: def?.name ?? agentId, n: TEAM_TIERS[tier - 1]!, mult: formatMultiplier(getTeamTierMultiplier(now)),
  }));
  playMilestone();
}

/** Une passe de Délégation : achats, lettres du fauteuil vers les postes, paliers. */
function delegate(): void {
  const level = engine.getDelegationLevel(state);
  bureau.setDelegation(level > 0 && delegation.enabled);
  if (level <= 0 || !delegation.enabled) return;
  const before = state;
  const res = runDelegation(engine, state, level, delegation);
  if (!res.agents.length && !res.upgrades.length) return;
  state = res.state;
  renderer.markDirty();
  for (const id of new Set(res.agents)) {
    bureau.delegateFlight(id);
    announceTier(id, before.agents[id]?.count ?? 0, state.agents[id]?.count ?? 0);
  }
  if (res.upgrades.length) notify(t('upgrade.activated'), 'purple');
}

/** Bandeau en tête de l'onglet Agents : interrupteur général, un par métier, améliorations (niveau II). */
function delegationPanel(s: GameState): string {
  const level = engine.getDelegationLevel(s);
  if (level <= 0) return '';
  const on = delegation.enabled;
  const chip = (key: string, label: string, pressed: boolean) =>
    `<button type="button" class="deleg-chip" data-deleg="${key}" aria-pressed="${pressed}"><span>${label}</span></button>`;
  const roles = getDelegableAgentIds(level)
    .filter(id => engine.isAgentAvailable(s, id))
    .map(id => chip(`agent:${id}`, AGENTS.find(a => a.id === id)?.name ?? id, delegation.agents[id] !== false));
  if (level >= 2) roles.push(chip('upgrades', t('deleg.upgrades'), delegation.upgrades));
  return `
    <section class="deleg${on ? ' on' : ''}" aria-label="${t('deleg.label')}">
      <div class="deleg-head">
        <span class="deleg-title">${icon('compass')}${t(level >= 2 ? 'deleg.title2' : 'deleg.title1')}</span>
        <button type="button" class="deleg-switch" data-deleg="all" role="switch" aria-checked="${on}"><span>${t(on ? 'deleg.on' : 'deleg.off')}</span></button>
      </div>
      <p class="deleg-rule">${t('deleg.rule')}</p>
      <div class="deleg-chips" role="group" aria-label="${t('deleg.roles')}">${roles.join('')}</div>
    </section>`;
}

function toggleDelegation(key: string): void {
  if (key === 'all') delegation.enabled = !delegation.enabled;
  else if (key === 'upgrades') delegation.upgrades = !delegation.upgrades;
  else if (key.startsWith('agent:')) {
    const id = key.slice('agent:'.length);
    delegation.agents[id] = delegation.agents[id] === false;
  }
  saveDelegationSettings(delegation);
  bureau.setDelegation(engine.getDelegationLevel(state) > 0 && delegation.enabled);
  renderer.markDirty();
}

// ─── ONGLETS PROGRESSIFS ─────────────────────────────────────
// Les onglets apparaissent au fil de la partie, calculés à partir de l'état (rien n'est sauvegardé).
// Toute condition tient compte des ventes passées : un onglet déjà vu ne disparaît jamais.
// Agents, Améliorations et Agence restent toujours visibles.

const TAB_RULES: Record<string, { show: (s: GameState) => boolean; hint?: HintId }> = {
  academy:    { show: s => s.prestigeCount >= 1 || (s.agents['bot-workflows']?.count ?? 0) >= 1 || engine.getLearnedLessonCount(s) > 0, hint: 'tab-academy' },
  clients:    { show: s => s.prestigeCount >= 1 || engine.getUnlockedClientCount(s) > 0 },
  contracts:  { show: s => s.prestigeCount >= 1 || stats.get().playSeconds >= CONTRACTS_TAB_AFTER_S || (s.agents['agent-copy']?.count ?? 0) >= 1, hint: 'tab-contracts' },
  reputation: { show: s => s.prestigeCount >= 1 || (s.reputationPoints ?? 0) > 0 || engine.canPrestige(s), hint: 'tab-reputation' },
  registre:   { show: s => s.prestigeCount >= 1 || engine.getReferenceCount(s) > 0, hint: 'tab-registre' },
};
const CONTRACTS_TAB_AFTER_S = 180;  // l'onglet Contrats apparaît à 3 min de jeu (ou au 1er Agent Copy)
const TAB_REVEAL_MS = 4_000;        // l'onglet qui apparaît garde son nom et son trait d'encre 4 s
const TAB_HINT_MS   = 10_000;
const shownTabs = new Set<string>(['agents', 'upgrades', 'agency']);

function isTabShown(tab: string): boolean { return shownTabs.has(tab); }

/** Montre les onglets dont la condition est remplie ; `initial` : au chargement, sans animation. */
function updateTabs(initial: boolean): void {
  for (const [tab, rule] of Object.entries(TAB_RULES)) {
    const btn = document.querySelector<HTMLElement>(`.tab[data-tab="${tab}"]`);
    if (!btn) continue;
    if (!shownTabs.has(tab) && rule.show(state)) {
      shownTabs.add(tab);
      if (!initial) {
        btn.classList.add('tab-new');
        setTimeout(() => btn.classList.remove('tab-new'), TAB_REVEAL_MS);
        if (rule.hint) hints.show(rule.hint, TAB_HINT_MS);
      }
    }
    btn.classList.toggle('hidden', !shownTabs.has(tab));
  }
}

// ─── CARNET DE RÉFÉRENCES ET REGISTRE ────────────────────────

type ReferenceFamily = 'team' | 'clients' | 'sales' | 'academy' | 'letters';
const REFERENCE_FAMILIES: readonly ReferenceFamily[] = ['team', 'clients', 'sales', 'academy', 'letters'];

function referenceFamily(r: ReferenceDef): ReferenceFamily {
  switch (r.condition.type) {
    case 'agents':   return 'team';
    case 'client':   return 'clients';
    case 'prestige': return 'sales';
    case 'lessons':  return 'academy';
    case 'letters':  return 'letters';
  }
}

/** Nom et secteur affichés : ceux du client pour une fiche « client signé ». */
function referenceCard(r: ReferenceDef): { name: string; sector: string } {
  if (r.condition.type === 'client') {
    const id = r.condition.clientId;
    const c = CLIENTS.find(x => x.id === id);
    return { name: c?.name ?? id, sector: c?.sector ?? '' };
  }
  return { name: r.name, sector: r.sector };
}

function referenceConditionLabel(r: ReferenceDef): string {
  const c = r.condition;
  switch (c.type) {
    case 'agents':   return t('ref.cond.agents', { n: c.count, agent: AGENTS.find(a => a.id === c.agentId)?.name ?? c.agentId });
    case 'client':   return t('ref.cond.client', { client: referenceCard(r).name });
    case 'prestige': return c.count <= 1 ? t('ref.cond.prestige1') : t('ref.cond.prestigeN', { n: c.count });
    case 'lessons':  return t('ref.cond.lessons', { n: c.count });
    case 'letters':  return c.count <= 1 ? t('ref.cond.letters1') : t('ref.cond.lettersN', { n: c.count });
  }
}

/** Ajoute au carnet les références dont la condition vient d'être remplie. */
function checkReferences(): void {
  const ids = engine.getNewReferences(state, stats.get().lettersCaught);
  if (!ids.length) return;
  state = engine.grantReferences(state, ids);
  saveSystem.save(state);
  renderer.markDirty();
  tabCountRegistre.classList.add('has-new');
  updateRegistreBadge();
  if (ids.length >= REFERENCE_GROUP_FROM) {
    notifyMilestone(t('ref.earnedMany', { n: ids.length, pct: formatNumber(ids.length * REFERENCE_INCOME_BONUS * 100, 1) }));
  } else {
    for (const id of ids) {
      const r = REFERENCES.find(x => x.id === id);
      if (r) notifyMilestone(t('ref.earned', { name: referenceCard(r).name }));
    }
  }
  playPurchase();
  if (tabRegistre.classList.contains('active')) renderRegistre();
}

/** « 3 h 12 min » ou « 14 min ». */
function formatPlayTime(seconds: number): string {
  const total = Math.floor(seconds / 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return h > 0 ? t('reg.hm', { h, m }) : t('reg.m', { m });
}

/** Lignes du registre : clé, libellé, valeur (recalculées à chaque affichage). */
function registreRows(): Array<[string, string, string]> {
  const st = stats.get();
  const lessons = engine.getLearnedLessonCount(state);
  const refs = engine.getReferenceCount(state);
  // Part de bonnes réponses du premier coup : seulement quand une leçon a été répondue sur cet appareil
  const lessonsValue = st.lessonsLearned > 0
    ? t('reg.lessonsValue', { n: lessons, total: ACADEMY_LESSONS.length, pct: Math.round((st.lessonsFirstTry / st.lessonsLearned) * 100) })
    : t('reg.lessonsCount', { n: lessons, total: ACADEMY_LESSONS.length });
  return [
    ['play',      t('reg.play'),      formatPlayTime(st.playSeconds)],
    ['run',       t('reg.run'),       formatPlayTime(st.runSeconds)],
    ['clicks',    t('reg.clicks'),    formatNumber(st.clicks, 0)],
    ['sales',     t('reg.sales'),     String(state.prestigeCount)],
    ['bestRate',  t('reg.bestRate'),  formatRate(st.bestRate)],
    ['earned',    t('reg.earned'),    formatCurrency(st.pastRunsEarned + state.totalEarned)],
    ['letters',   t('reg.letters'),   t('reg.lettersValue', { caught: st.lettersCaught, seen: st.lettersSeen })],
    ['contracts', t('reg.contracts'), String(st.contractsDone)],
    ['incidents', t('reg.incidents'), t('reg.incidentsValue', { solved: st.incidentsSolved, seen: st.incidentsSeen })],
    ['lessons',   t('reg.lessons'),   lessonsValue],
    ['refs',      t('reg.refs'),      t('reg.refsValue', { n: refs, total: REFERENCES.length, pct: formatNumber(refs * REFERENCE_INCOME_BONUS * 100, 1) })],
  ];
}

function statsText(): string {
  const sep = LANG === 'fr' ? ' : ' : ': ';
  return [t('reg.copyHeader', { version: GAME_VERSION }), ...registreRows().map(([, label, value]) => `${label}${sep}${value}`)].join('\n');
}

function updateRegistreBadge(): void {
  setText(tabCountRegistre, `${engine.getReferenceCount(state)}/${REFERENCES.length}`);
}

function renderRegistre(): void {
  const owned = (r: ReferenceDef) => !!state.reputationPurchased[r.id];
  const families = REFERENCE_FAMILIES.map(f => {
    const refs = REFERENCES.filter(r => referenceFamily(r) === f);
    const done = refs.filter(owned).length;
    const cards = refs.map(r => {
      const card = referenceCard(r);
      const got = owned(r);
      return `
        <li class="ref-card${got ? ' owned' : ''}">
          <div class="ref-card-name">${got ? card.name : '???'}</div>
          <div class="ref-card-sector">${got ? card.sector : referenceConditionLabel(r)}</div>
          ${got ? `<p class="ref-card-quote">« ${r.quote} »</p><span class="ref-stamp">${t('ref.stamp')}</span>` : ''}
        </li>`;
    }).join('');
    return `
      <details class="acad-branch ref-family"${done > 0 ? ' open' : ''}>
        <summary class="acad-branch-head">
          <span class="acad-branch-name">${t(`ref.family.${f}` as UiKey)}</span>
          <span class="acad-branch-count">${done}/${refs.length}</span>
          <span class="chapter-chevron">${icon('chevron')}</span>
        </summary>
        <ul class="ref-cards">${cards}</ul>
      </details>`;
  }).join('');

  tabRegistre.innerHTML = `
    <section class="registre" aria-labelledby="reg-title">
      <div class="stats-title" id="reg-title">${t('reg.title')}</div>
      <p class="registre-sub">${t('reg.sub')}</p>
      <dl class="registre-rows">
        ${registreRows().map(([key, label]) => `<div class="registre-row"><dt>${label}</dt><dd data-stat="${key}"></dd></div>`).join('')}
      </dl>
      <button type="button" class="btn-copy-stats" id="btn-copy-stats"><span>${icon('document')}${t('reg.copy')}</span></button>
      <div class="registre-manual hidden" id="registre-manual">
        <label for="registre-text">${t('reg.copyManual')}</label>
        <textarea id="registre-text" readonly rows="8"></textarea>
      </div>
    </section>
    <section class="ref-book" aria-labelledby="ref-title">
      <div class="stats-title" id="ref-title">${t('ref.title')}</div>
      <p class="registre-sub">${t('ref.sub')}</p>
      ${families}
    </section>
  `;
  registreShownAt = 0;
  updateRegistreLive();
  document.getElementById('btn-copy-stats')!.addEventListener('click', () => {
    const text = statsText();
    const manual = () => {
      const box = document.getElementById('registre-manual')!;
      const area = document.getElementById('registre-text') as HTMLTextAreaElement;
      area.value = text;
      box.classList.remove('hidden');
      area.select();
    };
    if (!navigator.clipboard) { manual(); return; }
    navigator.clipboard.writeText(text).then(() => notify(t('reg.copied'), 'green')).catch(manual);
  });
}

/** Valeurs du registre rafraîchies une fois par seconde quand l'onglet est ouvert. */
let registreShownAt = 0;
function updateRegistreLive(): void {
  if (!tabRegistre.classList.contains('active')) return;
  const now = performance.now();
  if (now - registreShownAt < 1000) return;
  registreShownAt = now;
  for (const [key, , value] of registreRows()) {
    const el = tabRegistre.querySelector(`[data-stat="${key}"]`);
    if (el) setText(el, value);
  }
}

// ─── LETTRE AMBRE ────────────────────────────────────────────

/**
 * La lettre n'apparaît qu'en jeu actif : onglet visible, aucune fenêtre, scène non couverte par le
 * tiroir. Seul le tiroir du téléphone couvre la scène (sur ordinateur, la poignée se dit toujours dépliée).
 */
const phoneLayout = window.matchMedia(PHONE_QUERY);
function canSpawnLead(): boolean {
  const drawerCovers = phoneLayout.matches
    && document.getElementById('drawer-handle')?.getAttribute('aria-expanded') === 'true';
  return !document.hidden && !anyModalOpen() && !drawerCovers;
}

function catchLead(): void {
  const res = lead.catch(engine.getTotalRate(state), state.currency, engine.getLeadIntervalMult(state));
  if (!res) return;
  stats.letterCaught();
  leadLetter.burst(elCurrency);
  playLead();
  if (res.effect === 'cash') {
    state = engine.earn(state, res.amount);
    renderer.markDirty();
    notifyMilestone(t('lead.cash', { amount: formatCurrency(res.amount) }));
  } else {
    notifyMilestone(t(res.effect === 'boost' ? 'lead.boost' : 'lead.click'));
  }
}

function updateLeadUI(): void {
  leadLetter.update(lead.getProgress(reducedMotion.matches));
  const boost = lead.getBoostSeconds();
  const click = lead.getClickSeconds();
  leadLetter.setChip(boost > 0 ? t('lead.chipBoost', { n: boost }) : click > 0 ? t('lead.chipClick', { n: click }) : '');
}

// ─── INCIDENT ────────────────────────────────────────────────

let currentIncident: IncidentQuestion | null = null;
let currentIncidentReward = 0; // figée à l'apparition : max(montant fixe, 30 s de revenu)

/** Affiche la notification d'incident : cliquable pour ouvrir le quiz, ou ignorable. */
function offerIncident(q: IncidentQuestion): void {
  currentIncident   = q;
  currentIncidentReward = getIncidentReward(q.reward, engine.getTotalRate(state));
  stats.incidentSeen();
  incidentOfferLeft = INCIDENT_OFFER_DURATION;

  const el = document.createElement('div');
  el.className = 'notif orange incident-notice';
  el.innerHTML = `
    <button class="incident-notice-open" type="button"></button>
    <button class="incident-notice-close" type="button">×</button>
  `;
  el.querySelector('.incident-notice-close')!.setAttribute('aria-label', t('incident.ignore'));
  el.querySelector('.incident-notice-open')!.textContent =
    t('incident.notice', { client: q.client, reward: formatCurrency(currentIncidentReward) });
  el.querySelector('.incident-notice-open')!.addEventListener('click', () => {
    removeIncidentNotice();
    showIncident(q);
  });
  el.querySelector('.incident-notice-close')!.addEventListener('click', () => endIncident());
  document.getElementById('notifications')!.prepend(el);
  incidentNotice = el;
}

function removeIncidentNotice(): void {
  incidentNotice?.remove();
  incidentNotice = null;
}

/** Clôt l'incident courant (résolu, ignoré ou expiré) et planifie le suivant. */
function endIncident(): void {
  removeIncidentNotice();
  currentIncident = null;
  incident.resolve();
}

function showIncident(q: IncidentQuestion): void {
  currentIncident  = q;
  incidentResolved = false;

  incidentUrgency.textContent  = q.urgency;
  incidentClient.textContent   = q.client;
  incidentProblem.textContent  = q.problem;
  incidentQuestion.textContent = q.question;

  // Mélanger les réponses pour que la bonne ne soit pas toujours B
  const indices = [0, 1, 2] as const;
  const shuffled = [...indices].sort(() => Math.random() - 0.5);
  const shuffledAnswers = shuffled.map(i => q.answers[i]);
  const newCorrectIdx   = shuffled.indexOf(q.correct as 0 | 1 | 2);

  // Stocker le nouvel index correct pour resolveIncident
  (currentIncident as IncidentQuestion & { _shuffledCorrect: number })._shuffledCorrect = newCorrectIdx;

  incidentAnswers.innerHTML = '';
  shuffledAnswers.forEach((answer, displayIdx) => {
    const btn = document.createElement('button');
    btn.className = 'incident-answer-btn';
    btn.textContent = answer;
    btn.addEventListener('click', () => resolveIncident(displayIdx));
    incidentAnswers.appendChild(btn);
  });

  incidentResult.classList.add('hidden');
  incidentSkipBtn.classList.remove('hidden');
  openModal('incident-overlay');
}

function resolveIncident(chosen: number): void {
  if (incidentResolved || !currentIncident) return;
  incidentResolved = true;

  const q = currentIncident;
  // Utiliser l'index mélangé si disponible, sinon fallback sur l'original
  const correctIdx = (q as IncidentQuestion & { _shuffledCorrect?: number })._shuffledCorrect ?? q.correct;
  const isRight = chosen === correctIdx;

  // Colorer les boutons
  const btns = incidentAnswers.querySelectorAll('.incident-answer-btn');
  btns.forEach((btn, idx) => {
    (btn as HTMLButtonElement).disabled = true;
    if (idx === correctIdx) btn.classList.add('correct');
    else if (idx === chosen) btn.classList.add('wrong');
  });

  // Résultat
  if (isRight) {
    const reward = currentIncidentReward || q.reward;
    state = engine.earn(state, reward);
    stats.incidentSolved();
    incidentResultIcon.innerHTML = icon('check');
    incidentResultIcon.className = 'incident-result-icon ok';
    incidentLesson.textContent     = t('incident.won', { reward: formatCurrency(reward), lesson: q.lesson });
    notify(t('incident.solved', { reward: formatCurrency(reward) }), 'green');
    playPurchase();
  } else {
    incidentResultIcon.innerHTML = icon('cross');
    incidentResultIcon.className = 'incident-result-icon ko';
    incidentLesson.textContent     = q.lesson;
    notify(t('incident.wrong'), 'orange');
  }

  incidentSkipBtn.classList.add('hidden');
  incidentResult.classList.remove('hidden');
}

document.getElementById('btn-incident-close')!.addEventListener('click', () => {
  closeModal('incident-overlay');
  endIncident();
});

incidentSkipBtn.addEventListener('click', () => {
  closeModal('incident-overlay');
  endIncident();
});

// ─── CONTRATS ─────────────────────────────────────────────────

function formatTimeLeft(ms: number): { label: string; urgent: boolean } {
  const sec = Math.max(0, Math.floor(ms / 1000));
  if (sec < 60)  return { label: `${sec}s`, urgent: true };
  const min = Math.floor(sec / 60);
  if (min < 60)  return { label: `${min}min`, urgent: min < 10 };
  const h = Math.floor(min / 60);
  const m = min % 60;
  return { label: `${h}h${m > 0 ? m + 'min' : ''}`, urgent: false };
}

function requirementLabel(contract: ActiveContract, state: GameState): { label: string; met: boolean }[] {
  const reqs: { label: string; met: boolean }[] = [];
  if (contract.requiresRate) {
    const rate = engine.getTotalRate(state);
    reqs.push({ label: `≥ ${formatRate(contract.requiresRate)}`, met: rate >= contract.requiresRate });
  }
  if (contract.requiresAgent) {
    const count = state.agents[contract.requiresAgent.id]?.count ?? 0;
    const def = AGENTS.find(a => a.id === contract.requiresAgent!.id);
    reqs.push({
      label: `${def?.name ?? contract.requiresAgent.id} ×${contract.requiresAgent.count}`,
      met: count >= contract.requiresAgent.count,
    });
  }
  return reqs;
}

function renderContracts(): void {
  const slots = contractSys.getSlots();
  const available = slots.filter(s => s && s.status === 'available').length;
  const accepted  = slots.filter(s => s && s.status === 'accepted').length;
  tabCountContracts.textContent = String(available + accepted);

  tabContracts.innerHTML = `
    <div class="contracts-board">
      <div class="contracts-header">${t('contract.board', { available, accepted })}</div>
      ${slots.map((slot, i) => renderContractSlot(slot, i)).join('')}
    </div>
  `;

  // Brancher les boutons Accepter
  slots.forEach((slot) => {
    if (!slot || slot.status !== 'available') return;
    const btn = tabContracts.querySelector(`[data-accept="${slot.id}"]`) as HTMLButtonElement | null;
    if (!btn) return;
    btn.addEventListener('click', () => {
      const rate = engine.getTotalRate(state);
      if (!contractSys.canAccept(slot, state, rate)) return;
      contractSys.accept(slot, rate);
      notify(t('contract.accepted', { time: formatTimeLeft(slot.workTime * 1000).label }), 'green');
      renderContracts();
    });
  });
}

function renderContractSlot(slot: ActiveContract | null, i: number): string {
  if (!slot) {
    return `
      <div class="contract-empty-slot">
        <div>${t('contract.emptySlot', { n: i + 1 })}</div>
        <div class="slot-timer">${t('contract.nextIn')}</div>
      </div>
    `;
  }

  const rarityLabel = t(slot.rarity === 'epic' ? 'contract.epic' : slot.rarity === 'rare' ? 'contract.rare' : 'contract.common');
  const reqs = requirementLabel(slot, state);
  const canAccept = contractSys.canAccept(slot, state, engine.getTotalRate(state));
  const progress  = contractSys.getProgress(slot);

  if (slot.status === 'available') {
    const timeLeft = formatTimeLeft(slot.expiresAt - Date.now());
    const base = slot.reward;
    const reward = contractSys.getReward(slot, engine.getTotalRate(state));
    const indexed = reward > base
      ? ` <span class="contract-indexed">(${t('contract.rewardIndexed', { n: CONTRACT_REWARD_SECONDS[slot.rarity] })})</span>` : '';
    return `
      <div class="contract-card rarity-${slot.rarity}">
        <div class="contract-top">
          <div class="contract-icon">${icon('document')}</div>
          <div class="contract-meta">
            <div class="contract-client">
              ${slot.client}
              <span class="contract-rarity-badge">${rarityLabel}</span>
            </div>
            <div class="contract-title">${slot.title}</div>
            <div class="contract-desc">${slot.description}</div>
            ${reqs.length > 0 ? `
              <div class="contract-requirements" style="margin-top:6px">
                ${reqs.map(r => `<span class="contract-req ${r.met ? 'met' : 'unmet'}">${r.met ? '✓' : '✗'} ${r.label}</span>`).join('')}
              </div>` : ''}
          </div>
        </div>
        <div class="contract-bottom">
          <span class="contract-reward">+${formatCurrency(reward)}${indexed}</span>
          <span class="contract-timer ${timeLeft.urgent ? 'urgent' : ''}">${icon('clock')}${timeLeft.label}</span>
          <button class="btn-contract" data-accept="${slot.id}" ${canAccept ? '' : 'disabled'}>
            ${canAccept ? t('contract.accept') : t('contract.required')}
          </button>
        </div>
      </div>
    `;
  }

  if (slot.status === 'accepted') {
    const timeLeft = formatTimeLeft((slot.completesAt ?? 0) - Date.now());
    return `
      <div class="contract-card rarity-${slot.rarity} status-accepted" data-contract-id="${slot.id}">
        <div class="contract-top">
          <div class="contract-icon">${icon('document')}</div>
          <div class="contract-meta">
            <div class="contract-client">${slot.client} <span class="contract-rarity-badge">${rarityLabel}</span></div>
            <div class="contract-title">${slot.title}</div>
          </div>
        </div>
        <div class="contract-progress-wrap">
          <div class="contract-progress-track">
            <div class="contract-progress-fill" style="width:${Math.round(progress * 100)}%" data-progress-id="${slot.id}"></div>
          </div>
          <span class="contract-timer">${icon('clock')}<span class="contract-timer-text">${timeLeft.label}</span></span>
        </div>
        <div class="contract-bottom">
          <span class="contract-reward">+${formatCurrency(slot.reward)}</span>
          <button class="btn-contract in-progress" disabled>${t('contract.inProgress')}</button>
        </div>
      </div>
    `;
  }

  return '';
}

// ─── RÉPUTATION ──────────────────────────────────────────────

function applyReputationEffects(): void {
  // Synchronise les systèmes avec l'état de réputation actuel
  echo.setCooldownMultiplier(engine.getReputationEchoCooldownMult(state));
  echo.setReplayDuration(engine.getEchoReplaySeconds(state));
  contractSys.setReputation(
    engine.getExtraContractSlots(state),
    engine.getContractRewardMult(state),
    engine.getContractWorkTimeMult(state),
  );
  tabCountReputation.textContent = String(state.reputationPoints ?? 0);
}

function renderReputation(): void {
  const rp = state.reputationPoints ?? 0;
  const nextRP = engine.getPrestigeRP(state);

  // Seuls les bonus de réputation et la Notoriété comptent : le dictionnaire porte aussi
  // les leçons (acad-*), les références (ref-*) et la clé de transition du prestige.
  const anyRepBought = [...REPUTATION_PERKS.map(p => p.id), ...NOTORIETE_IDS].some(id => state.reputationPurchased?.[id]);
  if (rp === 0 && !anyRepBought) {
    tabReputation.innerHTML = `
      <div class="rep-intro">
        <span class="rep-intro-icon">${icon('star')}</span>
        <div class="rep-intro-title">${t('rep.introTitle')}</div>
        <p class="rep-intro-text">
          ${t('rep.introText')}
          <br><br>
          <strong>${t('rep.nextShort', { rp: nextRP })}</strong>
        </p>
      </div>
    `;
    return;
  }

  const perksHtml = REPUTATION_PERKS.map(perk => {
    const owned     = engine.hasRepPerk(state, perk.id);
    const canBuy    = engine.canBuyRepPerk(state, perk.id);
    const classes   = ['rep-perk-card', owned ? 'owned' : '', canBuy ? 'affordable' : ''].filter(Boolean).join(' ');

    return `
      <div class="${classes}">
        <div class="rep-perk-top">
          <span class="rep-perk-icon">${icon(PERK_ICONS[perk.id] ?? 'star')}</span>
          <div class="rep-perk-meta">
            <div class="rep-perk-name">${perk.name}</div>
            <div class="rep-perk-desc">${perk.description}</div>
          </div>
        </div>
        <div class="rep-perk-footer">
          ${owned
            ? `<span class="rep-perk-cost owned-label">${t('rep.enabled')}</span>
               <button class="btn-rep-buy owned" disabled>${t('rep.owned')}</button>`
            : `<span class="rep-perk-cost">${icon('star')}${perk.cost}</span>
               <button class="btn-rep-buy" data-buy-rep="${perk.id}" ${canBuy ? '' : 'disabled'}>
                 ${canBuy ? t('rep.buy') : t('rep.missing', { n: perk.cost - rp })}
               </button>`
          }
        </div>
      </div>
    `;
  }).join('');

  // Notoriété : niveaux sans plafond, après les bonus de base (en tête de liste une fois ouverte)
  const notoLevel  = engine.getNotorieteLevel(state);
  const notoOpen   = engine.isNotorieteOpen(state);
  const notoCost   = engine.getNextNotorieteCost(state);
  const notoCanBuy = engine.canBuyNotoriete(state);
  const notoHtml = `
    <div class="rep-perk-card rep-perk-wide${notoOpen ? '' : ' locked'}${notoCanBuy ? ' affordable' : ''}${notoLevel > 0 ? ' owned' : ''}">
      <div class="rep-perk-top">
        <span class="rep-perk-icon">${icon('crown')}</span>
        <div class="rep-perk-meta">
          <div class="rep-perk-name">${t('rep.notoriete')}</div>
          <div class="rep-perk-desc">${notoOpen ? t('rep.notorieteDesc') : t('rep.notorieteLocked', { n: REPUTATION_PERKS.length })}</div>
          ${notoLevel > 0 ? `<div class="rep-perk-level">${t('rep.notorieteLevel', { n: notoLevel, pct: Math.round(notoLevel * NOTORIETE_INCOME_PER_LEVEL * 100) })}</div>` : ''}
        </div>
      </div>
      ${Number.isFinite(notoCost) ? `
      <div class="rep-perk-footer">
        <span class="rep-perk-cost">${icon('star')}${notoCost}</span>
        <button class="btn-rep-buy" data-buy-noto ${notoCanBuy ? '' : 'disabled'}>
          ${notoCanBuy ? t('rep.buy') : notoOpen ? t('rep.missing', { n: notoCost - rp }) : icon('lock')}
        </button>
      </div>` : ''}
    </div>`;

  tabReputation.innerHTML = `
    <div class="reputation-header">
      <div class="reputation-balance">
        <span class="rep-value">${icon('star')}${rp}</span>
        <span class="rep-label">${t('rep.points')}</span>
      </div>
      <div class="reputation-next">
        ${t('rep.next')}<br><strong>+${nextRP} pts</strong>
      </div>
    </div>
    <div class="rep-perk-grid">${notoOpen ? notoHtml + perksHtml : perksHtml + notoHtml}</div>
  `;

  tabReputation.querySelector('[data-buy-noto]')?.addEventListener('click', () => {
    const before = engine.getNotorieteLevel(state);
    state = engine.buyNotoriete(state);
    const after = engine.getNotorieteLevel(state);
    if (after > before) {
      notify(t('rep.notorieteBought', { n: after }), 'purple');
      playPurchase();
      applyReputationEffects();
      saveSystem.save(state);
      renderer.markDirty();
      renderReputation();
    }
  });

  // Événements d'achat
  tabReputation.querySelectorAll('[data-buy-rep]').forEach(btn => {
    btn.addEventListener('click', () => {
      const perkId = (btn as HTMLElement).dataset['buyRep']!;
      const prev = engine.hasRepPerk(state, perkId);
      state = engine.buyRepPerk(state, perkId);
      if (!prev && engine.hasRepPerk(state, perkId)) {
        const perk = REPUTATION_PERKS.find(p => p.id === perkId)!;
        notify(t('rep.activated', { name: perk.name }), 'purple');
        playPurchase();
        applyReputationEffects();
        saveSystem.save(state);
        renderer.markDirty();
        renderReputation();
      }
    });
  });
}

function updateMarketBannerTimer(): void {
  const ev = market.getCurrent();
  if (!ev) return;
  const rem = Math.max(0, Math.ceil((ev.endsAt - Date.now()) / 1000));
  if (rem < 60) {
    marketBannerTime.textContent = `${rem}s`;
  } else {
    const m = Math.floor(rem / 60);
    const s = rem % 60;
    marketBannerTime.textContent = `${m}:${String(s).padStart(2, '0')}`;
  }
}

// ─── IA ACADEMY ──────────────────────────────────────────────
// Un arbre de 24 leçons : lire, répondre à une question à 3 choix, payer en euros, gagner un bonus
// permanent. Les leçons acquises sont des clés acad-* de reputationPurchased (voir GameEngine).

type LessonStatus = 'learned' | 'open' | 'pending' | 'locked';

function lessonStatus(l: AcademyLesson): LessonStatus {
  if (engine.isLessonLearned(state, l.id)) return 'learned';
  if (!engine.areLessonPrereqsMet(state, l)) return 'locked';
  return engine.canStudyLesson(state, l.id) ? 'open' : 'pending';
}

function conditionLabel(c: LessonCondition): string {
  switch (c.type) {
    case 'agents':   return t('acad.cond.agents', { n: c.count, agent: AGENTS.find(a => a.id === c.agentId)?.name ?? c.agentId });
    case 'clients':  return t('acad.cond.clients', { n: c.count });
    case 'prestige': return c.count <= 1 ? t('acad.cond.prestige1') : t('acad.cond.prestigeN', { n: c.count });
  }
}

/** Libellé du bonus permanent d'une leçon. */
function lessonEffectLabel(e: AcademyEffect): string {
  const pct = (x: number) => Math.round(x * 100);
  switch (e.type) {
    case 'none':              return t('acad.eff.none');
    case 'click_multiplier':  return t('acad.eff.click', { mult: formatMultiplier(e.multiplier) });
    case 'echo_replay':       return t('acad.eff.echo', { n: e.seconds });
    case 'click_share':       return t('acad.eff.share', { pct: pct(e.share) });
    case 'contract_speed':    return t('acad.eff.contractSpeed', { pct: pct(1 - e.factor) });
    case 'agent_multiplier':  return t('acad.eff.agent', { agent: AGENTS.find(a => a.id === e.agentId)?.name ?? e.agentId, mult: formatMultiplier(e.multiplier) });
    case 'offline_rate':      return t('acad.eff.offlineRate', { pct: pct(e.points) });
    case 'offline_cap':       return t('acad.eff.offlineCap', { n: e.hours });
    case 'delegation':        return t(e.level === 1 ? 'acad.eff.delegation1' : 'acad.eff.delegation2');
    case 'client_multiplier': return t('acad.eff.client', { mult: formatMultiplier(e.multiplier) });
    case 'agent_discount':    return t('acad.eff.discount', { pct: pct(e.reduction) });
    case 'contract_reward':   return t('acad.eff.contractReward', { mult: formatMultiplier(e.multiplier) });
    case 'market_soften':     return t('acad.eff.market');
    case 'contract_slot':     return t('acad.eff.slot');
    case 'payback':           return t('acad.eff.payback');
    case 'lead_frequency':    return t('acad.eff.lead', { pct: Math.round((1 / e.factor - 1) * 100) });
    case 'rp_multiplier':     return t('acad.eff.rp', { mult: formatMultiplier(e.multiplier) });
    case 'global_multiplier': return t('acad.eff.global', { mult: formatMultiplier(e.multiplier) });
  }
}

/** Report gratuit des réussites de l'ancienne Academy (une seule annonce). */
function migrateLegacyAcademy(): void {
  const { state: next, migrated } = engine.migrateLegacyAcademy(state, academy.getLegacyCompleted());
  if (!migrated.length) return;
  state = next;
  saveSystem.save(state);
  if (academy.wasMigrationAnnounced()) return;
  academy.markMigrationAnnounced();
  setTimeout(() => notifyMilestone(t('acad.migrated', { n: migrated.length })), NEW_MARKETS_DELAY_MS);
}

function updateAcademyBadge(): void {
  setText(tabCountAcademy, `${engine.getLearnedLessonCount(state)}/${ACADEMY_LESSONS.length}`);
  tabCountAcademy.classList.toggle('has-new', ACADEMY_LESSONS.some(l => engine.canLearnLesson(state, l.id)));
}

/** Clé de l'état du cahier : quand elle change (condition remplie, leçon acquise), on le redessine. */
function academyKey(): string {
  return ACADEMY_LESSONS.map(l => lessonStatus(l)[0]).join('');
}
let academyRenderedKey = '';

function lessonPage(l: AcademyLesson): string {
  const status = lessonStatus(l);
  if (status === 'locked') {
    return `<li><div class="acad-page locked" aria-label="${t('acad.locked')}">
      <span class="acad-page-title">${icon('lock')}???</span>
      <span class="acad-page-meta">${t('acad.locked')}</span></div></li>`;
  }
  if (status === 'pending') {
    const missing = l.conditions.filter(c => !engine.isLessonConditionMet(state, c)).map(conditionLabel).join(' · ');
    return `<li><div class="acad-page pending">
      <span class="acad-page-title">???</span>
      <span class="acad-page-meta">${missing} · ${formatCurrencyCompact(l.cost)}</span></div></li>`;
  }
  const learned = status === 'learned';
  return `<li><button type="button" class="acad-page ${status}" data-lesson="${l.id}">
      <span class="acad-page-title">${l.title}</span>
      <span class="acad-page-bonus">${lessonEffectLabel(l.effect)}</span>
      ${learned
        ? `<span class="acad-stamp">${t('acad.learned')}</span>`
        : `<span class="acad-page-cost">${formatCurrencyCompact(l.cost)}</span>`}
    </button></li>`;
}

function renderAcademy(): void {
  updateAcademyBadge();
  academyRenderedKey = academyKey();
  const open = academyOpenId ? ACADEMY_LESSONS.find(l => l.id === academyOpenId) : undefined;
  if (open) { renderLessonSheet(open); return; }

  const n = engine.getLearnedLessonCount(state);
  const pct = Math.round((n / ACADEMY_LESSONS.length) * 100);
  const root = ACADEMY_LESSONS.filter(l => l.branch === 'root');
  const branches = ACADEMY_BRANCHES.map(b => {
    const lessons = ACADEMY_LESSONS.filter(l => l.branch === b);
    const done = lessons.filter(l => engine.isLessonLearned(state, l.id)).length;
    const unfolded = academyOpenBranches.has(b) || lessons.some(l => lessonStatus(l) === 'open');
    return `
      <details class="acad-branch" data-branch="${b}"${unfolded ? ' open' : ''}>
        <summary class="acad-branch-head">
          <span class="acad-branch-name">${t(`acad.branch.${b}` as UiKey)}</span>
          <span class="acad-branch-count">${done}/${lessons.length}</span>
          <span class="chapter-chevron">${icon('chevron')}</span>
        </summary>
        <ol class="acad-pages">${lessons.map(lessonPage).join('')}</ol>
      </details>`;
  }).join('');

  tabAcademy.innerHTML = `
    <div class="academy-intro">
      <div class="academy-intro-title">${icon('cap')}${t('acad.title')}</div>
      <div class="academy-intro-sub">${t('acad.sub')}</div>
    </div>
    <div class="academy-xp-bar-wrap">
      <span class="academy-xp-label">${t('acad.grade', { grade: t(getAcademyGrade(n).key) })}</span>
      <div class="academy-xp-track" role="progressbar" aria-valuemin="0" aria-valuemax="${ACADEMY_LESSONS.length}" aria-valuenow="${n}">
        <div class="academy-xp-fill" style="width:${pct}%"></div>
      </div>
      <span class="academy-xp-value">${t('acad.progress', { n, total: ACADEMY_LESSONS.length, xp: n * XP_PER_LESSON })}</span>
    </div>
    <ol class="acad-pages acad-root">${root.map(lessonPage).join('')}</ol>
    <div class="acad-branches">${branches}</div>
  `;

  tabAcademy.querySelectorAll<HTMLDetailsElement>('.acad-branch').forEach(d => {
    d.addEventListener('toggle', () => {
      const b = d.dataset['branch']!;
      if (d.open) academyOpenBranches.add(b); else academyOpenBranches.delete(b);
    });
  });
  tabAcademy.querySelectorAll<HTMLElement>('[data-lesson]').forEach(el => {
    el.addEventListener('click', () => {
      academyOpenId = el.dataset['lesson']!;
      renderAcademy();
      tabAcademy.closest('.tab-panels')?.scrollTo({ top: 0 });
    });
  });
}

function renderLessonSheet(l: AcademyLesson): void {
  const learned = engine.isLessonLearned(state, l.id);
  const order = academy.getAnswerOrder(l.id);
  const wrong = academyWrongId === l.id;
  tabAcademy.innerHTML = `
    <div class="acad-sheet">
      <button class="gpturbo-back" id="academy-back" type="button">${icon('back')}${t('acad.back')}</button>
      <article class="acad-sheet-page${learned ? ' learned' : ''}" aria-labelledby="acad-sheet-title">
        <div class="acad-sheet-kicker">${t(`acad.branch.${l.branch}` as UiKey)}</div>
        <h3 class="acad-sheet-title" id="acad-sheet-title">${l.title}</h3>
        <p class="acad-sheet-lesson">${l.lesson}</p>
        <p class="acad-sheet-real"><strong>${t('acad.realLife')}</strong> ${l.realLife}</p>
        <div class="acad-sheet-bonus"><span class="label">${t('acad.bonus')}</span>${lessonEffectLabel(l.effect)}</div>
        ${learned ? `<span class="acad-stamp acad-stamp-big">${t('acad.learned')}</span>` : `
        <div class="acad-quiz">
          <p class="acad-question" id="acad-question">${l.question}</p>
          <div class="acad-answers" role="group" aria-labelledby="acad-question">
            ${order.map((orig, i) => `<button type="button" class="acad-answer" data-answer="${i}"><span>${l.answers[orig]}</span></button>`).join('')}
          </div>
          <p class="acad-feedback${wrong ? '' : ' hidden'}" role="status">${wrong ? t('acad.wrong') : ''}</p>
          <div class="acad-quiz-foot">
            <span class="acad-cost">${t('acad.cost', { amount: formatCurrencyCompact(l.cost) })}</span>
            <span class="acad-status" id="acad-status" aria-live="polite"></span>
          </div>
          <p class="acad-rule">${t('acad.rule')}</p>
        </div>`}
      </article>
    </div>
  `;
  document.getElementById('academy-back')!.addEventListener('click', () => {
    academyOpenId = null;
    academyWrongId = null;
    renderAcademy();
  });
  tabAcademy.querySelectorAll<HTMLButtonElement>('[data-answer]').forEach(btn => {
    btn.addEventListener('click', () => answerLesson(l, Number(btn.dataset['answer'])));
  });
  updateAcademyLive();
}

function answerLesson(l: AcademyLesson, displayIdx: number): void {
  if (academy.getRetrySeconds(l.id) > 0 || !engine.canLearnLesson(state, l.id)) return;
  const chosen = academy.getAnswerOrder(l.id)[displayIdx];
  if (chosen !== l.correct) {
    academy.recordWrong(l.id);
    stats.lessonWrong(l.id);
    academyWrongId = l.id;
    renderAcademy();
    return;
  }
  state = engine.learnLesson(state, l.id);
  stats.lessonLearned(l.id);
  academyWrongId = null;
  saveSystem.save(state);
  applyReputationEffects();
  renderer.markDirty();
  notifyMilestone(t('acad.done', { title: l.title, bonus: lessonEffectLabel(l.effect) }));
  playMilestone();
  flashScreen('ambre', 8);
  renderAcademy();
  tabAcademy.querySelector('.acad-stamp-big')?.classList.add('stamp-in');
}

/** À chaque image : badge, boutons de réponse (prix, attente de 20 s), cahier à redessiner. */
function updateAcademyLive(): void {
  updateAcademyBadge();
  if (!tabAcademy.classList.contains('active')) return;
  if (!academyOpenId) {
    if (academyKey() !== academyRenderedKey) { renderAcademy(); return; }
    tabAcademy.querySelectorAll<HTMLElement>('.acad-page.open').forEach(el => {
      el.classList.toggle('affordable', engine.canLearnLesson(state, el.dataset['lesson']!));
    });
    return;
  }
  const l = ACADEMY_LESSONS.find(x => x.id === academyOpenId);
  const status = document.getElementById('acad-status');
  if (!l || !status || engine.isLessonLearned(state, l.id)) return;
  const wait = academy.getRetrySeconds(l.id);
  const short = l.cost - state.currency;
  const blocked = wait > 0 || short > 0 || !engine.canStudyLesson(state, l.id);
  tabAcademy.querySelectorAll<HTMLButtonElement>('[data-answer]').forEach(b => { b.disabled = blocked; });
  setText(status, wait > 0 ? t('acad.retryIn', { n: wait }) : short > 0 ? t('acad.missing', { amount: formatCurrency(short) }) : '');
}

function updateContractProgressBars(): void {
  const slots = contractSys.getSlots();
  for (const slot of slots) {
    if (!slot || slot.status !== 'accepted') continue;
    const bar = tabContracts.querySelector(`[data-progress-id="${slot.id}"]`) as HTMLElement | null;
    if (bar) bar.style.width = `${Math.round(contractSys.getProgress(slot) * 100)}%`;
    const timer = tabContracts.querySelector(`[data-contract-id="${slot.id}"] .contract-timer`) as HTMLElement | null;
    if (timer) {
      const tl = formatTimeLeft((slot.completesAt ?? 0) - Date.now());
      const text = timer.querySelector('.contract-timer-text');
      if (text) text.textContent = tl.label;
      timer.className = `contract-timer${tl.urgent ? ' urgent' : ''}`;
    }
  }
}

// Onglets visibles au chargement : en fin de module, une fois toutes les constantes initialisées
// (avant le premier rendu, sans animation ni bulle d'aide).
updateTabs(true);
