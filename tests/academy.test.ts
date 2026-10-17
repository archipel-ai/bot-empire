/**
 * Academy 1.2 : arbre de 24 leçons (prérequis, conditions, coûts, bonus permanents, sauvegarde).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameEngine } from '../src/core/GameEngine.ts';
import { createInitialState, sanitizeState, type GameState } from '../src/core/GameState.ts';
import { ACADEMY_LESSONS, ACADEMY_BRANCHES, getAcademyGrade } from '../src/config/academy.ts';

const engine = new GameEngine();

/** État où les leçons `ids` sont acquises (sans les payer). */
function withLessons(ids: string[], base: GameState = createInitialState()): GameState {
  const s = { ...base, reputationPurchased: { ...base.reputationPurchased } };
  for (const id of ids) s.reputationPurchased[id] = true;
  return s;
}

test("24 leçons : une racine, 5 branches, identifiants valides, prérequis déjà définis plus haut", () => {
  assert.equal(ACADEMY_LESSONS.length, 24);
  assert.equal(ACADEMY_LESSONS.filter(l => l.branch === 'root').length, 1);
  for (const b of ACADEMY_BRANCHES) assert.ok(ACADEMY_LESSONS.filter(l => l.branch === b).length >= 4, b);
  const seen = new Set<string>();
  for (const l of ACADEMY_LESSONS) {
    assert.ok(l.id.startsWith('acad-') && l.id.length < 40, l.id); // règles Firebase : $id.length < 40
    assert.ok(!seen.has(l.id), `doublon ${l.id}`);
    for (const r of l.requires) assert.ok(seen.has(r), `${l.id} dépend de ${r}, défini plus bas ou absent`);
    assert.equal(l.answers.length, 3);
    assert.ok(l.cost > 0);
    seen.add(l.id);
  }
});

test('prérequis et conditions de jeu : la racine attend un Bot Workflows, la suite attend la racine', () => {
  const s = createInitialState();
  s.currency = 1e6;
  assert.equal(engine.canStudyLesson(s, 'acad-agent'), false);
  s.agents['bot-workflows'] = { count: 1 };
  assert.equal(engine.canStudyLesson(s, 'acad-agent'), true);
  assert.equal(engine.canStudyLesson(s, 'acad-quoi'), false); // racine pas encore acquise
  const learned = engine.learnLesson(s, 'acad-agent');
  assert.equal(engine.canStudyLesson(learned, 'acad-quoi'), true);
  assert.equal(engine.canStudyLesson(learned, 'acad-declencheur'), false); // il faut 10 Bot Workflows
  learned.agents['bot-workflows'] = { count: 10 };
  assert.equal(engine.canStudyLesson(learned, 'acad-declencheur'), true);
  // Condition de vente : « humain » attend 1 vente même avec ses prérequis
  const p0 = withLessons(['acad-agent', 'acad-declencheur', 'acad-backoff', 'acad-arret']);
  assert.equal(engine.canStudyLesson(p0, 'acad-humain'), false);
  assert.equal(engine.canStudyLesson({ ...p0, prestigeCount: 1 }, 'acad-humain'), true);
  // Recalage de la révision : evals à 4 ventes et 1 Md€, roi à 5 ventes
  const evals = ACADEMY_LESSONS.find(l => l.id === 'acad-evals')!;
  assert.deepEqual(evals.conditions, [{ type: 'prestige', count: 4 }]);
  assert.equal(evals.cost, 1e9);
  assert.deepEqual(ACADEMY_LESSONS.find(l => l.id === 'acad-roi')!.conditions, [{ type: 'prestige', count: 5 }]);
});

test("coût : la leçon se paie en euros de la partie, une seule fois, et pas sans l'argent", () => {
  const s = createInitialState();
  s.agents['bot-workflows'] = { count: 1 };
  s.currency = 49;
  assert.equal(engine.learnLesson(s, 'acad-agent'), s); // 50 € requis
  s.currency = 80;
  const after = engine.learnLesson(s, 'acad-agent');
  assert.equal(after.currency, 30);
  assert.equal(after.totalEarned, s.totalEarned); // un achat ne touche pas aux gains
  assert.equal(after.reputationPurchased['acad-agent'], true);
  assert.equal(engine.learnLesson(after, 'acad-agent'), after);
  assert.equal(engine.getLearnedLessonCount(after), 1);
});

test('bonus de production : clic, agents, clients, toute production', () => {
  const s = createInitialState();
  s.agents['bot-workflows'] = { count: 10 };
  s.agents['agent-copy'] = { count: 5 };
  s.clientsUnlocked['restaurant-local'] = true;
  const click = engine.getClickValue(s);
  assert.ok(Math.abs(engine.getClickValue(withLessons(['acad-quoi'], s)) / click - 2) < 1e-9);
  assert.equal(engine.getAgentMultiplier(withLessons(['acad-declencheur'], s), 'bot-workflows'), 1.25);
  assert.equal(engine.getAgentMultiplier(withLessons(['acad-declencheur'], s), 'agent-copy'), 1);
  assert.equal(engine.getAgentMultiplier(withLessons(['acad-sources'], s), 'agent-rag'), 2);
  assert.ok(Math.abs(engine.getClientBonus(withLessons(['acad-rag'], s)) / engine.getClientBonus(s) - 1.25) < 1e-9);
  assert.ok(Math.abs(engine.getTotalRate(withLessons(['acad-roi'], s)) / engine.getTotalRate(s) - 1.25) < 1e-9);
  // Copilote : +1 % par leçon de la branche Prompt (role, fewshot)
  assert.ok(Math.abs(engine.getClickShare(withLessons(['acad-role', 'acad-fewshot'], s)) - 0.02) < 1e-12);
});

