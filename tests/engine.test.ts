/**
 * Tests du moteur (sans dépendance) : `npm test` lance `node --test` sur ce dossier.
 * Node exécute le TypeScript directement (suppression des types, Node ≥ 22.18).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameEngine } from '../src/core/GameEngine.ts';
import { createInitialState, sanitizeState, MAX_AMOUNT } from '../src/core/GameState.ts';

const engine = new GameEngine();

test('les gains sont plafonnés, jamais Infinity', () => {
  let s = { ...createInitialState(), currency: MAX_AMOUNT * 0.9, totalEarned: MAX_AMOUNT * 0.9 };
  s = engine.earn(s, MAX_AMOUNT);
  assert.equal(s.currency, MAX_AMOUNT);
  assert.equal(s.totalEarned, MAX_AMOUNT);
  s = engine.earn(s, Infinity);
  assert.equal(s.currency, MAX_AMOUNT);
  s = engine.earn(s, NaN);
  assert.equal(s.currency, MAX_AMOUNT);
});

test('tick et hors ligne restent finis avec une production démesurée', () => {
  const s = createInitialState();
  s.agents['agent-supervisor'] = { count: 1e305 };
  const { state } = engine.tick(s, 1);
  assert.ok(Number.isFinite(state.currency));
  assert.equal(state.currency, MAX_AMOUNT);
  const off = engine.applyOfflineEarnings(s, 3600);
  assert.ok(Number.isFinite(off.state.totalEarned));
});

test('sanitizeState plafonne un nombre trop grand au lieu de le remettre à 0', () => {
  const s = sanitizeState({ currency: 1e305, totalEarned: 5e300, reputationPoints: 12 });
  assert.equal(s.currency, MAX_AMOUNT);
  assert.equal(s.totalEarned, MAX_AMOUNT);
  assert.equal(s.reputationPoints, 12);
  // Valeurs invalides : retour à la valeur initiale
  const bad = sanitizeState({ currency: -5, totalEarned: 'x', prestigeCount: null });
  assert.equal(bad.currency, 0);
  assert.equal(bad.totalEarned, 0);
  assert.equal(bad.prestigeCount, 0);
});
