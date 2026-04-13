import { GameState } from '../core/GameState.ts';
import { GameEngine } from '../core/GameEngine.ts';
import { AGENTS } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { UPGRADES } from '../config/upgrades.ts';
import { formatCurrency, formatRate } from '../utils/format.ts';

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

  // Tab content panels
  private elTabAgents = document.getElementById('tab-agents')!;
  private elTabClients = document.getElementById('tab-clients')!;
  private elTabUpgrades = document.getElementById('tab-upgrades')!;

  constructor(engine: GameEngine) {
    this.engine = engine;
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

    // Header
    this.elCurrency.textContent = formatCurrency(state.currency);
    this.elRate.textContent = formatRate(rate);
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
    this.elPrestigeTarget.textContent = `Objectif : ${formatCurrency(threshold)}`;
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
              <span class="agent-prod-unit">${formatRate(unitProd)}/unité</span>
              ${count > 0 ? `<span class="agent-prod-total">${formatRate(prod)} total</span>` : ''}
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
    const rate = this.engine.getTotalRate(state);
    this.elTabClients.innerHTML = CLIENTS.map(def => {
      const unlocked = state.clientsUnlocked[def.id];
      const remaining = def.unlockRateRequired - rate;

      return `
        <div class="client-card ${unlocked ? 'active-contract' : 'locked'}">
          <div class="client-icon">${def.icon}</div>
          <div class="client-info">
            <div class="client-name">${def.name}</div>
            <div class="client-sector">${def.sector}</div>
            <div class="client-revenue">+${formatRate(def.bonusPerSecond)} bonus</div>
            ${!unlocked ? `<div class="client-unlock">Déblocage à ${formatRate(def.unlockRateRequired)}${remaining > 0 ? ` — manque ${formatRate(remaining)}` : ''}</div>` : ''}
          </div>
          <span class="client-badge ${unlocked ? 'active' : 'locked'}">
            ${unlocked ? 'Actif' : '🔒'}
          </span>
        </div>
      `;
    }).join('');
  }

  // ─── UPGRADES ──────────────────────────────────────────────

  private renderUpgrades(state: GameState): void {
    const visible = UPGRADES.filter(u => this.engine.isUpgradeVisible(state, u.id));

    if (visible.length === 0) {
      this.elTabUpgrades.innerHTML = `<p style="color:var(--text-muted);text-align:center;padding:40px 20px;">Achetez des agents pour débloquer des upgrades.</p>`;
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
            ? `<button class="btn-upgrade purchased-btn" disabled>✓ Acheté</button>`
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