test('bonus de règles : coût des agents, hors ligne, Écho, contrats, marché, lettres, RP', () => {
  const s = createInitialState();
  // −10 % de l'Academy après −20 % de la réputation : −28 %
  const rep = withLessons(['rep-agent-discount', 'acad-cache'], s);
  assert.ok(Math.abs(engine.getAgentDiscount(rep) - 0.28) < 1e-12);
  assert.ok(Math.abs(engine.getAgentCost(rep, 'bot-workflows') - 10 * 0.72) < 1e-9);
  assert.ok(Math.abs(engine.getOfflineRate(withLessons(['acad-backoff'], s)) - 0.6) < 1e-12);
  assert.ok(Math.abs(engine.getOfflineRate(withLessons(['acad-backoff', 'rep-offline-rate'], s)) - 0.85) < 1e-12);
  assert.equal(engine.getMaxOfflineHours(s), 8);
  assert.equal(engine.getMaxOfflineHours(withLessons(['acad-arret'], s)), 12);
  assert.equal(engine.getEchoReplaySeconds(s), 60);
  assert.equal(engine.getEchoReplaySeconds(withLessons(['acad-public'], s)), 90);
  assert.equal(engine.getContractWorkTimeMult(withLessons(['acad-json'], s)), 0.75);
  assert.equal(engine.getContractRewardMult(withLessons(['acad-hallu', 'rep-contract-bonus'], s)), 1.25 * 1.25);
  assert.equal(engine.getExtraContractSlots(withLessons(['acad-evals', 'rep-contract-slot'], s)), 2);
  assert.equal(engine.getEffectiveMarketMult(s, 0.6), 0.6);
  assert.ok(Math.abs(engine.getEffectiveMarketMult(withLessons(['acad-injection'], s), 0.6) - 0.8) < 1e-12);
  assert.equal(engine.getEffectiveMarketMult(withLessons(['acad-injection'], s), 2), 2); // les hausses restent entières
  assert.equal(engine.getLeadIntervalMult(withLessons(['acad-streaming'], s)), 0.8);
  assert.equal(engine.hasPaybackDisplay(withLessons(['acad-token'], s)), true);
  assert.equal(engine.getDelegationLevel(s), 0);
  assert.equal(engine.getDelegationLevel(withLessons(['acad-humain'], s)), 1);
  assert.equal(engine.getDelegationLevel(withLessons(['acad-humain', 'acad-orchestrer'], s)), 2);
  // RP × 1,25 puis arrondi à l'entier inférieur : 3 RP au seuil → 3
  const sale = { ...s, totalEarned: 10_000_000 * 8 }; // ×8 le seuil → 6 RP
  assert.equal(engine.getPrestigeRP(sale), 6);
  assert.equal(engine.getPrestigeRP(withLessons(['acad-modele'], sale)), 7);
});

test('les leçons survivent à la vente et au rechargement (sanitizeState)', () => {
  let s = withLessons(['acad-agent', 'acad-quoi', 'acad-rag']);
  s = sanitizeState(JSON.parse(JSON.stringify(s)));
  assert.equal(engine.getLearnedLessonCount(s), 3);
  s.totalEarned = engine.getPrestigeThreshold(s);
  const p = engine.prestige(s);
  assert.equal(p.reputationPurchased['acad-quoi'], true);
  assert.equal(engine.getLearnedLessonCount(p), 3);
  // Chaque leçon est déclarée dans createInitialState (sinon sanitizeState l'effacerait)
  const blank = createInitialState();
  for (const l of ACADEMY_LESSONS) assert.equal(blank.reputationPurchased[l.id], false, l.id);
});

test("report gratuit de l'ancienne Academy (clé bot-empire-academy), sans doublon", () => {
  const s = createInitialState();
  const { state: m, migrated } = engine.migrateLegacyAcademy(s, ['discovery-1', 'gpturbo-1', 'gpturbo-2', 'gpturbo-3', 'inconnu']);
  assert.deepEqual(migrated, ['acad-agent', 'acad-quoi', 'acad-public', 'acad-role']);
  assert.equal(m.currency, 0); // gratuit
  assert.equal(engine.getLearnedLessonCount(m), 4);
  const again = engine.migrateLegacyAcademy(m, ['discovery-1', 'gpturbo-1']);
  assert.deepEqual(again.migrated, []);
  assert.equal(again.state, m);
});

test('grades : Stagiaire 0, Praticien 4, Expert 8, Architecte 14, Mentor 24', () => {
  assert.deepEqual([0, 3, 4, 8, 13, 14, 23, 24].map(n => getAcademyGrade(n).key), [
    'acad.grade.intern', 'acad.grade.intern', 'acad.grade.practitioner', 'acad.grade.expert',
    'acad.grade.expert', 'acad.grade.architect', 'acad.grade.architect', 'acad.grade.mentor',
  ]);
});
