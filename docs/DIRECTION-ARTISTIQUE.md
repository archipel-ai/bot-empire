# Bot Empire — direction artistique « Atelier d'encre »

Une production L'Archipel. Version 2026-10-15, écrite par le Second pour Rigel.

## Idée

Bot Empire quitte le néon vert sur fond noir, le look de centaines d'idle games. Il adopte l'univers du studio : **un monde de porcelaine et d'encre où les agents IA sont des nuées de lettres qui écrivent**. Le joueur regarde son agence grandir, comme on regarde une maquette d'architecte s'animer.

La scène principale, c'est **le bureau**. Les listes (agents, clients, améliorations, contrats, réputation) passent au second plan.

## Couleurs (jetons CSS, à définir une seule fois dans `:root`)

| Jeton | Valeur | Usage |
|---|---|---|
| `--porcelaine` | `#e8ecf0` | fond |
| `--porcelaine-2` | `#dce2e8` | fond bas, panneaux en creux |
| `--socle` | `#f6f8fa` | surfaces surélevées (dalle, cartes) |
| `--encre` | `#16223d` | texte, traits |
| `--encre-pale` | `#6b7891` | texte secondaire |
| `--outremer` | `#2f4bff` | action, agents au travail, argent gagné |
| `--ambre` | `#c98a12` | objectifs, réputation, prestige |
| `--alerte` | `#d6455d` | incidents, contrats qui expirent |
| `--brume` | `#8a97ad` | bloqué, inactif |

Thème clair unique, assumé : `color-scheme: light`. Aucune couleur en dur hors de ces jetons.

## Typographie (polices hébergées DANS le jeu, pas de CDN : itch.io doit fonctionner hors ligne)

- **Titres et chiffres forts** : Bricolage Grotesque (600 / 800), licence OFL.
- **Texte** : Instrument Sans (400 / 600), licence OFL.
- **Tout ce que les agents écrivent, compteurs, prix** : IBM Plex Mono (400 / 500), licence OFL, `font-variant-numeric: tabular-nums`.

Fichiers `woff2` dans `public/fonts/` avec les fichiers de licence OFL à côté.

## Mise en page

- **Bureau ≥ 900 px** : la scène du bureau occupe environ 62 % de la largeur, à gauche, sur toute la hauteur. Le panneau d'onglets est à droite et défile seul. La barre du haut est compacte : argent, revenu par seconde, **barre « Prochain client : 72 % »**. Le bouton de travail est posé sous la scène, gros et toujours visible.
- **Téléphone** : la scène en haut (environ 46 % de la hauteur), visible en permanence. Les onglets sont dans un tiroir en bas qu'on fait glisser. Le bouton de travail est intégré au bas de la scène (plus de bouton flottant qui masque la liste). Les notifications s'affichent en haut, sous la barre, jamais derrière le contenu.

## Le bureau (canvas)

- Une **dalle de porcelaine en vue isométrique** dont la taille suit l'étape : chambre → coworking → open space → plateau → campus → unicorn. Le passage d'étape s'accompagne d'une transition : la caméra recule et la dalle s'étend.
- **Un poste par type d'agent**, rangé sur une grille. Au-dessus du poste flotte la **nuée de lettres** de ce type d'agent. Sa densité suit le nombre d'agents possédés, sur une échelle logarithmique plafonnée pour rester fluide. Un petit compteur `×12` est posé sur le socle. Fini les personnages qui se chevauchent.
- **Les nuées écrivent** : de temps en temps, une ligne courte et liée au métier de l'agent (« workflow n8n relancé », « devis envoyé »…) s'écrit lettre par lettre sur une petite feuille au-dessus du poste. Toutes les lignes passent par l'i18n.
- Le fondateur (le joueur) est un **socle doré avec un fauteuil vide**, au centre de la dalle.
- Le nom d'un agent ou d'un poste s'affiche au survol (au toucher sur téléphone).
- Performance : un seul canvas, `requestAnimationFrame`, pause quand l'onglet est caché, 60 i/s visés sur un ordinateur portable moyen. Avec `prefers-reduced-motion`, les nuées sont figées et il n'y a plus de vols de lettres.

## Le « jus »

- **Clic** : 3 à 5 lettres s'envolent du bouton vers le compteur d'argent, qui grimpe en défilement (« tween »).
- **Achat** : la nuée du poste se densifie, avec des lettres qui convergent vers le socle. Petit rebond du socle.
- **Client signé** : un **tampon « SIGNÉ » / « SIGNED »** s'abat sur la scène en encre ambre, puis s'efface. Le nom du client apparaît comme une étiquette sur la dalle.
- **Étape franchie** : la transition de caméra, plus un bandeau sobre avec le nom de l'étape.
- **Prestige** : la dalle se vide doucement en encre, puis renaît. Le multiplicateur est écrit à la main sur le fauteuil.

## Progression lisible

- Barre « Prochain client » dans la barre du haut (progression vers le seuil réel du prochain client).
- Objets bloqués : en silhouette avec « ??? », révélés quand le joueur atteint 25 % de leur prix.
- Objet achetable : bordure outremer et légère lueur.
- Sélecteur d'achat **×1 / ×10 / max** pour les agents.

## Icônes

Pictogrammes SVG en trait (1,5 px, couleur `currentColor`), un par type d'agent, par client et par onglet. **Plus d'emojis dans l'interface.**

## Son (Web Audio, synthétisé, aucun fichier)

- Clic : un petit cliquetis de machine à écrire, avec une hauteur légèrement aléatoire.
- Client signé : une cloche douce.
- Étape franchie : un accord bref.
- Bouton son on/off mémorisé, volume bas par défaut. Rien ne joue avant la première interaction.

## Contraintes

- La sauvegarde reste compatible : aucun format de sauvegarde ne change.
- Tout nouveau texte passe par `src/i18n/` (fr et en).
- Aucune dépendance npm ajoutée. Seules les polices sont ajoutées.
- `npm run build` doit passer à chaque commit.
