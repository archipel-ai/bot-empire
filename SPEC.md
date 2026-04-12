# SPEC — Bot Empire
## Game Design Document v1.0

---

## Vision

Un idle game de gestion d'agence IA. Le joueur part de zéro — un freelancer qui exécute des automatisations à la main — et construit un empire en recrutant des agents spécialisés, décrochant des contrats clients, et vendant son agence pour recommencer à une échelle supérieure.

**Pitch une phrase :** *"Cookie Clicker rencontre une agence IA — construis ton empire d'automatisation bot par bot."*

---

## Core Loop

```
CLIC MANUEL
"Exécuter une tâche" → +€ → Acheter Agent
        ↓
PRODUCTION PASSIVE
Agent tourne en fond → €/s croissant
        ↓
CLIENTS
Décrocher un contrat → revenu récurrent × durée
        ↓
SCALE
Ouvrir un pôle (Marketing / Tech / Legal) → multiplicateurs
        ↓
PRESTIGE : "Vendre l'agence"
Reset total + Multiplier permanent × tier → boucle recommence
```

---

## Agents (Unités de Production)

| ID | Nom | Production | Coût initial | Lore |
|---|---|---|---|---|
| A1 | Bot Workflows | 0.1 €/s | 10€ | "Automatise les tâches répétitives en n8n" |
| A2 | Agent Copy | 0.5 €/s | 75€ | "Rédige du contenu marketing en boucle" |
| A3 | Agent Analytics | 1.2 €/s | 500€ | "Analyse les données, multiplie les insights" |
| A4 | Agent Audit | 3 €/s | 3 000€ | "Audite les projets clients, débloque des contrats premium" |
| A5 | Agent Legal | 8 €/s | 20 000€ | "CGV, RGPD, conformité — clients grands comptes" |
| A6 | Agent Growth | 20 €/s | 150 000€ | "Distribution, cold outreach, partenariats" |
| A7 | Agent Supervisor | 50 €/s | 1 000 000€ | "Coordonne tous les agents — multiplicateur global" |

Chaque agent a 10 niveaux d'upgrade (×1.15 production par niveau).

---

## Clients (Revenus Récurrents)

Les clients débloquent par palier de production passive :

| Tier | Client | Contrat | Condition |
|---|---|---|---|
| 1 | Restaurant local | 50€/min | > 0.5 €/s |
| 2 | Cabinet médical | 200€/min | > 5 €/s |
| 3 | PME e-commerce | 800€/min | > 25 €/s |
| 4 | Groupe hôtelier | 3 000€/min | > 100 €/s |
| 5 | Grand compte | 15 000€/min | > 500 €/s |
| 6 | Gouvernement | 80 000€/min | > 2 000 €/s |

Les clients ont une durée de contrat (renouvellement aléatoire 70%). Un agent "Growth" augmente le taux de renouvellement à 90%.

---

## Système de Prestige

**"Vendre l'Agence"** — disponible quand valeur totale > 1 000 000€

- Reset : agents, clients, €
- Conserve : badges de prestige, multiplicateur permanent
- Multiplicateur : +15% revenus par prestige
- Tier 2 débloque après 5 prestiges : nouveaux agents (A8-A10) + clients Tier 7

---

## Upgrades (Améliorations Passives)

Achetées une seule fois avec les € accumulés :

- "API Rate Limit ×2" — double la production de tous les Bots Workflows
- "GPT-5 Integration" — +50% production agents Copy + Analytics
- "Certified Partner" — clients Tier 3+ renouvelés automatiquement
- "Series A" — débloque la production des clients même hors-ligne (24h)
- "IA Souveraine" — ×3 sur toute production (end-game)

---

## Mécanique Unique — L'ÉCHO (v2)

Dans Bot Empire, l'ÉCHO devient **"Replay de Session"** :

Le joueur peut activer un "mode replay" qui rejoue automatiquement sa dernière séquence de clics manuels en boucle pendant 60s. Utile pour farmer les premières minutes avant d'avoir des agents. Recharge en 5 minutes.

Cela conserve la mécanique ÉCHO identifiée dans l'analyse initiale, adaptée au genre idle.

---

## Interface

```
┌─────────────────────────────────────────────────────┐
│  BOT EMPIRE          €  1,247.50    +12.3 €/s       │
├──────────────────┬──────────────────────────────────┤
│                  │  AGENTS                          │
│   DASHBOARD      │  ○ Bot Workflows    x3  [BUY]   │
│                  │  ○ Agent Copy       x1  [BUY]   │
│  [EXÉCUTER]      │  ○ Agent Analytics  —   [BUY]   │
│  UNE TÂCHE       │                                  │
│                  │  CLIENTS ACTIFS                  │
│  Production/s    │  ■ Restaurant local   50€/min   │
│  ████████░░ 80%  │  ■ Cabinet médical   200€/min   │
│                  │                                  │
│  [VENDRE]        │  UPGRADES                        │
│  L'AGENCE        │  ◇ API Rate Limit ×2  [750€]    │
└──────────────────┴──────────────────────────────────┘
```

**Palette :**
- Fond : `#0a0a0f`
- Texte : `#e2e8f0`
- Accent primaire : `#00ff88` (revenus, progression)
- Accent secondaire : `#7c3aed` (upgrades, prestige)
- Agents actifs : glow neon vert
- Clients : bordure violet

---

## Monétisation

| Source | Modèle | Timing |
|---|---|---|
| Google AdSense | Bannière bas + interstitiel entre prestiges | J+1 lancement |
| AdMob (PWA mobile) | Rewarded ad = +2h de production | J+1 lancement |
| "Pack Pro" 2,99€ | Supprime toutes les pubs | J+1 lancement |
| "Boost ×3" 0,99€ | Production ×3 pendant 1h | Optionnel mois 2 |
| Newsletter | "Tips agence IA vraie" | Lien footer, gratuit |

---

## Scalabilité Moteur

Le moteur est conçu pour être skinné en < 2 semaines :

```
config/theme.ts   → couleurs, nom, logo
config/units.ts   → agents / unités de production
config/clients.ts → types de clients et paliers
config/upgrades.ts → arbre d'améliorations
assets/           → icônes SVG uniquement
```

Titres spin-off planifiés :
1. **Idle Gala** — club de boxe (assets déjà disponibles)
2. **Idle FireOps** — caserne de sapeurs-pompiers
3. **Idle La Taverne** — restaurant gastronomique

---

## Plateformes Cibles

| Plateforme | Priorité | Délai |
|---|---|---|
| Web (GitHub Pages) | P0 | J+14 |
| PWA mobile (Android/iOS) | P1 | J+21 |
| Steam (Electron wrapper) | P2 | Mois 4 si > 2k DAU |
