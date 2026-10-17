/**
 * Tests du moteur (sans dépendance) : `npm test` lance `node --test` sur ce dossier.
 * Node exécute le TypeScript directement (suppression des types, Node ≥ 22.18).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameEngine } from '../src/core/GameEngine.ts';
import { createInitialState, sanitizeState, MAX_AMOUNT } from '../src/core/GameState.ts';
import { AGENTS } from '../src/config/agents.ts';

const AGENTS_BY_ID = Object.fromEntries(AGENTS.map(a => [a.id, a]));

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

test("paliers d'équipe : ×1,5 à 25, 50, 100 et 200 agents", async () => {
  const { getTeamTier, getTeamTierMultiplier, getNextTeamTier } = await import('../src/config/agents.ts');
  assert.equal(getTeamTier(24), 0);
  assert.equal(getTeamTier(25), 1);
  assert.equal(getTeamTier(199), 3);
  assert.equal(getTeamTier(500), 4);
  assert.equal(getTeamTierMultiplier(50), 2.25);
  assert.equal(getNextTeamTier(30), 50);
  assert.equal(getNextTeamTier(200), null);
  const def = AGENTS[0]!;
  const s = createInitialState();
  s.agents[def.id] = { count: 24 };
  const at24 = engine.getAgentProduction(s, def);
  s.agents[def.id] = { count: 25 };
  const at25 = engine.getAgentProduction(s, def);
  assert.ok(Math.abs(at25 / at24 - (25 / 24) * 1.5) < 1e-9);
});

/** Sauvegarde au format 1.0 (avant la 1.1) : seuls les ids de l'époque. */
function saveV10(): Record<string, unknown> {
  return {
    currency: 18_000, totalEarned: 160_000, prestigeCount: 1, lastSave: 1_700_000_000_000, reputationPoints: 2,
    agents: { 'bot-workflows': { count: 30 }, 'agent-copy': { count: 26 }, 'agent-analytics': { count: 20 } },
    clientsUnlocked: { 'restaurant-local': true, 'cabinet-medical': true },
    upgradesPurchased: { 'api-rate-x2': true, 'click-boost': true },
    reputationPurchased: { 'rep-start-bonus': true },
  };
}

test('une sauvegarde 1.0 se charge sans perte et reçoit les nouvelles clés', () => {
  const s = sanitizeState(saveV10());
  assert.equal(s.currency, 18_000);
  assert.equal(s.agents['bot-workflows']!.count, 30);
  assert.equal(s.clientsUnlocked['cabinet-medical'], true);
  assert.equal(s.upgradesPurchased['click-boost'], true);
  assert.equal(s.reputationPurchased['rep-start-bonus'], true);
  assert.equal(s.agents['agent-rag']!.count, 0);
  assert.equal(s.agents['agent-voice']!.count, 0);
  assert.equal(s.clientsUnlocked['banque-nova'], false);
  assert.equal(s.upgradesPurchased['copilote'], false);
});

test('les nouvelles clés survivent à un aller-retour JSON (sauvegarde locale et cloud)', () => {
  const s = sanitizeState(saveV10());
  s.agents['agent-rag'] = { count: 7 };
  s.clientsUnlocked['banque-nova'] = true;
  s.upgradesPurchased['orchestration'] = true;
  const back = sanitizeState(JSON.parse(JSON.stringify(s)));
  assert.equal(back.agents['agent-rag']!.count, 7);
  assert.equal(back.clientsUnlocked['banque-nova'], true);
  assert.equal(back.upgradesPurchased['orchestration'], true);
  // Aucun champ de premier niveau ajouté (règles Firebase : saves/$uid/v1 refuse le reste)
  assert.deepEqual(Object.keys(back).sort(), ['agents', 'clientsUnlocked', 'currency', 'lastSave', 'prestigeCount',
    'reputationPoints', 'reputationPurchased', 'totalEarned', 'upgradesPurchased']);
});

test('nouveaux marchés : agents, clients et améliorations bloqués avant le prestige requis', () => {
  const s = { ...createInitialState(), currency: 1e12, totalEarned: 1e12 };
  assert.equal(engine.canBuyAgent(s, 'agent-rag'), false);
  assert.equal(engine.getAffordableAgentCount(s, 'agent-rag'), 0);
  assert.equal(engine.buyAgent(s, 'agent-rag'), s);
  s.agents['agent-supervisor'] = { count: 20 };
  assert.equal(engine.isUpgradeVisible(s, 'clients-recurrents'), false);
  assert.equal(engine.canBuyUpgrade(s, 'orchestration'), false);
  // Production démesurée : BanqueNova ne signe pas tant que prestige < 1
  s.agents['agent-supervisor'] = { count: 400 };
  assert.equal(engine.tick(s, 0.1).state.clientsUnlocked['banque-nova'], false);

  const p1 = { ...s, prestigeCount: 1 };
  assert.equal(engine.canBuyAgent(p1, 'agent-rag'), true);
  assert.equal(engine.canBuyAgent(p1, 'agent-voice'), false);
  assert.equal(engine.isUpgradeVisible(p1, 'clients-recurrents'), true);
  assert.equal(engine.tick(p1, 0.1).state.clientsUnlocked['banque-nova'], true);
  assert.equal(engine.tick(p1, 0.1).state.clientsUnlocked['eurosante'], false);
  assert.equal(engine.canBuyAgent({ ...s, prestigeCount: 3 }, 'agent-voice'), true);
});

