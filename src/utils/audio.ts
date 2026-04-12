/**
 * Sons synthétisés via Web Audio API — zéro fichier audio externe.
 * Le contexte est créé au premier appel (après geste utilisateur).
 */

let ctx: AudioContext | null = null;

function ac(): AudioContext | null {
  try {
    if (!ctx) ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  } catch { return null; }
}

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
  gain.connect(c.destination);
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, startAt);
  gain.gain.linearRampToValueAtTime(volume, startAt + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
  osc.start(startAt);
  osc.stop(startAt + duration);
}

/** Clic de tâche : tick bref et satisfaisant */
export function playClick(): void {
  const c = ac();
  if (!c) return;
  note(c, 900, c.currentTime, 0.06, 0.08, 'square');
  note(c, 600, c.currentTime + 0.02, 0.05, 0.05);
}

/** Achat d'agent : accord majeur ascendant */
export function playPurchase(): void {
  const c = ac();
  if (!c) return;
  [523.25, 659.25, 783.99].forEach((f, i) => {
    note(c, f, c.currentTime + i * 0.09, 0.28, 0.1);
  });
}

/** Déverrouillage client : fanfare rapide */
export function playClientUnlock(): void {
  const c = ac();
  if (!c) return;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    note(c, f, c.currentTime + i * 0.07, 0.35, 0.12);
  });
}

/** Milestone atteint : gong grave + éclat */
export function playMilestone(): void {
  const c = ac();
  if (!c) return;
  // Gong
  note(c, 180, c.currentTime, 1.8, 0.18);
  note(c, 360, c.currentTime + 0.02, 0.6, 0.08);
  // Éclat aigu
  [1046.5, 1318.5, 1567.98].forEach((f, i) => {
    note(c, f, c.currentTime + 0.05 + i * 0.06, 0.25, 0.07);
  });
}

/** Prestige : accord dramatique descendant */
export function playPrestige(): void {
  const c = ac();
  if (!c) return;
  [1046.5, 880, 659.25, 523.25, 392].forEach((f, i) => {
    note(c, f, c.currentTime + i * 0.12, 0.5, 0.13);
  });
}
