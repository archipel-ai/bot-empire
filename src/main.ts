/**
 * Bot Empire — Main entry point
 * Stack: Vanilla TypeScript + Vite (pas de Phaser — les idle games sont DOM-natifs)
 */

import './style.css';
import { GameEngine } from './core/GameEngine.ts';
import { SaveSystem } from './core/SaveSystem.ts';
import { Renderer } from './ui/Renderer.ts';
import { Bureau } from './ui/Bureau.ts';
import { formatCurrency, formatDuration } from './utils/format.ts';
import { playClick, playPurchase, playClientUnlock, playMilestone, playPrestige } from './utils/audio.ts';
import { EchoSystem } from './systems/EchoSystem.ts';

// ─── INIT ────────────────────────────────────────────────────

const saveSystem = new SaveSystem();
const engine     = new GameEngine();
const renderer   = new Renderer(engine);
const bureau     = new Bureau();
const echo       = new EchoSystem();

// Éléments ÉCHO
const btnEcho       = document.getElementById('btn-echo')     as HTMLButtonElement;
const echoSub       = document.getElementById('echo-sub')!;
const echoBarWrap   = document.getElementById('echo-bar-wrap')!;
const echoBarFill   = document.getElementById('echo-bar-fill')!;
const echoTimerLbl  = document.getElementById('echo-timer-label')!;
const btnClick      = document.getElementById('btn-click')    as HTMLButtonElement;

let state = saveSystem.load();

// Production offline
const offlineSeconds = saveSystem.getOfflineSeconds(state);
if (offlineSeconds > 10) {
  const { state: newState, earned } = engine.applyOfflineEarnings(state, offlineSeconds);
  state = newState;
  if (earned > 0) showOfflineModal(earned, offlineSeconds);
}

// Autosave
saveSystem.startAutosave(() => state);

// ─── MILESTONES ──────────────────────────────────────────────

const MILESTONES = [10, 100, 1_000, 10_000, 100_000, 1_000_000, 10_000_000, 100_000_000];
const MILESTONE_LABELS: Record<number, string> = {
  10: '🎉 Premiers €10 gagnés !',
  100: '💰 €100 en poche !',
  1_000: '🚀 €1 000 — l\'agence décolle !',
  10_000: '⭐ €10 000 — client premium débloqué !',
  100_000: '🔥 €100K — vous êtes sérieux !',
  1_000_000: '👑 €1M — empire en construction !',
  10_000_000: '💎 €10M — légende du secteur !',
  100_000_000: '🌍 €100M — vous avez tout scalé !',
};
// Initialiser l'index milestone en fonction de l'état chargé
let milestoneIdx = MILESTONES.findIndex(m => m > state.totalEarned);
if (milestoneIdx === -1) milestoneIdx = MILESTONES.length;

// ─── GAME LOOP ───────────────────────────────────────────────

const TICK_MS = 100;
let accumulator = 0;
let lastTimestamp = 0;

function gameLoop(timestamp: number): void {
  if (lastTimestamp === 0) lastTimestamp = timestamp;
  const delta = Math.min(timestamp - lastTimestamp, 1000); // cap à 1s pour éviter les sauts
  lastTimestamp = timestamp;
  accumulator += delta;

  while (accumulator >= TICK_MS) {
    const dt = TICK_MS / 1000;

    // Clics automatiques ÉCHO
    const echoClicks = echo.tick(dt);
    for (let i = 0; i < echoClicks; i++) {
      state = engine.click(state);
      triggerGhostClick();
    }

    const { state: nextState, result } = engine.tick(state, dt);
    state = nextState;
    accumulator -= TICK_MS;

    // Nouveaux clients déverrouillés
    result.newClients.forEach(clientId => {
      renderer.markDirty();
      const name = clientId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      notify(`🤝 Nouveau client : ${name}`, 'green');
      playClientUnlock();
    });

    // Milestones
    while (milestoneIdx < MILESTONES.length && state.totalEarned >= MILESTONES[milestoneIdx]) {
      const label = MILESTONE_LABELS[MILESTONES[milestoneIdx]] ?? `🏆 ${formatCurrency(MILESTONES[milestoneIdx])} atteints !`;
      notifyMilestone(label);
      playMilestone();
      milestoneIdx++;
    }
  }

  bureau.update(delta / 1000, state);
  renderer.update(state);
  updateEchoUI();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// ─── EVENTS ──────────────────────────────────────────────────

// Bouton clic principal
btnClick.addEventListener('click', (e) => {
  state = engine.click(state);
  echo.recordClick();
  renderer.markDirty();
  spawnRipple(e);
  playClick();
});

// Bouton ÉCHO
btnEcho.addEventListener('click', () => {
  if (!echo.canActivate()) return;
  echo.activate();
  notify('↺ Mode ÉCHO activé — vos clics se rejouent pendant 60s !', 'orange');
});

// Délégation — achat agent
document.getElementById('tab-agents')!.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest('[data-buy-agent]') as HTMLElement | null;
  if (!btn) return;
  const agentId = btn.dataset['buyAgent']!;
  const prev = state.agents[agentId]?.count ?? 0;
  state = engine.buyAgent(state, agentId);
  if ((state.agents[agentId]?.count ?? 0) > prev) {
    renderer.markDirty();
    notify(`🤖 Agent recruté !`, 'green');
    playPurchase();
  }
});

