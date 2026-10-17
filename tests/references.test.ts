/**
 * Carnet de références : conditions lisibles, +0,5 % de revenu chacune, clés ref-* gardées pour toujours.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameEngine } from '../src/core/GameEngine.ts';
import { createInitialState, sanitizeState } from '../src/core/GameState.ts';
import { REFERENCES, REFERENCE_INCOME_BONUS } from '../src/config/references.ts';

const engine = new GameEngine();

test('33 références (32 de la conception + « 4 ventes » de la révision), identifiants valides', () => {
  assert.equal(REFERENCES.length, 33);
  const count = (type: string) => REFERENCES.filter(r => r.condition.type === type).length;
  assert.deepEqual([count('agents'), count('client'), count('prestige'), count('lessons'), count('letters')], [14, 8, 5, 3, 3]);
  assert.ok(REFERENCES.some(r => r.id === 'ref-vente-4'));
  const ids = new Set(REFERENCES.map(r => r.id));
  assert.equal(ids.size, REFERENCES.length);
  const blank = createInitialState();
  for (const r of REFERENCES) {
    assert.ok(r.id.startsWith('ref-') && r.id.length < 40, r.id); // règles Firebase
    assert.equal(blank.reputationPurchased[r.id], false, `${r.id} doit être déclarée dans createInitialState`);
    assert.ok(r.quote.length > 0);
  }
});

test('conditions : équipes, clients, ventes, leçons, lettres attrapées', () => {
  const s = createInitialState();
  assert.deepEqual(engine.getNewReferences(s, 0), []);
  s.agents['bot-workflows'] = { count: 25 };
  s.clientsUnlocked['restaurant-local'] = true;
  s.prestigeCount = 4;
  for (const id of ['acad-agent', 'acad-quoi', 'acad-public', 'acad-declencheur', 'acad-rag']) s.reputationPurchased[id] = true;
  const got = engine.getNewReferences(s, 10);
  assert.deepEqual(got.sort(), [
    'ref-acad-5', 'ref-ambre-1', 'ref-ambre-10', 'ref-bot-workflows-25', 'ref-client-restaurant-local',
    'ref-vente-1', 'ref-vente-3', 'ref-vente-4',
  ]);
  const granted = engine.grantReferences(s, got);
  assert.deepEqual(engine.getNewReferences(granted, 10), []); // déjà dans le carnet
  assert.equal(engine.getReferenceCount(granted), 8);
});

test('+0,5 % de revenu par référence', () => {
  const s = createInitialState();
  s.agents['bot-workflows'] = { count: 30 };
  const base = engine.getTotalRate(s);
  const ids = REFERENCES.slice(0, 10).map(r => r.id);
  const with10 = engine.grantReferences(s, ids);
  assert.ok(Math.abs(engine.getTotalRate(with10) / base - (1 + 10 * REFERENCE_INCOME_BONUS)) < 1e-12);
});

test('les références survivent à la vente et au rechargement', () => {
  let s = engine.grantReferences(createInitialState(), ['ref-vente-1', 'ref-ambre-1']);
  s = sanitizeState(JSON.parse(JSON.stringify(s)));
  s.totalEarned = engine.getPrestigeThreshold(s);
  const p = engine.prestige(s);
  assert.equal(p.reputationPurchased['ref-ambre-1'], true);
  assert.equal(engine.getReferenceCount(p), 2);
});
