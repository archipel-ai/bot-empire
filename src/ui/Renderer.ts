import { GameState } from '../core/GameState.ts';
import { GameEngine } from '../core/GameEngine.ts';
import { AGENTS, TEAM_TIERS, TEAM_TIER_MULT, getTeamTier, getTeamTierMultiplier, getNextTeamTier } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';
import { formatCurrency, formatRate, formatMultiplier } from '../utils/format.ts';
import { t } from '../i18n/i18n.ts';
import { icon, AGENT_ICONS, CLIENT_ICONS, upgradeIcon } from './icons.ts';

const COUNTER_RATE = 9; // 1/s : vitesse de rattrapage des compteurs
const REVEAL_SHARE = 0.25; // un objet bloqué se dévoile à 25 % de son prix
const BUY_MODE_KEY = 'bot-empire-buy-mode';

/** Quantité achetée d'un clic sur un agent : 1, 10 ou le maximum abordable. */
export type BuyMode = '1' | '10' | 'max';
const BUY_MODES: BuyMode[] = ['1', '10', 'max'];

function loadBuyMode(): BuyMode {
  try {
    const saved = localStorage.getItem(BUY_MODE_KEY);
    if (saved === '1' || saved === '10' || saved === 'max') return saved;
  } catch { /* stockage bloqué : ×1 */ }
  return '1';
}

export class Renderer {
  private engine: GameEngine;
  private agentsPanelDirty = true;
  private clientsPanelDirty = true;
  private upgradesPanelDirty = true;

  // Éléments header
  private elCurrency = document.getElementById('hd-currency')!;
  private elRate = document.getElementById('hd-rate')!;
  private elTotal = document.getElementById('hd-total')!;
  private elPrestigeBadge = document.getElementById('prestige-badge')!;
  private elPrestigeCount = document.getElementById('prestige-count')!;

  // Éléments left panel
  private elClickValue = document.getElementById('click-value-display')!;
  private elStatAgents = document.getElementById('stat-agents')!;
  private elStatClients = document.getElementById('stat-clients')!;
  private elStatUpgrades = document.getElementById('stat-upgrades')!;
  private elStatMultiplier = document.getElementById('stat-multiplier')!;
  private elStatOffline = document.getElementById('stat-offline')!;
  private elPrestigeBar = document.getElementById('prestige-bar-fill')!;
  private elPrestigePct = document.getElementById('prestige-pct')!;
  private elPrestigeTarget = document.getElementById('prestige-target')!;
  private elBtnPrestige = document.getElementById('btn-prestige') as HTMLButtonElement;

  // Tab counts
  private elTabCountAgents = document.getElementById('tab-count-agents')!;
  private elTabCountClients = document.getElementById('tab-count-clients')!;
  private elTabCountUpgrades = document.getElementById('tab-count-upgrades')!;
  private elTabCountAgency = document.getElementById('tab-count-agency')!;

  // Tab content panels
  private elTabAgents = document.getElementById('tab-agents')!;
  private elTabClients = document.getElementById('tab-clients')!;
  private elTabUpgrades = document.getElementById('tab-upgrades')!;

  // Barre « Prochain client »
  private elNextClient = document.getElementById('next-client')!;
  private elNextLabel = document.getElementById('next-client-label')!;
  private elNextFill = document.getElementById('next-client-fill')!;
  private elNextPct = document.getElementById('next-client-pct')!;

  private buyMode: BuyMode = loadBuyMode();
  private revealKey = '';

  // Compteurs affichés en défilement (tween) vers leur valeur réelle
  private shownCurrency = -1;
  private shownRate = -1;
  private lastFrame = 0;
  private reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  constructor(engine: GameEngine) {
    this.engine = engine;
  }

  /**
   * Fait grimper une valeur affichée vers sa cible : rapide quand l'écart est grand,
   * immédiat à la baisse (un achat se voit tout de suite) ou avec prefers-reduced-motion.
   */
  private tween(shown: number, target: number, dt: number): number {
    if (shown < 0 || target < shown || this.reducedMotion.matches) return target;
    const next = shown + (target - shown) * (1 - Math.exp(-dt * COUNTER_RATE));
    return target - next < Math.max(0.005, target * 1e-6) ? target : next;
  }

