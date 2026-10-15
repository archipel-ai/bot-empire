import { GameState } from '../core/GameState.ts';
import { GameEngine } from '../core/GameEngine.ts';
import { AGENTS } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';
import { formatCurrency, formatRate } from '../utils/format.ts';
import { t } from '../i18n/i18n.ts';

const COUNTER_RATE = 9; // 1/s : vitesse de rattrapage des compteurs

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

  // ─── AGENTS ────────────────────────────────────────────────

  private renderAgents(state: GameState): void {
    this.elTabAgents.innerHTML = AGENTS.map(def => {
      const count = state.agents[def.id]?.count ?? 0;
      const cost = this.engine.getAgentCost(state, def.id);
      const canBuy = this.engine.canBuyAgent(state, def.id);
      const prod = this.engine.getAgentProduction(state, def);

      const unitProd = count > 0 ? prod / count : def.baseProduction * this.engine.getPrestigeMultiplier(state);

      return `
        <div class="agent-card ${canBuy ? 'affordable' : ''}" data-agent="${def.id}">
          <div class="agent-icon">${def.icon}</div>
          <div class="agent-info">
            <div class="agent-name">${def.name}</div>
            <div class="agent-desc">${def.description}</div>
            <div class="agent-prod-detail">
              <span class="agent-prod-unit">${t('agent.perUnit', { rate: formatRate(unitProd) })}</span>
              ${count > 0 ? `<span class="agent-prod-total">${t('agent.total', { rate: formatRate(prod) })}</span>` : ''}
            </div>
          </div>
          <div class="agent-right">
            <div class="agent-count">${count}</div>
            <button class="btn-buy" data-buy-agent="${def.id}" ${canBuy ? '' : 'disabled'}>
              ${formatCurrency(cost)}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  private updateAgentButtons(state: GameState): void {
    AGENTS.forEach(def => {
      const cost = this.engine.getAgentCost(state, def.id);
      const canBuy = this.engine.canBuyAgent(state, def.id);
      const count = state.agents[def.id]?.count ?? 0;
      const card = this.elTabAgents.querySelector(`[data-agent="${def.id}"]`);
      if (!card) return;

      const btn = card.querySelector(`[data-buy-agent]`) as HTMLButtonElement;
      if (btn) {
        btn.disabled = !canBuy;
        btn.textContent = formatCurrency(cost);
      }
      const countEl = card.querySelector('.agent-count');
      if (countEl) countEl.textContent = String(count);
      card.classList.toggle('affordable', canBuy);
    });
  }

  // ─── CLIENTS ───────────────────────────────────────────────

  private renderClients(state: GameState): void {
    const rate = this.engine.getAgentRate(state); // le déblocage ne compte pas les bonus clients
    this.elTabClients.innerHTML = CLIENTS.map(def => {
      const unlocked = state.clientsUnlocked[def.id];
      const remaining = def.unlockRateRequired - rate;

      return `
        <div class="client-card ${unlocked ? 'active-contract' : 'locked'}">
          <div class="client-icon">${def.icon}</div>
          <div class="client-info">
            <div class="client-name">${def.name}</div>
            <div class="client-sector">${def.sector}</div>
            <div class="client-revenue">${t('client.bonus', { rate: formatRate(def.bonusPerSecond) })}</div>
            ${!unlocked ? `<div class="client-unlock">${t('client.unlockAt', { rate: formatRate(def.unlockRateRequired) })}${remaining > 0 ? t('client.missing', { rate: formatRate(remaining) }) : ''}</div>` : ''}
          </div>
          <span class="client-badge ${unlocked ? 'active' : 'locked'}">
            ${unlocked ? t('client.active') : '🔒'}
          </span>
        </div>
      `;
    }).join('');
  }

  // ─── UPGRADES ──────────────────────────────────────────────

  private renderUpgrades(state: GameState): void {
    const visible = UPGRADES.filter(u => this.engine.isUpgradeVisible(state, u.id));

    if (visible.length === 0) {
      this.elTabUpgrades.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:40px 20px;">${t('upgrade.empty')}</p>`;
      return;
    }

    this.elTabUpgrades.innerHTML = visible.map(def => {
      const purchased = state.upgradesPurchased[def.id];
      const canBuy = this.engine.canBuyUpgrade(state, def.id);

      return `
        <div class="upgrade-card ${purchased ? 'purchased' : canBuy ? 'affordable' : ''}">
          <div class="upgrade-icon">${def.icon}</div>
          <div class="upgrade-info">
            <div class="upgrade-name">${def.name}</div>
            <div class="upgrade-desc">${def.description}</div>
            <div class="upgrade-effect">${def.effectLabel}</div>
          </div>
          ${purchased
            ? `<button class="btn-upgrade purchased-btn" disabled>${t('upgrade.bought')}</button>`
            : `<button class="btn-upgrade" data-buy-upgrade="${def.id}" ${canBuy ? '' : 'disabled'}>
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
    });
  }
}
