/**
 * Sons synthétisés via Web Audio API — zéro fichier audio externe.
 * Rien ne joue avant la première interaction du joueur (clic, toucher ou touche) :
 * le contexte audio n'est créé qu'après ce geste. Le choix son on/off est mémorisé
 * sur l'appareil, hors sauvegarde ; le volume par défaut est bas.
 */

const SOUND_KEY     = 'bot-empire-sound';
const MASTER_VOLUME = 0.32;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noise: AudioBuffer | null = null;
let unlocked = false;
let enabled = loadEnabled();

function loadEnabled(): boolean {
  try { return localStorage.getItem(SOUND_KEY) !== 'off'; }
  catch { return true; }
}

// Le premier geste du joueur autorise le son (capture : avant les gestionnaires du jeu)
function unlock(): void {
  unlocked = true;
  window.removeEventListener('pointerdown', unlock, true);
  window.removeEventListener('keydown', unlock, true);
}
window.addEventListener('pointerdown', unlock, true);
window.addEventListener('keydown', unlock, true);

/** Le son est-il activé par le joueur ? */
export function isSoundOn(): boolean { return enabled; }

/** Active ou coupe le son, et mémorise le choix. */
export function setSoundOn(on: boolean): void {
  enabled = on;
  try { localStorage.setItem(SOUND_KEY, on ? 'on' : 'off'); } catch { /* silencieux */ }
  if (master && ctx) master.gain.setTargetAtTime(on ? MASTER_VOLUME : 0, ctx.currentTime, 0.02);
}

function ac(): AudioContext | null {
  if (!enabled || !unlocked) return null;
  try {
    if (!ctx) {
      ctx = new AudioContext();
      master = ctx.createGain();
      master.gain.value = MASTER_VOLUME;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch { return null; }
}

function out(): AudioNode { return master!; }

function note(
  c: AudioContext,
  freq: number,
  startAt: number,
  duration: number,
  volume = 0.12,
  type: OscillatorType = 'sine',
): void {
  const osc  = c.createOscillator();
  const gain = c.createGain();
  osc.connect(gain);
  gain.connect(out());
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(volume, startAt + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.02);
}

function noiseBuffer(c: AudioContext): AudioBuffer {
  if (noise) return noise;
  const length = Math.floor(c.sampleRate * 0.06);
  noise = c.createBuffer(1, length, c.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return noise;
}

/** Clic de tâche : cliquetis de machine à écrire, hauteur légèrement aléatoire. */
export function playClick(): void {
  const c = ac();
  if (!c) return;
  const now = c.currentTime;
  const src = c.createBufferSource();
  src.buffer = noiseBuffer(c);
  const band = c.createBiquadFilter();
  band.type = 'bandpass';
  band.frequency.value = 2200 + Math.random() * 1400;
  band.Q.value = 3.5;
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.5, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
  src.connect(band);
  band.connect(gain);
  gain.connect(out());
  src.start(now);
  src.stop(now + 0.05);
  // Le choc de la touche, plus grave
  note(c, 150 + Math.random() * 40, now, 0.04, 0.12, 'triangle');
}

/** Achat : petit pincement de deux notes. */
export function playPurchase(): void {
  const c = ac();
  if (!c) return;
  note(c, 659.25, c.currentTime, 0.18, 0.08, 'triangle');
  note(c, 987.77, c.currentTime + 0.07, 0.22, 0.07, 'triangle');
}

/** Client signé : une cloche douce (partiels inharmoniques qui s'éteignent lentement). */
export function playClientUnlock(): void {
  const c = ac();
  if (!c) return;
  const f0 = 784;
  const now = c.currentTime;
  [[1, 0.16, 2.2], [2.76, 0.06, 1.4], [5.4, 0.035, 0.9], [8.93, 0.02, 0.6]].forEach(([ratio, vol, dur]) => {
    note(c, f0 * ratio!, now, dur!, vol!, 'sine');
  });
}

/** Lettre ambre attrapée : la cloche douce, plus aiguë. */
export function playLead(): void {
  const c = ac();
  if (!c) return;
  const f0 = 1174.66;
  const now = c.currentTime;
  [[1, 0.13, 1.4], [2.76, 0.05, 0.9], [5.4, 0.025, 0.6]].forEach(([ratio, vol, dur]) => {
    note(c, f0 * ratio!, now, dur!, vol!, 'sine');
  });
}

/** Étape franchie, jalon, événement de marché : un accord bref, légèrement égrené. */
export function playMilestone(): void {
  const c = ac();
  if (!c) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    note(c, f, c.currentTime + i * 0.018, 0.7, 0.06, 'triangle');
  });
}

/** Prestige : arpège descendant, doux. */
export function playPrestige(): void {
  const c = ac();
  if (!c) return;
  [1046.5, 880, 659.25, 523.25, 392].forEach((f, i) => {
    note(c, f, c.currentTime + i * 0.13, 0.6, 0.08, 'sine');
  });
}
