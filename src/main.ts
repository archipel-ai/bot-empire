/**
 * Bot Empire — Main entry point
 * Stack: Vanilla TypeScript + Vite (pas de Phaser — les idle games sont DOM-natifs)
 */

import './style.css';
import { GameEngine } from './core/GameEngine.ts';
import { SaveSystem } from './core/SaveSystem.ts';
import { type GameState } from './core/GameState.ts';
import { Renderer } from './ui/Renderer.ts';
import { Bureau } from './ui/Bureau.ts';
import { formatCurrency, formatDuration } from './utils/format.ts';
import { playClick, playPurchase, playClientUnlock, playMilestone, playPrestige } from './utils/audio.ts';
import { EchoSystem } from './systems/EchoSystem.ts';
import { IncidentSystem, type IncidentQuestion } from './systems/IncidentSystem.ts';
import { Tutorial } from './ui/Tutorial.ts';
import { CLIENTS } from './config/clients.ts';
import { CloudSave } from './core/CloudSave.ts';
import { FIREBASE_CONFIG, CLOUD_SAVE_ENABLED } from './config/firebase.ts';
import { ContractSystem, type ActiveContract } from './systems/ContractSystem.ts';
import { MarketSystem } from './systems/MarketSystem.ts';
import { AcademySystem } from './systems/AcademySystem.ts';
import { CHAPTERS, CHALLENGES, getChallengesByChapter, type AcademyChallenge } from './config/academy.ts';
import { REPUTATION_PERKS } from './config/reputationPerks.ts';
import { spawnFloatingNumber, spawnPrestigeConfetti, flashScreen, typeText } from './utils/gamefeel.ts';
import { formatRate } from './utils/format.ts';
import { AGENTS } from './config/agents.ts';

// ─── INIT ────────────────────────────────────────────────────

const saveSystem  = new SaveSystem();
const engine      = new GameEngine();
const renderer    = new Renderer(engine);
const bureau      = new Bureau();
const echo        = new EchoSystem();
const incident    = new IncidentSystem();
const tutorial    = new Tutorial();
const cloud       = new CloudSave();
const contractSys = new ContractSystem();
const market      = new MarketSystem();
const academy     = new AcademySystem();

// Marché IA Vivant — éléments bannière
const marketBanner     = document.getElementById('market-banner')!;
const marketBannerIcon = document.getElementById('market-banner-icon')!;
const marketBannerName = document.getElementById('market-banner-name')!;
const marketBannerDesc = document.getElementById('market-banner-desc')!;
const marketBannerEff  = document.getElementById('market-banner-effect')!;
const marketBannerTime = document.getElementById('market-banner-timer')!;

market.setCallbacks(
  (ev) => {
    const mult   = ev.event.effect.multiplier;
    const isBoost = mult >= 1;
    const label  = ev.event.effect.type === 'income'
      ? (isBoost ? `+${Math.round((mult - 1) * 100)}% revenus` : `−${Math.round((1 - mult) * 100)}% revenus`)
      : `×${mult} clics`;
    marketBannerIcon.textContent = ev.event.icon;
    marketBannerName.textContent = ev.event.name;
    marketBannerDesc.textContent = ev.event.description;
    marketBannerEff.textContent  = label;
    marketBannerEff.className    = `market-banner-effect${isBoost ? '' : ' malus'}`;
    marketBanner.classList.remove('hidden');
    notifyMilestone(`${ev.event.icon} ${ev.event.name} — ${ev.event.description}`);
    playMilestone();
  },
  (ev) => {
    marketBanner.classList.add('hidden');
    notify(`📊 Fin d'événement : ${ev.event.name}`, 'orange');
  },
);

// Réputation — onglet
const tabReputation      = document.getElementById('tab-reputation')!;
const tabCountReputation = document.getElementById('tab-count-reputation')!;

// Academy — onglet
const tabAcademy      = document.getElementById('tab-academy')!;
const tabCountAcademy = document.getElementById('tab-count-academy')!;
let academyActiveChallengeId: string | null = null;