  /** Mode d'achat des agents (mémorisé sur l'appareil, hors sauvegarde). */
  getBuyMode(): BuyMode { return this.buyMode; }

  setBuyMode(mode: BuyMode): void {
    this.buyMode = mode;
    try { localStorage.setItem(BUY_MODE_KEY, mode); } catch { /* silencieux */ }
    this.agentsPanelDirty = true;
  }

  /** Quantité qu'un clic sur « recruter » achète pour cet agent, selon le mode. */
  getBuyQuantity(state: GameState, agentId: string): number {
    if (this.buyMode === '10') return 10;
    if (this.buyMode === 'max') return Math.max(1, this.engine.getAffordableAgentCount(state, agentId));
    return 1;
  }

  markDirty(): void {
    this.agentsPanelDirty = true;
    this.clientsPanelDirty = true;
    this.upgradesPanelDirty = true;
  }

  setOfflineStat(text: string): void {
    this.elStatOffline.textContent = text;
  }

  update(state: GameState): void {
    const rate = this.engine.getTotalRate(state);
    const clickVal = this.engine.getClickValue(state);
    const prestigeMult = this.engine.getPrestigeMultiplier(state);
    const progress = this.engine.getPrestigeProgress(state);
    const canPrestige = this.engine.canPrestige(state);

    // Header (compteurs en défilement)
    const now = performance.now();
    const dt = this.lastFrame ? Math.min((now - this.lastFrame) / 1000, 0.25) : 0;
    this.lastFrame = now;
    this.shownCurrency = this.tween(this.shownCurrency, state.currency, dt);
    this.shownRate = this.tween(this.shownRate, rate, dt);
    this.elCurrency.textContent = formatCurrency(this.shownCurrency);
    this.elRate.textContent = formatRate(this.shownRate);
    this.elTotal.textContent = formatCurrency(state.totalEarned);

    if (state.prestigeCount > 0) {
      this.elPrestigeBadge.style.display = '';
      this.elPrestigeCount.textContent = `×${state.prestigeCount}`;
    }

    // Left panel
    this.elClickValue.textContent = `+${formatCurrency(clickVal)}`;
    this.elStatAgents.textContent = String(this.engine.getTotalAgentCount(state));
    this.elStatClients.textContent = String(this.engine.getUnlockedClientCount(state));
    this.elStatUpgrades.textContent = String(this.engine.getPurchasedUpgradeCount(state));
    this.elStatMultiplier.textContent = `×${prestigeMult.toFixed(2)}`;

    // Prestige bar
    const pct = Math.floor(progress * 100);
    const threshold = this.engine.getPrestigeThreshold(state);
    this.elPrestigeBar.style.width = `${pct}%`;
    this.elPrestigePct.textContent = `${pct}%`;
    this.elTabCountAgency.textContent = `${pct}%`;
    this.elTabCountAgency.classList.toggle('ready', canPrestige);
    this.elPrestigeTarget.textContent = t('prestige.target', { amount: formatCurrency(threshold) });
    this.elBtnPrestige.disabled = !canPrestige;

    // Tab counts
    this.elTabCountAgents.textContent = String(this.engine.getTotalAgentCount(state));
    this.elTabCountClients.textContent = String(this.engine.getUnlockedClientCount(state));
    this.elTabCountUpgrades.textContent = String(this.engine.getPurchasedUpgradeCount(state));

    this.updateNextClient(state);

    // Un objet passe le seuil des 25 % : on reconstruit pour le dévoiler
    const key = this.computeRevealKey(state);
    if (key !== this.revealKey) {
      this.revealKey = key;
      this.markDirty();
    }

    // Panels (rebuild uniquement si dirty)
    if (this.agentsPanelDirty) {
      this.renderAgents(state);
      this.agentsPanelDirty = false;
    } else {
      this.updateAgentButtons(state);
    }
    if (this.clientsPanelDirty) {
      this.renderClients(state);
      this.clientsPanelDirty = false;
    }
    if (this.upgradesPanelDirty) {
      this.renderUpgrades(state);
      this.upgradesPanelDirty = false;
    } else {
      this.updateUpgradeButtons(state);
    }
  }

