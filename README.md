# Bot Empire

Idle game de gestion d'agence IA — de freelancer solo à empire d'automatisation.

## Concept

Le joueur incarne un fondateur d'agence IA. Il commence seul, exécute des automatisations manuellement, recrute des agents spécialisés, décroche des clients, puis scale jusqu'à vendre son agence et recommencer.

## Stack Technique

| Outil | Usage |
|---|---|
| Phaser.js 3.x | Moteur de jeu |
| Vite | Build + hot reload |
| TypeScript | Code source |
| GitHub Pages | Déploiement |
| AdSense / AdMob | Monétisation |

## Style Visuel

Dark tech / neon minimaliste. Palette : fond `#0a0a0f`, accents `#00ff88` et `#7c3aed`. Zéro sprites complexes — formes géométriques, glows CSS, typographie monospace.

## Lancement

```bash
npm install
npm run dev
```

## Structure

```
bot-empire/
├── src/
│   ├── main.ts          # Point d'entrée Phaser
│   ├── scenes/          # Scènes du jeu
│   ├── systems/         # Systèmes (progression, agents, clients)
│   └── ui/              # Composants UI
├── assets/              # Sons, icônes SVG
├── docs/                # Documentation design
├── SPEC.md              # Game Design Document
└── PLAN.md              # Roadmap développement
```

## Liens

- Déploiement : GitHub Pages (à configurer)
- r/incremental_games : soumission prévue au lancement MVP
