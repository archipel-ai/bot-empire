/**
 * Formule du prestige 1.2 : seuil 10 M€ × (1 + ventes)^4, RP = ⌊(3 + ventes) × ∛(gains / seuil)⌋,
 * et clé de transition `rep-seuil-v2` pour les parties commencées en 1.1.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { GameEngine } from '../src/core/GameEngine.ts';
import { createInitialState, sanitizeState } from '../src/core/GameState.ts';
import { getPrestigeRP, PRESTIGE_V2_KEY, REPUTATION_PERKS } from '../src/config/reputationPerks.ts';

const engine = new GameEngine();
const v11Threshold = (n: number) => Math.round(10_000_000 * Math.pow(1.5, n));

/** État de la formule 1.2 (clé posée) avec `n` ventes. */
function v2State(n: number) {
  const s = createInitialState();
  s.prestigeCount = n;
  s.reputationPurchased[PRESTIGE_V2_KEY] = true;
  return s;
}

/**
 * Sauvegarde au format 1.1 (avant la 1.2) : uniquement les identifiants de l'époque,
 * aucune clé acad-*, ref-* ni rep-seuil-v2.
 */
function saveV11(prestiges: number): Record<string, unknown> {
  const rep: Record<string, boolean> = {};
  if (prestiges >= 1) { rep['rep-start-bonus'] = true; rep['rep-click-x2'] = true; }
  if (prestiges >= 3) {
    for (const p of REPUTATION_PERKS) rep[p.id] = true;
    rep['rep-notoriete-1'] = true;
    rep['rep-notoriete-2'] = true;
  }
  return {
    currency: 2_000_000, totalEarned: 6_000_000, prestigeCount: prestiges, lastSave: 1_760_000_000_000,
    reputationPoints: prestiges * 7,
    agents: { 'bot-workflows': { count: 80 }, 'agent-copy': { count: 60 }, 'agent-supervisor': { count: 3 }, 'agent-rag': { count: prestiges ? 4 : 0 } },
    clientsUnlocked: { 'restaurant-local': true, 'gouvernement': true },
    upgradesPurchased: { 'api-rate-x2': true, 'copilote': true },
    reputationPurchased: rep,
  };
}

test('seuils 1.2 avec la clé : 10 M€, 160 M€, 810 M€, 2,56 Md€', () => {
  assert.deepEqual([0, 1, 2, 3].map(n => engine.getPrestigeThreshold(v2State(n))),
    [10_000_000, 160_000_000, 810_000_000, 2_560_000_000]);
  // Très loin du plafond des montants, même au plafond des règles Firebase (9 999 ventes)
  assert.ok(Number.isFinite(engine.getPrestigeThreshold(v2State(9_999))));
});

test('sans la clé, le seuil 1.1 reste un plafond (min des deux formules)', () => {
  for (const n of [0, 1, 2, 3, 6]) {
    const s = createInitialState();
    s.prestigeCount = n;
    assert.equal(engine.getPrestigeThreshold(s),
      Math.round(Math.min(10_000_000 * Math.pow(1 + n, 4), 10_000_000 * Math.pow(1.5, n))));
  }
});

test('RP au seuil = 3 + ventes ; 8× le seuil = 2 × (3 + ventes)', () => {
  for (const n of [0, 1, 2, 5, 19]) {
    const s = v2State(n);
    const th = engine.getPrestigeThreshold(s);
    s.totalEarned = th;
    assert.equal(engine.getPrestigeRP(s), 3 + n);
    s.totalEarned = th * 8;
    assert.equal(engine.getPrestigeRP(s), 2 * (3 + n));
  }
  // Fonction pure : gains nuls ou seuil nul
  assert.equal(getPrestigeRP(0, 10, 0), 0);
  assert.equal(getPrestigeRP(10, 0, 0), 0);
  // Avant le seuil, on affiche les RP du seuil
  const early = v2State(2);
  early.totalEarned = 1;
  assert.equal(engine.getPrestigeRP(early), 5);
});

test('la vente pose la clé, qui survit à un aller-retour JSON (local et cloud)', () => {
  const s = createInitialState();
  s.totalEarned = engine.getPrestigeThreshold(s);
  const p = engine.prestige(s);
  assert.equal(p.reputationPurchased[PRESTIGE_V2_KEY], true);
  const back = sanitizeState(JSON.parse(JSON.stringify(p)));
  assert.equal(back.reputationPurchased[PRESTIGE_V2_KEY], true);
  assert.equal(engine.getPrestigeThreshold(back), 160_000_000);
  // Identifiant accepté par les règles Firebase ($id.length < 40)
  assert.ok(PRESTIGE_V2_KEY.length < 40);
});

test('un état 1.1 avec 3 ventes et 40 M€ gagnés peut toujours vendre', () => {
  const s = sanitizeState({ ...saveV11(3), totalEarned: 40_000_000 });
  assert.equal(engine.getPrestigeThreshold(s), v11Threshold(3));
  assert.equal(engine.canPrestige(s), true);
});

test("l'objectif suivant affiché est celui de la formule 1.2", () => {
  const s = sanitizeState(saveV11(3));
  assert.equal(engine.getNextPrestigeThreshold(s), 10_000_000 * Math.pow(5, 4));
});

for (const prestiges of [0, 1, 3]) {
  test(`transition : sauvegarde 1.1 à ${prestiges} vente(s), rien n'est perdu et la partie garde son objectif`, () => {
    const raw = saveV11(prestiges);
    const s = sanitizeState(raw);
    // Rien n'est perdu au chargement
    assert.equal(s.reputationPoints, raw.reputationPoints);
    for (const [id, v] of Object.entries(raw.reputationPurchased as Record<string, boolean>)) {
      assert.equal(s.reputationPurchased[id], v, id);
    }
    assert.equal(engine.getNotorieteLevel(s), prestiges >= 3 ? 2 : 0);
    assert.equal(s.reputationPurchased[PRESTIGE_V2_KEY], false);
    // La partie en cours garde l'objectif 1.1 (barre et bouton inchangés)
    assert.equal(engine.getPrestigeThreshold(s), v11Threshold(prestiges));
    assert.equal(engine.getPrestigeProgress(s), Math.min(1, 6_000_000 / v11Threshold(prestiges)));

    // Vente de transition au seuil 1.1 : RP calculés par rapport à ce seuil
    s.totalEarned = v11Threshold(prestiges);
    assert.equal(engine.canPrestige(s), true);
    const rpBefore = s.reputationPoints;
    const earned = engine.getPrestigeRP(s);
    assert.equal(earned, 3 + prestiges);
    const p = engine.prestige(s);
    assert.equal(p.prestigeCount, prestiges + 1);
    assert.equal(p.reputationPoints, rpBefore + earned);
    assert.equal(p.reputationPurchased[PRESTIGE_V2_KEY], true);
    for (const [id, v] of Object.entries(raw.reputationPurchased as Record<string, boolean>)) {
      assert.equal(p.reputationPurchased[id], v, id);
    }
    assert.equal(engine.getNotorieteLevel(p), prestiges >= 3 ? 2 : 0);
    // La partie suivante a le nouveau seuil de son rang
    assert.equal(engine.getPrestigeThreshold(p), 10_000_000 * Math.pow(prestiges + 2, 4));
  });
}