  // ─── PROGRESSION ───────────────────────────────────────────

  private isAgentRevealed(state: GameState, agentId: string): boolean {
    if ((state.agents[agentId]?.count ?? 0) > 0) return true;
    if (AGENTS[0]?.id === agentId) return true; // le premier agent montre au joueur quoi viser
    // totalEarned ne fait que monter pendant une partie : un objet dévoilé le reste
    return state.totalEarned >= this.engine.getAgentCost(state, agentId) * REVEAL_SHARE;
  }

  private isClientRevealed(state: GameState, clientId: string, agentRate: number): boolean {
    if (state.clientsUnlocked[clientId]) return true;
    const def = CLIENTS.find(c => c.id === clientId)!;
    return agentRate >= def.unlockRateRequired * REVEAL_SHARE;
  }

  private isUpgradeRevealed(state: GameState, upgradeId: string): boolean {
    if (state.upgradesPurchased[upgradeId]) return true;
    const def = UPGRADES.find(u => u.id === upgradeId)!;
    return state.totalEarned >= def.cost * REVEAL_SHARE;
  }

  private computeRevealKey(state: GameState): string {
    const rate = this.engine.getAgentRate(state);
    return [
      AGENTS.map(a => this.isAgentRevealed(state, a.id) ? 1 : 0).join(''),
      CLIENTS.map(c => this.isClientRevealed(state, c.id, rate) ? 1 : 0).join(''),
      UPGRADES.map(u => this.engine.isUpgradeVisible(state, u.id) ? (this.isUpgradeRevealed(state, u.id) ? 2 : 1) : 0).join(''),
    ].join('|');
  }

  /** Barre « Prochain client » : production des agents rapportée au seuil réel du prochain client. */
  private updateNextClient(state: GameState): void {
    const next = CLIENTS.find(c => !state.clientsUnlocked[c.id]);
    if (!next) {
      this.elNextLabel.textContent = t('header.allClients');
      this.elNextFill.style.width = '100%';
      this.elNextPct.textContent = '';
      this.elNextClient.setAttribute('aria-valuenow', '100');
      return;
    }
    const pct = Math.min(99, Math.floor((this.engine.getAgentRate(state) / next.unlockRateRequired) * 100));
    this.elNextLabel.textContent = t('header.nextClient');
    this.elNextFill.style.width = `${pct}%`;
    this.elNextPct.textContent = t('header.pct', { n: pct });
    this.elNextClient.setAttribute('aria-valuenow', String(pct));
  }

  // ─── AGENTS ────────────────────────────────────────────────

  /** Libellé et état du bouton d'achat d'un agent selon le mode ×1 / ×10 / max. */
  private buyButton(state: GameState, agentId: string): { qty: number; cost: number; canBuy: boolean; label: string } {
    const qty = this.getBuyQuantity(state, agentId);
    const cost = this.engine.getAgentBulkCost(state, agentId, qty);
    const canBuy = state.currency >= cost;
    const label = qty > 1 ? `×${qty} · ${formatCurrency(cost)}` : formatCurrency(cost);
    return { qty, cost, canBuy, label };
  }

  /** Ligne « paliers d'équipe » d'une carte d'agent : bonus acquis et progression vers le suivant. */
  private tierLine(count: number): string {
    const tier = getTeamTier(count);
    const next = getNextTeamTier(count);
    const prev = tier > 0 ? TEAM_TIERS[tier - 1]! : 0;
    const pct = next === null ? 100 : Math.floor(((count - prev) / (next - prev)) * 100);
    const parts: string[] = [];
    if (tier > 0) parts.push(`<span class="agent-tier-bonus">${t('agent.tierBonus', { mult: formatMultiplier(getTeamTierMultiplier(count)) })}</span>`);
    parts.push(next === null
      ? `<span>${t('agent.tierMax')}</span>`
      : `<span>${t('agent.tierNext', { n: count, target: next, mult: formatMultiplier(TEAM_TIER_MULT) })}</span>`);
    return `
      <div class="agent-tier${tier > 0 ? ' reached' : ''}">
        <span class="agent-tier-bar" aria-hidden="true"><span style="width:${pct}%"></span></span>
        ${parts.join('')}
      </div>`;
  }

