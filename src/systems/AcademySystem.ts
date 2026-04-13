import { AcademyChallenge } from '../config/academy.ts';

export interface AcademyState {
  completedIds: string[];
  totalXP:      number;
}

const SAVE_KEY = 'bot-empire-academy';

export class AcademySystem {
  private state: AcademyState = { completedIds: [], totalXP: 0 };

  constructor() { this.load(); }

  // ─── PROGRESSION ──────────────────────────────────────────

  isCompleted(challengeId: string): boolean {
    return this.state.completedIds.includes(challengeId);
  }

  isUnlocked(challenge: AcademyChallenge): boolean {
    if (!challenge.unlockAfter) return true;
    return this.isCompleted(challenge.unlockAfter);
  }

  complete(challengeId: string, xp: number): void {
    if (this.isCompleted(challengeId)) return;
    this.state.completedIds.push(challengeId);
    this.state.totalXP += xp;
    this.save();
  }

  getState(): AcademyState { return { ...this.state }; }

  getTotalCompleted(): number { return this.state.completedIds.length; }

  // ─── SCORING ──────────────────────────────────────────────

  scorePrompt(challenge: AcademyChallenge, prompt: string): {
    score:     number;
    maxScore:  number;
    met:       Array<{ label: string; points: number }>;
    missed:    Array<{ label: string; points: number }>;
    tier:      'poor' | 'decent' | 'good' | 'excellent';
    response:  string;
  } {
    // Discovery : toujours "excellent" si 3+ caractères
    if (challenge.type === 'discovery') {
      const valid = prompt.trim().length >= 3;
      const responses = [challenge.responses.decent, challenge.responses.good, challenge.responses.excellent];
      const response = valid ? responses[Math.floor(Math.random() * responses.length)]! : challenge.responses.poor;
      return { score: valid ? 100 : 0, maxScore: 100, met: [], missed: [], tier: valid ? 'excellent' : 'poor', response };
    }

    let score   = 0;
    const met:    Array<{ label: string; points: number }> = [];
    const missed: Array<{ label: string; points: number }> = [];
    const maxScore = challenge.criteria.reduce((s, c) => s + c.points, 0);

    for (const criterion of challenge.criteria) {
      if (criterion.pattern.test(prompt)) {
        score += criterion.points;
        met.push({ label: criterion.label, points: criterion.points });
      } else {
        missed.push({ label: criterion.label, points: criterion.points });
      }
    }

    const pct  = maxScore > 0 ? score / maxScore : 0;
    const tier: 'poor' | 'decent' | 'good' | 'excellent' =
      pct >= 0.81 ? 'excellent' :
      pct >= 0.61 ? 'good'      :
      pct >= 0.36 ? 'decent'    : 'poor';

    return { score, maxScore, met, missed, tier, response: challenge.responses[tier] };
  }

  // ─── PERSISTANCE ──────────────────────────────────────────

  private save(): void {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(this.state)); }
    catch { /* silencieux */ }
  }

  private load(): void {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) this.state = JSON.parse(raw);
    } catch { /* silencieux */ }
  }
}