// Incident elements
const incidentUrgency    = document.getElementById('incident-urgency')!;
const incidentClient     = document.getElementById('incident-client')!;
const incidentProblem    = document.getElementById('incident-problem')!;
const incidentQuestion   = document.getElementById('incident-question')!;
const incidentAnswers    = document.getElementById('incident-answers')!;
const incidentTimerFill  = document.getElementById('incident-timer-fill')!;
const incidentTimerLbl   = document.getElementById('incident-timer-lbl')!;
const incidentResult     = document.getElementById('incident-result')!;
const incidentResultIcon = document.getElementById('incident-result-icon')!;
const incidentLesson     = document.getElementById('incident-lesson')!;
let incidentTimer        = 0;
let incidentActive       = false;
let incidentResolved     = false;
const INCIDENT_DURATION  = 45;

// Éléments ÉCHO
const btnEcho       = document.getElementById('btn-echo')     as HTMLButtonElement;
const echoSub       = document.getElementById('echo-sub')!;
const echoBarWrap   = document.getElementById('echo-bar-wrap')!;
const echoBarFill   = document.getElementById('echo-bar-fill')!;
const echoTimerLbl  = document.getElementById('echo-timer-label')!;
const btnClick      = document.getElementById('btn-click')    as HTMLButtonElement;
const btnClickFab   = document.getElementById('click-fab')    as HTMLButtonElement;
const elFabValue    = document.getElementById('click-fab-value')!

let state = saveSystem.load();

// Autosave
saveSystem.startAutosave(() => state);

// Appliquer réputation au démarrage
applyReputationEffects();

// Restaurer la bannière marché si un événement est déjà actif
{
  const ev = market.getCurrent();
  if (ev) {
    const mult    = ev.event.effect.multiplier;
    const isBoost = mult >= 1;
    const label   = ev.event.effect.type === 'income'
      ? (isBoost ? `+${Math.round((mult - 1) * 100)}% revenus` : `−${Math.round((1 - mult) * 100)}% revenus`)
      : `×${mult} clics`;
    marketBannerIcon.textContent = ev.event.icon;
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
    // Nouveau contrat disponible
    notify(`📋 Nouveau contrat : ${contract.title}`, 'orange');
    tabCountContracts.classList.add('has-new');
    renderContracts();
  },
  (contract) => {
    // Contrat complété
    state = { ...state, currency: state.currency + contract.reward, totalEarned: state.totalEarned + contract.reward };
    saveSystem.save(state);
    renderer.markDirty();
    notifyMilestone(`✅ Contrat complété ! +${formatCurrency(contract.reward)} de ${contract.client}`);
    playPurchase();
    renderContracts();
  },
);

// ─── OVERLAY MANAGER ─────────────────────────────────────────
// Un seul overlay visible à la fois — file d'attente FIFO