  private renderAgents(state: GameState): void {
    const modes = BUY_MODES.map(m => `
      <button type="button" class="buy-mode-btn${m === this.buyMode ? ' active' : ''}" data-buy-mode="${m}" aria-pressed="${m === this.buyMode}">
        ${m === 'max' ? t('buy.max') : `×${m}`}
      </button>`).join('');

    const cards = AGENTS.map(def => {
      const count = state.agents[def.id]?.count ?? 0;
      const prod = this.engine.getAgentProduction(state, def);
      const btn = this.buyButton(state, def.id);

      if (!this.isAgentRevealed(state, def.id)) {
        return `
          <div class="agent-card silhouette" data-agent="${def.id}">
            <div class="agent-icon" aria-hidden="true">?</div>
            <div class="agent-info">
              <div class="agent-name">???</div>
              <div class="agent-desc">${t('reveal.hint')}</div>
            </div>
            <div class="agent-right">
              <div class="agent-count">${count}</div>
              <button class="btn-buy" type="button" data-buy-agent="${def.id}" data-buy-qty="${btn.qty}" disabled>${btn.label}</button>
            </div>
          </div>
        `;
      }

      const unitProd = count > 0 ? prod / count : def.baseProduction * this.engine.getPrestigeMultiplier(state);

      return `
        <div class="agent-card ${btn.canBuy ? 'affordable' : ''}" data-agent="${def.id}">
          <div class="agent-icon">${icon(AGENT_ICONS[def.id] ?? 'agents')}</div>
          <div class="agent-info">
            <div class="agent-name">${def.name}</div>
            <div class="agent-desc">${def.description}</div>
            <div class="agent-prod-detail">
              <span class="agent-prod-unit">${t('agent.perUnit', { rate: formatRate(unitProd) })}</span>
              ${count > 0 ? `<span class="agent-prod-total">${t('agent.total', { rate: formatRate(prod) })}</span>` : ''}
            </div>
            ${count > 0 ? this.tierLine(count) : ''}
          </div>
          <div class="agent-right">
            <div class="agent-count">${count}</div>
            <button class="btn-buy" type="button" data-buy-agent="${def.id}" data-buy-qty="${btn.qty}" ${btn.canBuy ? '' : 'disabled'}>
              ${btn.label}
            </button>
          </div>
        </div>
      `;
    }).join('');

    this.elTabAgents.innerHTML = `
      <div class="buy-mode" role="group" aria-label="${t('buy.label')}">
        <span class="buy-mode-label">${t('buy.label')}</span>${modes}
      </div>
      ${cards}
    `;
  }

  private updateAgentButtons(state: GameState): void {
    AGENTS.forEach(def => {
      const card = this.elTabAgents.querySelector(`[data-agent="${def.id}"]`);
      if (!card) return;
      const revealed = !card.classList.contains('silhouette');
      const btnState = this.buyButton(state, def.id);
      const count = state.agents[def.id]?.count ?? 0;

      const btn = card.querySelector('[data-buy-agent]') as HTMLButtonElement | null;
      if (btn) {
        btn.disabled = !revealed || !btnState.canBuy;
        // Ne réécrire que si ça change : remplacer le texte sous le curseur peut faire perdre un clic (Safari)
        if (btn.textContent !== btnState.label) btn.textContent = btnState.label;
        btn.dataset['buyQty'] = String(btnState.qty);
      }
      const countEl = card.querySelector('.agent-count');
      if (countEl) countEl.textContent = String(count);
      card.classList.toggle('affordable', revealed && btnState.canBuy);
    });
  }

  // ─── CLIENTS ───────────────────────────────────────────────

