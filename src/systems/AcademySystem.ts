/**
 * AcademySystem — ce que l'arbre de recherche garde hors de la sauvegarde.
 * Les leçons acquises vivent dans `reputationPurchased` (clés `acad-*`, voir GameEngine) ;
 * ici : la lecture de l'ancienne Academy 1.1 (pour le report gratuit), l'attente de 20 s après
 * une mauvaise réponse et l'ordre mélangé des réponses. Rien de tout ça n'a besoin de survivre.
 */

const LEGACY_KEY      = 'bot-empire-academy';   // Academy 1.1 : { completedIds, totalXP }
const MIGRATED_KEY    = 'bot-empire-academy-migrated';
export const RETRY_DELAY_MS = 20_000;           // nouvel essai après une mauvaise réponse

export class AcademySystem {
  private retryAt = new Map<string, number>();
  private orders  = new Map<string, number[]>();

  /** Identifiants des défis réussis dans l'Academy 1.1 (vide si aucun). */
  getLegacyCompleted(): string[] {
    try {
      const raw = localStorage.getItem(LEGACY_KEY);
      if (!raw) return [];
      const ids = (JSON.parse(raw) as { completedIds?: unknown }).completedIds;
      return Array.isArray(ids) ? ids.filter((x): x is string => typeof x === 'string') : [];
    } catch { return []; }
  }

  /** Le mot « vos leçons ont été reportées » a-t-il déjà été montré ? */
  wasMigrationAnnounced(): boolean {
    try { return localStorage.getItem(MIGRATED_KEY) === '1'; } catch { return true; }
  }

  markMigrationAnnounced(): void {
    try { localStorage.setItem(MIGRATED_KEY, '1'); } catch { /* silencieux */ }
  }

  /** Mauvaise réponse : pas de nouvel essai avant 20 s, réponses remélangées. */
  recordWrong(lessonId: string): void {
    this.retryAt.set(lessonId, Date.now() + RETRY_DELAY_MS);
    this.orders.delete(lessonId);
  }

  /** Secondes avant de pouvoir répondre à nouveau (0 : maintenant). */
  getRetrySeconds(lessonId: string): number {
    const at = this.retryAt.get(lessonId) ?? 0;
    return Math.max(0, Math.ceil((at - Date.now()) / 1000));
  }

  /** Ordre d'affichage des 3 réponses (indices d'origine), stable tant que la fiche est ouverte. */
  getAnswerOrder(lessonId: string): number[] {
    let order = this.orders.get(lessonId);
    if (!order) {
      order = [0, 1, 2];
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j]!, order[i]!];
      }
      this.orders.set(lessonId, order);
    }
    return order;
  }
}