const OVERLAY_IDS = [
  'offline-overlay', 'import-url-overlay', 'tutorial-overlay',
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
bureau.onStageChange = (stage) => {
  notify(`${stage.icon} Nouveau bureau : ${stage.label} — ${stage.sublabel}`, 'orange');
  playMilestone();
};

// ─── SÉQUENCE DE DÉMARRAGE ───────────────────────────────────
// Ordre : offline → URL import → tutorial (jamais en simultané)

// 1. Offline earnings
const offlineSeconds = saveSystem.getOfflineSeconds(state);
if (offlineSeconds > 10) {
  const { state: newState, earned } = engine.applyOfflineEarnings(state, offlineSeconds);
  state = newState;
  if (earned > 0) openModal('offline-overlay', () => {
    renderer.setOfflineStat(formatDuration(offlineSeconds));
    document.getElementById('offline-earned-amount')!.textContent = formatCurrency(earned);
  });
}

// 2. URL import ou tutorial (après offline)
const urlState = saveSystem.decodeFromURL();
if (urlState) {
  const totalAgents = Object.values(urlState.agents).reduce((s, a) => s + a.count, 0);
  const unlockedCli = Object.values(urlState.clientsUnlocked).filter(Boolean).length;
  openModal('import-url-overlay', () => {
    document.getElementById('import-stats')!.innerHTML = `
      <div class="import-stat-row"><span>Trésorerie</span><span>${formatCurrency(urlState.currency)}</span></div>
      <div class="import-stat-row"><span>Total gagné</span><span>${formatCurrency(urlState.totalEarned)}</span></div>
      <div class="import-stat-row"><span>Agents</span><span>${totalAgents}</span></div>
      <div class="import-stat-row"><span>Clients</span><span>${unlockedCli}</span></div>
      <div class="import-stat-row"><span>Prestiges</span><span>${urlState.prestigeCount}</span></div>
    `;
  });
} else if (tutorial.shouldStart()) {
  openModal('tutorial-overlay', () => tutorial.start());
}

// ─── CLOUD SAVE INIT ─────────────────────────────────────────
if (CLOUD_SAVE_ENABLED) {
  cloud.init(FIREBASE_CONFIG).then(async (ok) => {
    if (!ok) return;
    const cloudState = await cloud.getIfNewer(state);
    if (cloudState) {
      state = cloudState;
      saveSystem.save(state);
      renderer.markDirty();
      bureau.update(0, state);
      // Restauration depuis le cloud — important quand on change d'appareil ou de contexte (PWA iOS)
      notifyMilestone('☁️ Progression restaurée depuis le cloud !');
    } else {
      cloud.push(state);
    }
    cloud.startAutoSync(() => state);
  });
}

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

    // Marché IA Vivant
    market.tick();
    updateMarketBannerTimer();

    // Clics automatiques ÉCHO
    const echoClicks = echo.tick(dt);
    const clickMult  = market.getClickMultiplier();
    for (let i = 0; i < echoClicks; i++) {
      state = engine.click(state, clickMult);
      triggerGhostClick();
    }

    const incomeMult = market.getIncomeMultiplier();
    const { state: nextState, result } = engine.tick(state, dt, incomeMult);
    state = nextState;
    accumulator -= TICK_MS;

    // Nouveaux clients déverrouillés
    result.newClients.forEach(clientId => {
      renderer.markDirty();
      const def = CLIENTS.find(c => c.id === clientId);
      const msg = def?.unlockDialogue ?? `🤝 Nouveau client : ${clientId}`;
      notifyMilestone(msg);
      playClientUnlock();
    });

    // Milestones
    while (milestoneIdx < MILESTONES.length && state.totalEarned >= MILESTONES[milestoneIdx]) {
      const label = MILESTONE_LABELS[MILESTONES[milestoneIdx]] ?? `🏆 ${formatCurrency(MILESTONES[milestoneIdx])} atteints !`;
      notifyMilestone(label);
      playMilestone();
      flashScreen('rgba(0,255,136,0.07)');
      milestoneIdx++;
    }

    // Incidents — bloqués si une modal est déjà ouverte
    const hasAgents = Object.values(state.agents).some(a => a.count > 0);
    const newIncident = incident.tick(dt, hasAgents);
    if (newIncident && !anyModalOpen()) showIncident(newIncident);

    // Contrats
    contractSys.tick(state);

    // Timer incident actif
    if (incidentActive && !incidentResolved) {
      incidentTimer -= dt;
      const pct = Math.max(0, incidentTimer / INCIDENT_DURATION) * 100;
      incidentTimerFill.style.width = `${pct}%`;
      incidentTimerLbl.textContent  = `${Math.ceil(Math.max(0, incidentTimer))}s`;
      if (incidentTimer <= 0) resolveIncident(null);
    }
  }

  bureau.update(delta / 1000, state);
  renderer.update(state);
  updateEchoUI();
  updateContractProgressBars();
  // Valeur clic sur le FAB mobile
  elFabValue.textContent = `+${formatCurrency(engine.getClickValue(state, market.getClickMultiplier()))}`;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// ─── EVENTS ──────────────────────────────────────────────────

// Logique clic partagée (btn-click + FAB)
function handleClick(e: MouseEvent | PointerEvent): void {
  const clickVal = engine.getClickValue(state, market.getClickMultiplier());
  state = engine.click(state, market.getClickMultiplier());
  echo.recordClick();
  renderer.markDirty();
  spawnFloatingNumber(clickVal, e.currentTarget as HTMLElement);
  playClick();
}

// Bouton clic principal (desktop)
btnClick.addEventListener('click', (e) => {
  spawnRipple(e);
  handleClick(e);
});

// FAB clic (mobile portrait)
btnClickFab.addEventListener('click', (e) => {
  handleClick(e);
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
    // Flash achat sur la card
    const card = btn.closest('.agent-card');
    if (card) {
      card.classList.add('just-bought');
      setTimeout(() => card.classList.remove('just-bought'), 600);
    }
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
    if (target === 'reputation') {
      renderReputation();
    }
    if (target === 'academy') {
      academyActiveChallengeId = null;
      renderAcademy();
    }
  });
});