  private renderClients(state: GameState): void {
    const rate = this.engine.getAgentRate(state); // le déblocage ne compte pas les bonus clients
    this.elTabClients.innerHTML = CLIENTS.map(def => {
      const unlocked = state.clientsUnlocked[def.id];
      const remaining = def.unlockRateRequired - rate;

      if (!this.isClientRevealed(state, def.id, rate)) {
        return `
          <div class="client-card locked silhouette">
            <div class="client-icon" aria-hidden="true">?</div>
            <div class="client-info">
              <div class="client-name">???</div>
              <div class="client-unlock">${t('client.unlockAt', { rate: formatRate(def.unlockRateRequired) })}</div>
            </div>
            <span class="client-badge locked">${icon('lock')}${t('client.locked')}</span>
          </div>
        `;
      }

      return `
        <div class="client-card ${unlocked ? 'active-contract' : 'locked'}">
          <div class="client-icon">${icon(CLIENT_ICONS[def.id] ?? 'handshake')}</div>
          <div class="client-info">
            <div class="client-name">${def.name}</div>
            <div class="client-sector">${def.sector}</div>
            <div class="client-revenue">${t('client.bonus', { rate: formatRate(def.bonusPerSecond) })}</div>
            ${!unlocked ? `<div class="client-unlock">${t('client.unlockAt', { rate: formatRate(def.unlockRateRequired) })}${remaining > 0 ? t('client.missing', { rate: formatRate(remaining) }) : ''}</div>` : ''}
          </div>
          <span class="client-badge ${unlocked ? 'active' : 'locked'}">
            ${unlocked ? `${icon('check')}${t('client.active')}` : `${icon('lock')}${t('client.locked')}`}
          </span>
        </div>
      `;
    }).join('');
  }

  // ─── UPGRADES ──────────────────────────────────────────────

  private renderUpgrades(state: GameState): void {
    const visible = UPGRADES.filter(u => this.engine.isUpgradeVisible(state, u.id));

    if (visible.length === 0) {
      this.elTabUpgrades.innerHTML = `<p class="tab-empty">${t('upgrade.empty')}</p>`;
      return;
    }

    this.elTabUpgrades.innerHTML = visible.map(def => {
      const purchased = state.upgradesPurchased[def.id];
      const canBuy = this.engine.canBuyUpgrade(state, def.id);

      if (!this.isUpgradeRevealed(state, def.id)) {
        return `
          <div class="upgrade-card silhouette">
            <div class="upgrade-icon" aria-hidden="true">?</div>
            <div class="upgrade-info">
              <div class="upgrade-name">???</div>
              <div class="upgrade-desc">${t('reveal.hint')}</div>
            </div>
            <button class="btn-upgrade" type="button" disabled>${formatCurrency(def.cost)}</button>
          </div>
        `;
      }

      return `
        <div class="upgrade-card ${purchased ? 'purchased' : canBuy ? 'affordable' : ''}">
          <div class="upgrade-icon">${icon(upgradeIcon(def.effect.type, def.effect.type === 'agent_multiplier' ? def.effect.agentId : undefined))}</div>
          <div class="upgrade-info">
            <div class="upgrade-name">${def.name}</div>
            <div class="upgrade-desc">${def.description}</div>
            <div class="upgrade-effect">${def.effectLabel}</div>
          </div>
          ${purchased
            ? `<button class="btn-upgrade purchased-btn" type="button" disabled>${t('upgrade.bought')}</button>`
            : `<button class="btn-upgrade" type="button" data-buy-upgrade="${def.id}" ${canBuy ? '' : 'disabled'}>
                ${formatCurrency(def.cost)}
              </button>`
          }
        </div>
      `;
    }).join('');
  }

  private updateUpgradeButtons(state: GameState): void {
    UPGRADES.forEach(def => {
      const btn = this.elTabUpgrades.querySelector(`[data-buy-upgrade="${def.id}"]`) as HTMLButtonElement | null;
      if (!btn) return;
      const canBuy = this.engine.canBuyUpgrade(state, def.id);
      btn.disabled = !canBuy;
      btn.closest('.upgrade-card')?.classList.toggle('affordable', canBuy);
    });
  }
}