test('Copilote : le clic rapporte en plus 2 % de la production des agents', () => {
  const s = createInitialState();
  s.agents['agent-analytics'] = { count: 10 };
  const before = engine.getClickValue(s);
  s.upgradesPurchased['copilote'] = true;
  const after = engine.getClickValue(s);
  assert.ok(Math.abs(after - before - 0.02 * engine.getAgentRate(s)) < 1e-9);
});

test('Clients récurrents ×2 et Orchestration +1 % par Supervisor', () => {
  const s = createInitialState();
  s.prestigeCount = 1;
  s.clientsUnlocked['restaurant-local'] = true;
  const bonus = engine.getClientBonus(s);
  s.upgradesPurchased['clients-recurrents'] = true;
  assert.equal(engine.getClientBonus(s), bonus * 2);

  s.agents['bot-workflows'] = { count: 10 };
  s.agents['agent-supervisor'] = { count: 10 };
  const def = (id: string) => ({ ...AGENTS_BY_ID[id]! });
  const wf = engine.getAgentProduction(s, def('bot-workflows'));
  const sup = engine.getAgentProduction(s, def('agent-supervisor'));
  s.upgradesPurchased['orchestration'] = true;
  assert.ok(Math.abs(engine.getAgentProduction(s, def('bot-workflows')) / wf - 1.1) < 1e-9);
  assert.equal(engine.getAgentProduction(s, def('agent-supervisor')), sup); // pas sur lui-même
});

test('prestige : la réputation survit, les nouveaux marchés repartent de zéro', () => {
  const s = sanitizeState(saveV10());
  s.totalEarned = engine.getPrestigeThreshold(s);
  s.agents['agent-rag'] = { count: 12 };
  s.upgradesPurchased['memoire-partagee'] = true;
  s.reputationPurchased['rep-click-x2'] = true;
  const p = engine.prestige(s);
  assert.equal(p.prestigeCount, 2);
  assert.equal(p.agents['agent-rag']!.count, 0);
  assert.equal(p.upgradesPurchased['memoire-partagee'], false);
  assert.equal(p.reputationPurchased['rep-start-bonus'], true);
  assert.equal(p.reputationPurchased['rep-click-x2'], true);
  assert.ok(p.reputationPoints > s.reputationPoints);
  assert.deepEqual(Object.keys(p.agents).sort(), Object.keys(s.agents).sort());
});

test('Notoriété : +5 % par niveau, coût 5 × 2^n, ouverte après les 8 bonus, survit au prestige', async () => {
  const { REPUTATION_PERKS, getNotorieteCost } = await import('../src/config/reputationPerks.ts');
  assert.deepEqual([1, 2, 3, 4].map(getNotorieteCost), [5, 10, 20, 40]);
  let s = { ...createInitialState(), reputationPoints: 100 };
  assert.equal(engine.canBuyNotoriete(s), false); // bonus de base pas encore tous acquis
  for (const p of REPUTATION_PERKS) s.reputationPurchased[p.id] = true;
  const mult0 = engine.getReputationIncomeMult(s);
  s = engine.buyNotoriete(s);
  s = engine.buyNotoriete(s);
  s = engine.buyNotoriete(s);
  assert.equal(engine.getNotorieteLevel(s), 3);
  assert.equal(s.reputationPoints, 100 - 5 - 10 - 20);
  assert.equal(s.reputationPurchased['rep-notoriete-3'], true);
  assert.ok(Math.abs(engine.getReputationIncomeMult(s) / mult0 - 1.15) < 1e-9);
  // Sauvegarde puis prestige : les niveaux restent
  const loaded = sanitizeState(JSON.parse(JSON.stringify(s)));
  assert.equal(engine.getNotorieteLevel(loaded), 3);
  loaded.totalEarned = engine.getPrestigeThreshold(loaded);
  assert.equal(engine.getNotorieteLevel(engine.prestige(loaded)), 3);
  // Identifiants acceptés par les règles Firebase ($id.length < 40)
  for (const id of Object.keys(loaded.reputationPurchased)) assert.ok(id.length < 40);
});