// Prestige — ouvre la modal (uniquement si aucune autre modal ouverte)
document.getElementById('btn-prestige')!.addEventListener('click', () => {
  if (!engine.canPrestige(state) || anyModalOpen()) return;
  const newMult   = 1 + (state.prestigeCount + 1) * 0.15;
  const earnedRP  = engine.getPrestigeRP(state);
  const nextThreshold = engine.getPrestigeThreshold({ ...state, prestigeCount: state.prestigeCount + 1 });
  openModal('prestige-overlay', () => {
    document.getElementById('modal-value')!.textContent       = formatCurrency(state.totalEarned);
    document.getElementById('modal-multiplier')!.textContent  = `+15% revenu & +${earnedRP} ⭐ Réputation`;
    document.getElementById('modal-total-multi')!.textContent = `×${newMult.toFixed(2)} — prochain objectif : ${formatCurrency(nextThreshold)}`;
  });
});

document.getElementById('btn-prestige-confirm')!.addEventListener('click', () => {
  const rpGained = engine.getPrestigeRP(state);
  state = engine.prestige(state);
  milestoneIdx = 0;
  applyReputationEffects();
  saveSystem.save(state);
  renderer.markDirty();
  closeModal('prestige-overlay');
  playPrestige();
  spawnPrestigeConfetti();
  flashScreen('rgba(124,58,237,0.12)');
  notify(`🏆 Agence vendue ! +${rpGained} ⭐ Réputation acquis.`, 'purple');
  renderReputation();
});

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
  saveSystem.save(state);
  renderer.markDirty();
  closeModal('import-url-overlay');
  history.replaceState(null, '', window.location.pathname);
  notify('📥 Sauvegarde importée avec succès !', 'green');
});
document.getElementById('btn-import-url-cancel')!.addEventListener('click', () => {
  closeModal('import-url-overlay');
  history.replaceState(null, '', window.location.pathname);
});

// ─── SAVE ACTIONS ────────────────────────────────────────────

// Export JSON
document.getElementById('btn-export')!.addEventListener('click', () => {
  saveSystem.exportToFile(state);
  notify('💾 Sauvegarde exportée !', 'green');
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
      saveSystem.save(state);
      renderer.markDirty();
      notify('📂 Sauvegarde importée !', 'green');
    } else {
      notify('❌ Fichier invalide.', 'orange');
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
    notify('🔗 Lien copié !', 'green');
    closeModal('share-overlay');
  }).catch(() => {
    shareUrlInput.select();
    document.execCommand('copy');
    notify('🔗 Lien copié !', 'green');
    closeModal('share-overlay');
  });
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
  btnClickFab.classList.add('ghost-clicking');
  if (ghostClickTimeout) clearTimeout(ghostClickTimeout);
  ghostClickTimeout = setTimeout(() => {
    btnClick.classList.remove('ghost-clicking');
    btnClickFab.classList.remove('ghost-clicking');
  }, 300);
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


// ─── INCIDENT ────────────────────────────────────────────────

let currentIncident: IncidentQuestion | null = null;

function showIncident(q: IncidentQuestion): void {
  currentIncident  = q;
  incidentActive   = true;
  incidentResolved = false;
  incidentTimer    = INCIDENT_DURATION;

  incidentUrgency.textContent  = q.urgency;
  incidentClient.textContent   = q.client;
  incidentProblem.textContent  = q.problem;
  incidentQuestion.textContent = q.question;

  incidentTimerFill.style.width = '100%';
  incidentTimerLbl.textContent  = `${INCIDENT_DURATION}s`;

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
  openModal('incident-overlay');
  notify('⚠️ Incident client — répondez vite !', 'orange');
}

function resolveIncident(chosen: number | null): void {
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
    state = { ...state, currency: state.currency + q.reward, totalEarned: state.totalEarned + q.reward };
    incidentResultIcon.textContent = '✅';
    incidentLesson.textContent     = `+${formatCurrency(q.reward)} encaissés ! ${q.lesson}`;
    notify(`✅ Incident résolu ! +${formatCurrency(q.reward)}`, 'green');
    playPurchase();
  } else if (chosen === null) {
    incidentResultIcon.textContent = '⏱️';
    incidentLesson.textContent     = `Temps écoulé. ${q.lesson}`;
    notify('⏱️ Trop lent — le client est mécontent !', 'orange');
  } else {
    incidentResultIcon.textContent = '❌';
    incidentLesson.textContent     = q.lesson;
    notify('❌ Mauvaise réponse — incident non résolu.', 'orange');
  }

  incidentResult.classList.remove('hidden');
}

