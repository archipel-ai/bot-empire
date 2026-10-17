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
import { formatCurrency, formatDuration } from './utils/format.ts';
import { playClick, playPurchase, playClientUnlock, playMilestone, playPrestige, isSoundOn, setSoundOn } from './utils/audio.ts';
import { EchoSystem } from './systems/EchoSystem.ts';
import { IncidentSystem, type IncidentQuestion } from './systems/IncidentSystem.ts';
import { Hints } from './ui/Hints.ts';
import { Drawer } from './ui/Drawer.ts';
import { CLIENTS } from './config/clients.ts';
import { UPGRADES } from './config/upgrades.ts';
import { CloudSave } from './core/CloudSave.ts';
import { FIREBASE_CONFIG, CLOUD_SAVE_ENABLED } from './config/firebase.ts';
import { ContractSystem, type ActiveContract } from './systems/ContractSystem.ts';
import { MarketSystem } from './systems/MarketSystem.ts';
import { AcademySystem } from './systems/AcademySystem.ts';
import { CHAPTERS, CHALLENGES, getChallengesByChapter, type AcademyChallenge } from './config/academy.ts';
import { REPUTATION_PERKS, NOTORIETE_INCOME_PER_LEVEL } from './config/reputationPerks.ts';
import { spawnFloatingNumber, spawnInkLetters, flashScreen, typeText } from './utils/gamefeel.ts';
import { formatRate, formatMultiplier } from './utils/format.ts';
import { AGENTS, TEAM_TIERS, getTeamTier, getTeamTierMultiplier } from './config/agents.ts';
import { LANG, setLang, t, translateStaticDom } from './i18n/i18n.ts';
import { applyContentLanguage } from './i18n/content.ts';
import { icon, hydrateIcons, PERK_ICONS } from './ui/icons.ts';

// ─── LANGUE ──────────────────────────────────────────────────
// Avant toute création de système : les configs sont traduites en place.
applyContentLanguage();
translateStaticDom();
hydrateIcons();

// L'Academy note les prompts avec des expressions régulières en français : masquée en anglais
if (LANG === 'en') {
  document.querySelector('.tab[data-tab="academy"]')?.classList.add('hidden');
  document.getElementById('tab-academy')?.classList.add('hidden');
}

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

// Marché IA Vivant — éléments bannière
const marketBanner     = document.getElementById('market-banner')!;
const marketBannerIcon = document.getElementById('market-banner-icon')!;
const marketBannerName = document.getElementById('market-banner-name')!;
const marketBannerDesc = document.getElementById('market-banner-desc')!;
const marketBannerEff  = document.getElementById('market-banner-effect')!;
const marketBannerTime = document.getElementById('market-banner-timer')!;

function marketEffectLabel(type: 'income' | 'click', mult: number): string {
  if (type === 'click') return t('market.click', { mult });
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
let academyActiveChallengeId: string | null = null;

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
    // Nouveau contrat disponible
    notify(t('contract.new', { title: contract.title }), 'orange');
    tabCountContracts.classList.add('has-new');
    renderContracts();
  },
  (contract) => {
    // Contrat complété
    state = engine.earn(state, contract.reward);
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
const offlineSeconds = saveSystem.getOfflineSeconds(state);
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
  hints.reposition();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

// ─── EVENTS ──────────────────────────────────────────────────

// Bouton de travail
function handleClick(e: MouseEvent | PointerEvent): void {
  state = engine.click(state, market.getClickMultiplier());
  echo.recordClick();
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
  notify(t('echo.activated'), 'orange');
});