// Délégation — achat upgrade
document.getElementById('tab-upgrades')!.addEventListener('click', (e) => {
  const btn = (e.target as Element).closest('[data-buy-upgrade]') as HTMLElement | null;
  if (!btn) return;
  const upgradeId = btn.dataset['buyUpgrade']!;
  const prev = state.upgradesPurchased[upgradeId];
  state = engine.buyUpgrade(state, upgradeId);
  if (!prev && state.upgradesPurchased[upgradeId]) {
    renderer.markDirty();
    notify(`⚙️ Upgrade activé !`, 'purple');
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
    // Forcer le re-render du panel activé
    renderer.markDirty();
  });
});

// Prestige — ouvre la modal
document.getElementById('btn-prestige')!.addEventListener('click', () => {
  if (!engine.canPrestige(state)) return;
  const mult = engine.getPrestigeMultiplier(state);
  const newMult = 1 + (state.prestigeCount + 1) * 0.15;
  document.getElementById('modal-value')!.textContent = formatCurrency(state.totalEarned);
  document.getElementById('modal-multiplier')!.textContent = `+${15}%`;
  document.getElementById('modal-total-multi')!.textContent = `×${newMult.toFixed(2)}`;
  document.getElementById('prestige-overlay')!.classList.remove('hidden');
  void mult; // utilisé ci-dessus
});

document.getElementById('btn-prestige-confirm')!.addEventListener('click', () => {
  state = engine.prestige(state);
  // Réinitialiser les milestones (on recommence)
  milestoneIdx = 0;
  saveSystem.save(state);
  renderer.markDirty();
  document.getElementById('prestige-overlay')!.classList.add('hidden');
  playPrestige();
  notify('🏆 Agence vendue ! Multiplicateur permanent acquis.', 'purple');
});

document.getElementById('btn-prestige-cancel')!.addEventListener('click', () => {
  document.getElementById('prestige-overlay')!.classList.add('hidden');
});

// Offline modal
document.getElementById('btn-offline-close')!.addEventListener('click', () => {
  document.getElementById('offline-overlay')!.classList.add('hidden');
});

// ─── HELPERS ─────────────────────────────────────────────────

// Enregistrement SW pour PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/bot-empire/sw.js').catch(() => {/* dev mode */});
  });
}

function updateEchoUI(): void {
  const es = echo.getState();
  btnEcho.disabled = !es.canActivate && !es.isActive;
  btnEcho.classList.toggle('active-echo', es.isActive);

  if (es.isActive) {
    echoSub.textContent = `Actif — ${es.replayRemaining}s restantes`;
    echoBarWrap.style.display = '';
    echoBarFill.style.width   = `${(es.replayRemaining / 60) * 100}%`;
    echoTimerLbl.textContent  = `${es.replayRemaining}s`;
  } else if (es.isOnCooldown) {
    const m = Math.floor(es.cooldownRemaining / 60);
    const s = es.cooldownRemaining % 60;
    echoSub.textContent = `Recharge — ${m}:${String(s).padStart(2,'0')}`;
    echoBarWrap.style.display = '';
    echoBarFill.style.width   = `${((120 - es.cooldownRemaining) / 120) * 100}%`;
    echoTimerLbl.textContent  = `${m}:${String(s).padStart(2,'0')}`;
    echoBarFill.style.background = 'var(--text-muted)';
  } else {
    echoBarFill.style.background = 'var(--accent-blue)';
    echoBarWrap.style.display    = 'none';
    if (es.clicksRecorded < 3) {
      echoSub.textContent = `Cliquez ${3 - es.clicksRecorded}× de plus pour activer`;
    } else {
      echoSub.textContent = `${es.clicksRecorded} clics mémorisés — prêt !`;
    }
  }
}

let ghostClickTimeout: ReturnType<typeof setTimeout> | null = null;
function triggerGhostClick(): void {
  btnClick.classList.add('ghost-clicking');
  if (ghostClickTimeout) clearTimeout(ghostClickTimeout);
  ghostClickTimeout = setTimeout(() => btnClick.classList.remove('ghost-clicking'), 300);
}

function notifyMilestone(message: string): void {
  const container = document.getElementById('notifications')!;
  const el = document.createElement('div');
  el.className = 'notif milestone';
  el.textContent = message;
  container.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'fadeOut 0.3s ease forwards';
    setTimeout(() => el.remove(), 300);
  }, 5000); // milestones restent 5s
}

function notify(message: string, color: 'green' | 'purple' | 'orange' = 'green'): void {
  const container = document.getElementById('notifications')!;
  const el = document.createElement('div');
  el.className = `notif ${color === 'purple' ? 'purple' : color === 'orange' ? 'orange' : ''}`;
  el.textContent = message;
  container.appendChild(el);
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

function showOfflineModal(earned: number, seconds: number): void {
  renderer.setOfflineStat(formatDuration(seconds));
  document.getElementById('offline-earned-amount')!.textContent = formatCurrency(earned);
  document.getElementById('offline-overlay')!.classList.remove('hidden');
}