document.getElementById('btn-incident-close')!.addEventListener('click', () => {
  closeModal('incident-overlay');
  incidentActive = false;
  incident.resolve();
  currentIncident = null;
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
      <div class="contracts-header">BOARD DE CONTRATS — ${available} disponible${available > 1 ? 's' : ''}, ${accepted} en cours</div>
      ${slots.map((slot, i) => renderContractSlot(slot, i)).join('')}
    </div>
  `;

  // Brancher les boutons Accepter
  slots.forEach((slot) => {
    if (!slot || slot.status !== 'available') return;
    const btn = tabContracts.querySelector(`[data-accept="${slot.id}"]`) as HTMLButtonElement | null;
    if (!btn) return;
    btn.addEventListener('click', () => {
      if (!contractSys.canAccept(slot, state)) return;
      contractSys.accept(slot);
      notify(`✅ Contrat accepté ! Livraison dans ${formatTimeLeft(slot.workTime * 1000).label}`, 'green');
      renderContracts();
    });
  });
}

function renderContractSlot(slot: ActiveContract | null, i: number): string {
  if (!slot) {
    return `
      <div class="contract-empty-slot">
        <div>⏳ Slot ${i + 1} — En attente d'un nouveau contrat</div>
        <div class="slot-timer">Prochain contrat dans 20-40 min</div>
      </div>
    `;
  }

  const rarityLabel = slot.rarity === 'epic' ? '⭐ ÉPIQUE' : slot.rarity === 'rare' ? '✦ RARE' : 'STANDARD';
  const reqs = requirementLabel(slot, state);
  const canAccept = contractSys.canAccept(slot, state);
  const progress  = contractSys.getProgress(slot);

  if (slot.status === 'available') {
    const timeLeft = formatTimeLeft(slot.expiresAt - Date.now());
    return `
      <div class="contract-card rarity-${slot.rarity}">
        <div class="contract-top">
          <div class="contract-icon">${slot.clientIcon}</div>
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
          <span class="contract-reward">+${formatCurrency(slot.reward)}</span>
          <span class="contract-timer ${timeLeft.urgent ? 'urgent' : ''}">⏱ ${timeLeft.label}</span>
          <button class="btn-contract" data-accept="${slot.id}" ${canAccept ? '' : 'disabled'}>
            ${canAccept ? 'Accepter' : 'Requis ↑'}
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
          <div class="contract-icon">${slot.clientIcon}</div>
          <div class="contract-meta">
            <div class="contract-client">${slot.client} <span class="contract-rarity-badge">${rarityLabel}</span></div>
            <div class="contract-title">${slot.title}</div>
          </div>
        </div>
        <div class="contract-progress-wrap">
          <div class="contract-progress-track">
            <div class="contract-progress-fill" style="width:${Math.round(progress * 100)}%" data-progress-id="${slot.id}"></div>
          </div>
          <span class="contract-timer">⏱ ${timeLeft.label}</span>
        </div>
        <div class="contract-bottom">
          <span class="contract-reward">+${formatCurrency(slot.reward)}</span>
          <button class="btn-contract in-progress" disabled>En cours...</button>
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
  contractSys.setReputation(
    engine.getReputationExtraSlot(state),
    engine.getReputationContractBonus(state),
  );
  tabCountReputation.textContent = String(state.reputationPoints ?? 0);
}

function renderReputation(): void {
  const rp = state.reputationPoints ?? 0;
  const nextRP = engine.getPrestigeRP(state);

  if (rp === 0 && Object.values(state.reputationPurchased ?? {}).every(v => !v)) {
    tabReputation.innerHTML = `
      <div class="rep-intro">
        <span class="rep-intro-icon">⭐</span>
        <div class="rep-intro-title">Réputation — Bonus permanents</div>
        <p class="rep-intro-text">
          Vendez votre agence (Prestige) pour gagner des points de réputation.<br>
          Dépensez-les ici pour débloquer des avantages permanents qui survivent à chaque reset.
          <br><br>
          <strong>Prochain prestige : +${nextRP} ⭐</strong>
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
          <span class="rep-perk-icon">${perk.icon}</span>
          <div class="rep-perk-meta">
            <div class="rep-perk-name">${perk.name}</div>
            <div class="rep-perk-desc">${perk.description}</div>
          </div>
        </div>
        <div class="rep-perk-footer">
          ${owned
            ? `<span class="rep-perk-cost owned-label">✓ Activé</span>
               <button class="btn-rep-buy owned" disabled>Acquis</button>`
            : `<span class="rep-perk-cost">⭐ ${perk.cost}</span>
               <button class="btn-rep-buy" data-buy-rep="${perk.id}" ${canBuy ? '' : 'disabled'}>
                 ${canBuy ? 'Acheter' : `Manque ${perk.cost - rp} ⭐`}
               </button>`
          }
        </div>
      </div>
    `;
  }).join('');

  tabReputation.innerHTML = `
    <div class="reputation-header">
      <div class="reputation-balance">
        <span class="rep-value">⭐ ${rp}</span>
        <span class="rep-label">Points de réputation</span>
      </div>
      <div class="reputation-next">
        Prochain prestige<br><strong>+${nextRP} ⭐</strong>
      </div>
    </div>
    <div class="rep-perk-grid">${perksHtml}</div>
  `;

  // Événements d'achat
  tabReputation.querySelectorAll('[data-buy-rep]').forEach(btn => {
    btn.addEventListener('click', () => {
      const perkId = (btn as HTMLElement).dataset['buyRep']!;
      const prev = engine.hasRepPerk(state, perkId);
      state = engine.buyRepPerk(state, perkId);
      if (!prev && engine.hasRepPerk(state, perkId)) {
        const perk = REPUTATION_PERKS.find(p => p.id === perkId)!;
        notify(`${perk.icon} ${perk.name} activé !`, 'purple');
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

function updateAcademyBadge(): void {
  const total     = CHALLENGES.length;
  const completed = academy.getTotalCompleted();
  tabCountAcademy.textContent = `${completed}/${total}`;
}

function renderAcademy(): void {
  updateAcademyBadge();

  // Vue défi actif
  if (academyActiveChallengeId) {
    const challenge = CHALLENGES.find(c => c.id === academyActiveChallengeId);
    if (challenge) { renderChallengeView(challenge); return; }
  }

  const totalXP   = academy.getState().totalXP;
  const maxXP     = CHALLENGES.reduce((s, c) => s + c.xpReward, 0);
  const xpPct     = maxXP > 0 ? Math.round((totalXP / maxXP) * 100) : 0;

  let html = `
    <div class="academy-intro">
      <div class="academy-intro-title">🎓 IA ACADEMY</div>
      <div class="academy-intro-sub">Deviens expert IA sans quitter le jeu</div>
    </div>
    <div class="academy-xp-bar-wrap">
      <span class="academy-xp-label">Progression</span>
      <div class="academy-xp-track">
        <div class="academy-xp-fill" style="width:${xpPct}%"></div>
      </div>
      <span class="academy-xp-value">${totalXP} XP</span>
    </div>
  `;

  for (const chapter of CHAPTERS) {
    const challenges  = getChallengesByChapter(chapter.id);
    const done        = challenges.filter(c => academy.isCompleted(c.id)).length;
    const isOpen      = done > 0 || chapter.id === 'ch1';

    html += `
      <div class="chapter-card${isOpen ? ' open' : ''}" data-chapter="${chapter.id}">
        <div class="chapter-header">
          <div class="chapter-icon" style="background:${chapter.color}20;color:${chapter.color}">${chapter.icon}</div>
          <div class="chapter-meta">
            <div class="chapter-title">Chapitre ${chapter.number} — ${chapter.title}</div>
            <div class="chapter-subtitle">${chapter.subtitle}</div>
          </div>
          <span class="chapter-progress">${done}/${challenges.length}</span>
          <span class="chapter-chevron">▾</span>
        </div>
        <div class="chapter-challenges">
          ${challenges.map(c => renderChallengeItem(c)).join('')}
        </div>
      </div>
    `;
  }

  tabAcademy.innerHTML = html;

  // Toggle chapitres
  tabAcademy.querySelectorAll('.chapter-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.chapter-card')!;
      card.classList.toggle('open');
    });
  });

  // Clic sur un défi
  tabAcademy.querySelectorAll('.challenge-item:not(.locked)').forEach(item => {
    item.addEventListener('click', () => {
      const id = (item as HTMLElement).dataset['challenge']!;
      academyActiveChallengeId = id;
      renderAcademy();
    });
  });
}

function renderChallengeItem(challenge: AcademyChallenge): string {
  const done      = academy.isCompleted(challenge.id);
  const unlocked  = academy.isUnlocked(challenge);
  const classes   = ['challenge-item', done ? 'completed' : '', !unlocked ? 'locked' : ''].filter(Boolean).join(' ');
  const icon      = done ? '✓' : !unlocked ? '🔒' : '▶';

  return `
    <div class="${classes}" data-challenge="${challenge.id}">
      <div class="challenge-status">${icon}</div>
      <div class="challenge-info">
        <div class="challenge-name">${challenge.title}</div>
        <div class="challenge-sub">${challenge.subtitle}</div>
      </div>
      <span class="challenge-reward">${done ? '✓' : `+${formatCurrency(challenge.euroReward)}`}</span>
    </div>
  `;
}

function renderChallengeView(challenge: AcademyChallenge): void {
  const alreadyDone = academy.isCompleted(challenge.id);

  tabAcademy.innerHTML = `
    <div class="gpturbo-view">
      <button class="gpturbo-back" id="academy-back">← Retour à l'Academy</button>

      <div class="gpturbo-context">
        <div class="gpturbo-context-title">📋 Ta mission</div>
        <div class="gpturbo-context-body">${challenge.context}</div>
        <div class="gpturbo-tips">
          ${challenge.tips.map(t => `<span class="gpturbo-tip">${t}</span>`).join('')}
        </div>
      </div>

      <div class="gpturbo-chat" id="gpturbo-chat">
        <div class="gpturbo-chat-header">
          <div class="gpturbo-avatar">⚡</div>
          <div>
            <div class="gpturbo-name">GPTurbo</div>
            <div class="gpturbo-status">En ligne</div>
          </div>
        </div>
        <div class="gpturbo-messages" id="gpturbo-messages">
          <div class="gpturbo-msg-system">GPTurbo est prêt. Tape ta demande ci-dessous.</div>
        </div>
        <div class="gpturbo-input-zone">
          <textarea
            class="gpturbo-input"
            id="gpturbo-input"
            placeholder="Écris ta demande à GPTurbo..."
            rows="3"
            ${alreadyDone ? 'disabled' : ''}
          ></textarea>
          <button class="btn-gpturbo-send" id="gpturbo-send" ${alreadyDone ? 'disabled' : ''}>
            Envoyer ⚡
          </button>
        </div>
      </div>

      <div id="gpturbo-score-zone"></div>
    </div>
  `;

  document.getElementById('academy-back')!.addEventListener('click', () => {
    academyActiveChallengeId = null;
    renderAcademy();
  });

  if (alreadyDone) {
    const scoreZone = document.getElementById('gpturbo-score-zone')!;
    scoreZone.innerHTML = `<div class="gpturbo-score"><div class="score-title">✅ Défi complété !</div><p style="font-size:12px;color:var(--text-secondary);margin-top:8px">${challenge.lesson}</p></div>`;
    return;
  }

  document.getElementById('gpturbo-send')!.addEventListener('click', () => {
    submitChallenge(challenge);
  });

  document.getElementById('gpturbo-input')!.addEventListener('keydown', (e) => {
    if ((e as KeyboardEvent).key === 'Enter' && (e as KeyboardEvent).ctrlKey) {
      submitChallenge(challenge);
    }
  });
}

function submitChallenge(challenge: AcademyChallenge): void {
  const input  = document.getElementById('gpturbo-input') as HTMLTextAreaElement;
  const prompt = input.value.trim();
  if (prompt.length < 3) return;

  const messages = document.getElementById('gpturbo-messages')!;
  const send     = document.getElementById('gpturbo-send') as HTMLButtonElement;
  input.disabled = true;
  send.disabled  = true;

  // Message joueur
  const userMsg = document.createElement('div');
  userMsg.className = 'gpturbo-msg-user';
  userMsg.textContent = prompt;
  messages.appendChild(userMsg);

  // Typing indicator
  const typingEl = document.createElement('div');
  typingEl.className = 'gpturbo-msg-typing';
  typingEl.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  messages.appendChild(typingEl);
  messages.scrollTop = messages.scrollHeight;

  const result = academy.scorePrompt(challenge, prompt);

  // Délai simulé "l'IA réfléchit"
  const thinkDelay = 900 + Math.random() * 800;
  setTimeout(() => {
    typingEl.remove();

    const aiMsg = document.createElement('div');
    aiMsg.className = 'gpturbo-msg-ai';
    messages.appendChild(aiMsg);
    messages.scrollTop = messages.scrollHeight;

    // Typage animé de la réponse
    typeText(aiMsg, result.response, 10, () => {
      messages.scrollTop = messages.scrollHeight;
      showScore(challenge, result);
    });
  }, thinkDelay);
}

function showScore(
  challenge: AcademyChallenge,
  result: ReturnType<AcademySystem['scorePrompt']>,
): void {
  const scoreZone = document.getElementById('gpturbo-score-zone')!;
  const pct       = result.maxScore > 0 ? Math.round((result.score / result.maxScore) * 100) : 100;
  const tierLabel = result.tier === 'excellent' ? '🌟 Excellent !' : result.tier === 'good' ? '✅ Bien joué' : result.tier === 'decent' ? '👍 Pas mal' : '💡 À améliorer';

  // Critères (pas pour "discovery")
  const criteriaHtml = challenge.type === 'discovery' ? '' : `
    <div class="score-criteria">
      ${result.met.map(c => `
        <div class="score-row met">
          <span class="score-row-icon">✓</span>
          <span>${c.label}</span>
          <span class="score-row-pts">+${c.points}pts</span>
        </div>`).join('')}
      ${result.missed.map(c => `
        <div class="score-row missed">
          <span class="score-row-icon">○</span>
          <span>${c.label}</span>
          <span class="score-row-pts">+${c.points}pts</span>
        </div>`).join('')}
    </div>
  `;

  // Leçon avec markdown simple (**bold**)
  const lessonHtml = challenge.lesson.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  // Prochain défi
  const nextChallenge = CHALLENGES.find(c => c.unlockAfter === challenge.id);

  scoreZone.innerHTML = `
    <div class="gpturbo-score">
      <div class="score-header">
        <span class="score-title">${tierLabel}</span>
        <span class="score-value ${result.tier}">${challenge.type === 'discovery' ? '🎉' : `${pct}/100`}</span>
      </div>
      ${criteriaHtml}
      <div class="score-lesson">${lessonHtml}</div>
      <div class="score-reward">
        <span class="score-reward-item score-reward-euro">+${formatCurrency(challenge.euroReward)}</span>
        <span class="score-reward-item score-reward-xp">+${challenge.xpReward} XP</span>
      </div>
      <button class="btn-next-challenge" id="btn-next-challenge">
        ${nextChallenge && !academy.isCompleted(nextChallenge.id) ? `Prochain défi : ${nextChallenge.title} →` : '← Retour à l\'Academy'}
      </button>
    </div>
  `;
  scoreZone.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Récompenses
  if (!academy.isCompleted(challenge.id)) {
    academy.complete(challenge.id, challenge.xpReward);
    state = {
      ...state,
      currency:    state.currency    + challenge.euroReward,
      totalEarned: state.totalEarned + challenge.euroReward,
    };
    saveSystem.save(state);
    renderer.markDirty();
    updateAcademyBadge();
    spawnFloatingNumber(challenge.euroReward, scoreZone);
    flashScreen('rgba(56,189,248,0.08)');
    notify(`🎓 Défi complété ! +${formatCurrency(challenge.euroReward)} +${challenge.xpReward} XP`, 'green');
  }

  document.getElementById('btn-next-challenge')!.addEventListener('click', () => {
    if (nextChallenge && !academy.isCompleted(nextChallenge.id)) {
      academyActiveChallengeId = nextChallenge.id;
    } else {
      academyActiveChallengeId = null;
    }
    renderAcademy();
  });
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
      timer.textContent = `⏱ ${tl.label}`;
      timer.className = `contract-timer${tl.urgent ? ' urgent' : ''}`;
    }
  }
}