// Délégation — sélecteur ×1 / ×10 / max puis achat d'agents
document.getElementById('tab-agents')!.addEventListener('click', (e) => {
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
    // Palier d'équipe franchi (25, 50, 100, 200)
    const tier = getTeamTier(now);
    if (tier > getTeamTier(prev)) {
      const def = AGENTS.find(a => a.id === agentId);
      notifyMilestone(t('tier.reached', {
        name: def?.name ?? agentId, n: TEAM_TIERS[tier - 1]!, mult: formatMultiplier(getTeamTierMultiplier(now)),
      }));
      playMilestone();
    }
    hints.dismiss('first-agent');
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
    document.getElementById('modal-multiplier')!.textContent  = t('prestige.gain', { rp: earnedRP });
    document.getElementById('modal-total-multi')!.textContent = t('prestige.next', { mult: newMult.toFixed(2), amount: formatCurrency(nextThreshold) });
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
    echoSub.textContent = t('echo.active', { n: es.replayRemaining });
    echoBarWrap.style.display = '';
    echoBarFill.style.width   = `${(es.replayRemaining / 60) * 100}%`;
    echoTimerLbl.textContent  = `${es.replayRemaining}s`;
  } else if (es.isOnCooldown) {
    const m = Math.floor(es.cooldownRemaining / 60);
    const s = es.cooldownRemaining % 60;
    echoSub.textContent = t('echo.cooldown', { time: `${m}:${String(s).padStart(2,'0')}` });
    echoBarWrap.style.display = '';
    echoBarFill.style.width   = `${((120 - es.cooldownRemaining) / 120) * 100}%`;
    echoTimerLbl.textContent  = `${m}:${String(s).padStart(2,'0')}`;
    echoBarFill.classList.add('cooldown');
  } else {
    echoBarFill.classList.remove('cooldown');
    echoBarWrap.style.display    = 'none';
    if (es.clicksRecorded < 3) {
      echoSub.textContent = t('echo.needClicks', { n: 3 - es.clicksRecorded });
    } else {
      echoSub.textContent = t('echo.ready', { n: es.clicksRecorded });
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


// ─── INCIDENT ────────────────────────────────────────────────

let currentIncident: IncidentQuestion | null = null;

/** Affiche la notification d'incident : cliquable pour ouvrir le quiz, ou ignorable. */
function offerIncident(q: IncidentQuestion): void {
  currentIncident   = q;
  incidentOfferLeft = INCIDENT_OFFER_DURATION;

  const el = document.createElement('div');
  el.className = 'notif orange incident-notice';
  el.innerHTML = `
    <button class="incident-notice-open" type="button"></button>
    <button class="incident-notice-close" type="button">×</button>
  `;
  el.querySelector('.incident-notice-close')!.setAttribute('aria-label', t('incident.ignore'));
  el.querySelector('.incident-notice-open')!.textContent =
    t('incident.notice', { client: q.client, reward: formatCurrency(q.reward) });
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
    state = engine.earn(state, q.reward);
    incidentResultIcon.innerHTML = icon('check');
    incidentResultIcon.className = 'incident-result-icon ok';
    incidentLesson.textContent     = t('incident.won', { reward: formatCurrency(q.reward), lesson: q.lesson });
    notify(t('incident.solved', { reward: formatCurrency(q.reward) }), 'green');
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
      if (!contractSys.canAccept(slot, state, engine.getTotalRate(state))) return;
      contractSys.accept(slot);
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
          <span class="contract-reward">+${formatCurrency(slot.reward)}</span>
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
      <div class="academy-intro-title">${icon('cap')}IA ACADEMY</div>
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
          <div class="chapter-icon">${icon('book')}</div>
          <div class="chapter-meta">
            <div class="chapter-title">Chapitre ${chapter.number} — ${chapter.title}</div>
            <div class="chapter-subtitle">${chapter.subtitle}</div>
          </div>
          <span class="chapter-progress">${done}/${challenges.length}</span>
          <span class="chapter-chevron">${icon('chevron')}</span>
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
  const statusIcon = icon(done ? 'check' : !unlocked ? 'lock' : 'play');

  return `
    <div class="${classes}" data-challenge="${challenge.id}">
      <div class="challenge-status">${statusIcon}</div>
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
      <button class="gpturbo-back" id="academy-back" type="button">${icon('back')}Retour à l'Academy</button>

      <div class="gpturbo-context">
        <div class="gpturbo-context-title">${icon('document')}Ta mission</div>
        <div class="gpturbo-context-body">${challenge.context}</div>
        <div class="gpturbo-tips">
          ${challenge.tips.map(t => `<span class="gpturbo-tip">${t}</span>`).join('')}
        </div>
      </div>

      <div class="gpturbo-chat" id="gpturbo-chat">
        <div class="gpturbo-chat-header">
          <div class="gpturbo-avatar">${icon('bolt')}</div>
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
            Envoyer ${icon('send')}
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
    scoreZone.innerHTML = `<div class="gpturbo-score"><div class="score-title">${icon('check')}Défi complété !</div><p class="score-lesson">${challenge.lesson}</p></div>`;
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
  const tierLabel = result.tier === 'excellent' ? 'Excellent !' : result.tier === 'good' ? 'Bien joué' : result.tier === 'decent' ? 'Pas mal' : 'À améliorer';

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
        <span class="score-value ${result.tier}">${challenge.type === 'discovery' ? icon('star') : `${pct}/100`}</span>
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
    state = engine.earn(state, challenge.euroReward);
    saveSystem.save(state);
    renderer.markDirty();
    updateAcademyBadge();
    spawnFloatingNumber(challenge.euroReward, scoreZone);
    flashScreen('outremer', 8);
    notify(`Défi complété ! +${formatCurrency(challenge.euroReward)} +${challenge.xpReward} XP`, 'green');
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
      const text = timer.querySelector('.contract-timer-text');
      if (text) text.textContent = tl.label;
      timer.className = `contract-timer${tl.urgent ? ' urgent' : ''}`;
    }
  }
}
