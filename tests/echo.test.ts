/**
 * Écho : le compteur de clics suit la fenêtre glissante de 30 s en continu.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { EchoSystem } from '../src/systems/EchoSystem.ts';

/** Horloge manuelle, en ms. */
function horloge() {
  let t = 1_000_000;
  return { now: () => t, avance: (ms: number) => { t += ms; } };
}

test('après une pause, le compteur baisse sans attendre le clic suivant', () => {
  const h = horloge();
  const e = new EchoSystem(h.now);
  for (let i = 0; i < 5; i++) { e.recordClick(); h.avance(1_000); }
  assert.equal(e.getState().clicksRecorded, 5);
  assert.equal(e.getState().canActivate, true);
  h.avance(26_500); // les deux premiers clics sortent de la fenêtre
  assert.equal(e.getState().clicksRecorded, 3);
  h.avance(10_000);
  assert.equal(e.getState().clicksRecorded, 0);
  assert.equal(e.getState().canActivate, false);
});

test('un rejeu ne se lance pas avec des clics sortis de la fenêtre', () => {
  const h = horloge();
  const e = new EchoSystem(h.now);
  for (let i = 0; i < 3; i++) { e.recordClick(); h.avance(500); }
  h.avance(31_000);
  e.activate();
  assert.equal(e.getState().isActive, false);
});

test('le rejeu reprend le rythme des clics enregistrés', () => {
  const h = horloge();
  const e = new EchoSystem(h.now);
  for (let i = 0; i < 4; i++) { e.recordClick(); h.avance(500); }
  e.activate();
  assert.equal(e.getState().isActive, true);
  let clics = 0;
  for (let i = 0; i < 10; i++) clics += e.tick(1);
  assert.equal(clics, 20); // un clic toutes les 0,5 s pendant 10 s
});

test('la recharge annonce sa vraie durée, réputation comprise', () => {
  const h = horloge();
  const e = new EchoSystem(h.now);
  e.setCooldownMultiplier(0.5);
  for (let i = 0; i < 3; i++) { e.recordClick(); h.avance(500); }
  e.activate();
  for (let i = 0; i < 61; i++) e.tick(1);
  const s = e.getState();
  assert.equal(s.isOnCooldown, true);
  assert.equal(s.cooldownDuration, 60);
});
