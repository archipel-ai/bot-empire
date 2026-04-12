# PLAN — Bot Empire
## Roadmap Développement MVP

---

## Jalons

### SEMAINE 1 — Core Engine

**J1-J2 : Setup + Scène principale**
- [ ] `npm create vite@latest bot-empire -- --template vanilla-ts`
- [ ] Intégration Phaser 3
- [ ] Scène `GameScene` : fond dark, layout deux colonnes
- [ ] Bouton "Exécuter une tâche" fonctionnel (+€ au clic)

**J3-J4 : Système Agents**
- [ ] `AgentSystem` : achat, production passive, niveaux
- [ ] 4 premiers agents (A1-A4) avec coûts et €/s
- [ ] Affichage en temps réel du revenu/s
- [ ] Sauvegarde `localStorage` automatique (toutes les 10s)

**J5-J6 : Clients + Upgrades**
- [ ] `ClientSystem` : déclenchement par palier de production
- [ ] 3 premiers clients (Tier 1-3)
- [ ] 5 upgrades one-shot
- [ ] Calcul revenu total en temps réel

**J7 : Prestige + Polish**
- [ ] Bouton "Vendre l'Agence" (condition + reset + multiplicateur)
- [ ] Animations : glow neon au clic, counter animé
- [ ] Sons : clic, achat agent, décrochage client (Web Audio API)

---

### SEMAINE 2 — Lancement

**J8-J9 : PWA + Mobile**
- [ ] `manifest.json` + Service Worker basique
- [ ] Layout responsive (mobile-first)
- [ ] Test sur iOS Safari + Android Chrome

**J10-J11 : Monétisation**
- [ ] Intégration Google AdSense (bannière bas)
- [ ] Rewarded Ad "Boost ×3 pendant 1h"
- [ ] Bouton "Pack Pro" (désactive ads) — Stripe ou Ko-fi

**J12-J13 : Déploiement**
- [ ] GitHub Actions → GitHub Pages auto-deploy
- [ ] Domaine custom (optionnel : bot-empire.io ~12€/an)
- [ ] Meta tags OG + description Steam-ready

**J14 : LAUNCH**
- [ ] Post r/incremental_games
- [ ] Post LinkedIn (angle "j'ai codé un jeu sur mon agence IA en 2 semaines")
- [ ] Discord ouvert pour feedback communauté

---

### MOIS 2 — Itération

- [ ] Agents A5-A7 (post-feedback)
- [ ] Clients Tier 4-6
- [ ] 2ème prestige tier (A8-A10)
- [ ] Daily bonus (connexion quotidienne)
- [ ] Extraction du moteur en template réutilisable

---

### MOIS 3-4 — Spin-off #1

- [ ] Fork du moteur → **Idle Gala** (boxe)
- [ ] Swap config : agents = entraîneurs, clients = combattants, prestige = championnat
- [ ] Assets : logos partenaires gala déjà disponibles
- [ ] Cross-promo in-game entre les deux titres

---

## Stack Technique Finale

```
bot-empire/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── index.html
└── src/
    ├── main.ts                  # Bootstrap Phaser
    ├── config/
    │   ├── agents.ts            # Définition des 7 agents
    │   ├── clients.ts           # Définition des 6 tiers clients
    │   ├── upgrades.ts          # 15 upgrades one-shot
    │   └── theme.ts             # Palette dark neon
    ├── scenes/
    │   ├── BootScene.ts         # Chargement assets
    │   ├── GameScene.ts         # Scène principale
    │   └── PrestigeScene.ts     # Animation de prestige
    ├── systems/
    │   ├── CurrencySystem.ts    # €, €/s, calcul offline
    │   ├── AgentSystem.ts       # Achat, production, niveaux
    │   ├── ClientSystem.ts      # Contrats, renouvellements
    │   ├── UpgradeSystem.ts     # Achats one-shot
    │   ├── PrestigeSystem.ts    # Reset + multiplicateurs
    │   └── SaveSystem.ts        # localStorage + cloud (phase 2)
    ├── ui/
    │   ├── Dashboard.ts         # Colonne gauche
    │   ├── AgentPanel.ts        # Liste agents + boutons achat
    │   ├── ClientPanel.ts       # Contrats actifs
    │   ├── UpgradePanel.ts      # Améliorations disponibles
    │   └── Ticker.ts            # Revenus animés en temps réel
    └── utils/
        ├── format.ts            # Formatage grands nombres (1.2M€)
        └── audio.ts             # Web Audio API sons
```

---

## Critères Go/No-Go à J7 (fin semaine 1)

- [ ] 5 testeurs inconnus jouent 20 min sans guide
- [ ] Tous comprennent le prestige sans explication
- [ ] Au moins 3 disent "j'aurais envie de revenir demain"
- [ ] Production passive visible et satisfaisante à J+5min de jeu

Si ces critères ne sont pas remplis → **pivot sur le core loop avant** de passer à la semaine 2.
