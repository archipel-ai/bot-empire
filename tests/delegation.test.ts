/**
 * Délégation : achat automatique (niveaux I et II), budget de 10 % par passe, interrupteurs.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameEngine } from '../src/core/GameEngine.ts';
import { createInitialState, type GameState } from '../src/core/GameState.ts';
import { runDelegation, getDelegableAgentIds, defaultDelegationSettings } from '../src/systems/DelegationSystem.ts';

const engine = new GameEngine();

function state(currency: number, lessons: string[] = [], prestigeCount = 1): GameState {
  const s = createInitialState();
  s.currency = currency;
  s.totalEarned = currency;
  s.prestigeCount = prestigeCount;
  for (const id of lessons) s.reputationPurchased[id] = true;
  return s;
}

test("débloquée par l'arbre : rien sans leçon, niveau I puis II", () => {
  const s = state(1e6);
  assert.equal(engine.getDelegationLevel(s), 0);
  const r = runDelegation(engine, s, engine.getDelegationLevel(s), defaultDelegationSettings());
  assert.equal(r.state, s);
  assert.deepEqual(r.agents, []);
  assert.deepEqual(getDelegableAgentIds(1), ['bot-workflows', 'agent-copy', 'agent-analytics', 'agent-audit']);
  assert.equal(getDelegableAgentIds(2).length, 9);
});

test('niveau I : seulement les 4 premiers métiers, jamais plus de 10 % de la trésorerie par passe', () => {
  const s = state(1e7, ['acad-humain']);
  const r = runDelegation(engine, s, 1, defaultDelegationSettings());
  assert.ok(r.agents.length > 0);
  for (const id of r.agents) assert.ok(getDelegableAgentIds(1).includes(id), id);
  assert.ok(s.currency - r.state.currency <= s.currency * 0.1 + 1e-6);
  assert.ok(r.state.currency >= s.currency * 0.9 - 1e-6);
  assert.deepEqual(r.upgrades, []);
  // L'agent le moins cher d'abord : le 1er achat est un Bot Workflows (10 €)
  assert.equal(r.agents[0], 'bot-workflows');
});

test('petite trésorerie : rien si même le moins cher dépasse 10 %', () => {
  const s = state(90, ['acad-humain']); // 10 % = 9 € < 10 €
  assert.deepEqual(runDelegation(engine, s, 1, defaultDelegationSettings()).agents, []);
  const r = runDelegation(engine, state(100, ['acad-humain']), 1, defaultDelegationSettings());
  assert.deepEqual(r.agents, ['bot-workflows']);
});

test('niveau II : tous les métiers disponibles et les améliorations, dans le même budget', () => {
  const s = state(1e9, ['acad-humain', 'acad-orchestrer'], 2);
  // Les 4 premiers métiers sont déjà chers : l'Agent Légal (20 k€) devient le moins cher
  for (const [id, n] of [['bot-workflows', 80], ['agent-copy', 70], ['agent-analytics', 60], ['agent-audit', 50]] as const) {
    s.agents[id] = { count: n };
  }
  const r = runDelegation(engine, s, 2, defaultDelegationSettings());
  assert.ok(r.agents.some(id => !getDelegableAgentIds(1).includes(id)), 'un métier au-delà des 4 premiers');
  assert.ok(r.upgrades.includes('api-rate-x2'));
  assert.ok(!r.agents.includes('agent-voice')); // nouveau marché réservé à 3 ventes
  assert.ok(s.currency - r.state.currency <= s.currency * 0.1 + 1e-3);
});

test('interrupteurs : général, par métier, améliorations', () => {
  const s = state(1e9, ['acad-humain', 'acad-orchestrer'], 2);
  s.agents['bot-workflows'] = { count: 6 };
  assert.deepEqual(runDelegation(engine, s, 2, { ...defaultDelegationSettings(), enabled: false }).agents, []);
  const noWf = runDelegation(engine, s, 2, { enabled: true, agents: { 'bot-workflows': false }, upgrades: false });
  assert.ok(noWf.agents.length > 0);
  assert.ok(!noWf.agents.includes('bot-workflows'));
  assert.deepEqual(noWf.upgrades, []);
});
