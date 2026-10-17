/**
 * Lettre ambre (LeadSystem) et récompenses indexées sur le revenu (contrats, incidents).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LeadSystem, getLeadCashReward, LEAD_FLIGHT_S, LEAD_STILL_S } from '../src/systems/LeadSystem.ts';
import { getIndexedContractReward, CONTRACT_REWARD_SECONDS } from '../src/systems/ContractSystem.ts';
import { getIncidentReward } from '../src/systems/IncidentSystem.ts';

/** Générateur déterministe : renvoie les valeurs données, en boucle. */
const seq = (...xs: number[]) => { let i = 0; return () => xs[i++ % xs.length]!; };

/** Avance jusqu'à l'apparition d'une lettre ; renvoie le temps écoulé. */
function untilSpawn(l: LeadSystem, intervalMult = 1, still = false): number {
  let t = 0;
  while (l.tick(1, true, intervalMult, still) !== 'spawn') { t++; assert.ok(t < 1000, 'aucune lettre'); }
  return t + 1;
}

test("la lettre n'apparaît qu'en jeu actif, 2 à 4 min après le lancement", () => {
  const l = new LeadSystem(seq(0.5));
  for (let i = 0; i < 1000; i++) assert.equal(l.tick(1, false), null); // onglet caché / fenêtre ouverte
  assert.equal(untilSpawn(l), 180); // 120 + 0,5 × 120
  assert.equal(l.isOnScreen(), true);
});

test('elle repart après 8 s (12 s immobile), puis la suivante vient 3 à 6 min plus tard', () => {
  const l = new LeadSystem(seq(0));
  untilSpawn(l);
  for (let i = 1; i < LEAD_FLIGHT_S; i++) assert.equal(l.tick(1, true), null);
  assert.equal(l.tick(1, true), 'expire');
  assert.equal(untilSpawn(l), 180);
  const still = new LeadSystem(seq(0));
  untilSpawn(still, 1, true);
  for (let i = 1; i < LEAD_STILL_S; i++) assert.equal(still.tick(1, true, 1, true), null);
  assert.equal(still.tick(1, true, 1, true), 'expire');
});

test('leçon « streaming » : intervalle × 0,8', () => {
  const l = new LeadSystem(seq(0));
  untilSpawn(l);
  l.catch(10, 1000, 0.8);
  assert.equal(untilSpawn(l, 0.8), Math.ceil(180 * 0.8));
});

test('effets : 55 % revenu ×3 (30 s, sans cumul), 35 % gain immédiat plafonné, 10 % clic ×10', () => {
  // rng : 1re lettre à 120 s, puis pour chaque lettre attrapée : délai suivant, effet
  const l = new LeadSystem(seq(0, 0, 0.2, 0, 0.6, 0, 0.95, 0, 0.1)); // catch() : planification puis effet
  untilSpawn(l);
  assert.deepEqual(l.catch(100, 1e9), { effect: 'boost', amount: 0 });
  assert.equal(l.getIncomeMultiplier(), 3);
  for (let i = 0; i < 20; i++) l.tick(1, false);
  assert.equal(l.getBoostSeconds(), 10);
  untilSpawn(l);
  const cash = l.catch(100, 50_000)!;
  assert.equal(cash.effect, 'cash');
  assert.equal(cash.amount, 5_000); // 10 % de 50 000 € < 300 s × 100 €/s
  untilSpawn(l);
  assert.equal(l.catch(100, 0)!.effect, 'click');
  assert.equal(l.getClickMultiplier(), 10);
  // Un 2e « Lead chaud » remet le temps à 30 s au lieu de doubler le ×3
  untilSpawn(l);
  l.catch(100, 0);
  assert.equal(l.getIncomeMultiplier(), 3);
  assert.equal(l.getBoostSeconds(), 30);
  assert.equal(l.catch(100, 0), null); // plus de lettre à l'écran
});

test('gain immédiat : 5 min de production, au plus 10 % de la trésorerie', () => {
  assert.equal(getLeadCashReward(10, 1e9), 3_000);
  assert.equal(getLeadCashReward(1e6, 2e6), 2e5);
  assert.equal(getLeadCashReward(-5, 100), 0);
});

test('contrats : max(montant fixe, 20 / 60 / 150 s de revenu)', () => {
  assert.deepEqual(CONTRACT_REWARD_SECONDS, { common: 20, rare: 60, epic: 150 });
  assert.equal(getIndexedContractReward(1_200, 'common', 10), 1_200);
  assert.equal(getIndexedContractReward(1_200, 'common', 1_000), 20_000);
  assert.equal(getIndexedContractReward(15_000, 'rare', 1_000), 60_000);
  assert.equal(getIndexedContractReward(500_000, 'epic', 1e6), 1.5e8);
  assert.equal(getIndexedContractReward(800, 'common', NaN), 800);
});

test('incidents : max(montant fixe, 30 s de revenu)', () => {
  assert.equal(getIncidentReward(800, 1), 800);
  assert.equal(getIncidentReward(800, 1_000), 30_000);
});
