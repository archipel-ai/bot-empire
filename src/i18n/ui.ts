/**
 * Dictionnaires des textes d'interface. `fr` fait référence : `en` doit avoir les mêmes clés
 * (vérifié par le typage). Le contenu de jeu (agents, clients, contrats…) est dans `content.ts`.
 */

const fr = {
  'meta.title':       'Bot Empire — Construis ton agence IA',
  'meta.description': "Idle game d'agence IA. De freelancer solo à empire d'automatisation.",

  // Langue
  'lang.switch':      'EN',
  'lang.switchAria':  'Switch to English',

  // En-tête
  'header.treasury':  'TRÉSORERIE',
  'header.rate':      'PRODUCTION',
  'header.total':     'TOTAL GAGNÉ',
  'header.prestiges': 'PRESTIGES',

  // Bureau
  'bureau.title':     'BUREAU VIRTUEL',
  'bureau.empty':     'Recrutez votre premier agent',
  'bureau.agents':    '{n} agent',
  'bureau.agentsPl':  '{n} agents',
  'bureau.founder':   'Fondateur',
  'bureau.newStage':  '{icon} Nouveau bureau : {label} — {sublabel}',

  // Clic
  'click.label':      'Exécuter une tâche',

  // Écho
  'echo.label':       'MODE ÉCHO',
  'echo.activated':   '↺ Mode ÉCHO activé — vos clics se rejouent pendant 60s !',
  'echo.active':      'Actif — {n}s restantes',
  'echo.cooldown':    'Recharge — {time}',
  'echo.needClicks':  'Cliquez {n}× de plus pour activer',
  'echo.ready':       '{n} clics mémorisés — prêt !',

  // Tableau de bord
  'stats.title':      'TABLEAU DE BORD',
  'stats.agents':     'Agents actifs',
  'stats.clients':    'Contrats signés',
  'stats.upgrades':   'Upgrades achetés',
  'stats.multiplier': 'Multiplicateur',
  'stats.offline':    'Production offline',

  // Sauvegarde
  'save.share':        '🔗 Partager',
  'save.shareTitle':   'Partager mon agence',
  'save.export':       '💾 Exporter',
  'save.exportTitle':  'Exporter la sauvegarde',
  'save.import':       '📂 Importer',
  'save.importTitle':  'Importer une sauvegarde',
  'save.exported':     '💾 Sauvegarde exportée !',
  'save.imported':     '📂 Sauvegarde importée !',
  'save.importedUrl':  '📥 Sauvegarde importée avec succès !',
  'save.invalid':      '❌ Fichier invalide.',
  'save.linkCopied':   '🔗 Lien copié !',
  'save.cloudRestored': '☁️ Progression restaurée depuis le cloud !',

  // Prestige
  'prestige.cardTitle':  "VENDRE L'AGENCE",
  'prestige.target':     'Objectif : {amount}',
  'prestige.button':     "Vendre l'Agence (+15% permanent)",
  'prestige.modalTitle': "CESSION D'AGENCE",
  'prestige.modalSub':   'Vous êtes sur le point de vendre votre agence.',
  'prestige.value':      'Valeur de cession',
  'prestige.gained':     'Multiplicateur acquis',
  'prestige.after':      'Total après prestige',
  'prestige.warning':    '⚠️ Tous vos agents et contrats seront réinitialisés.',
  'prestige.confirm':    'Confirmer la vente',
  'prestige.cancel':     'Annuler',
  'prestige.gain':       '+15% revenu & +{rp} ⭐ Réputation',
  'prestige.next':       '×{mult} — prochain objectif : {amount}',
  'prestige.done':       '🏆 Agence vendue ! +{rp} ⭐ Réputation acquis.',

  // Onglets
  'tab.agents':     'Agents',
  'tab.clients':    'Clients',
  'tab.upgrades':   'Upgrades',
  'tab.contracts':  'Contrats',
  'tab.reputation': 'Réputation',
  'tab.academy':    'Academy',
  'tab.agency':     'Agence',
  'panel.label':    'Onglets de gestion',
  'panel.expand':   'Agrandir le panneau',
  'panel.collapse': 'Réduire le panneau',

  // Agents / clients / upgrades (Renderer)
  'agent.perUnit':      '{rate}/unité',
  'agent.total':        '{rate} total',
  'agent.recruited':    '🤖 Agent recruté !',
  'client.bonus':       '{rate} bonus',
  'client.unlockAt':    "Déblocage à {rate} d'agents",
  'client.missing':     ' — manque {rate}',
  'client.active':      'Actif',
  'client.new':         '🤝 Nouveau client : {name}',
  'upgrade.empty':      'Achetez des agents pour débloquer des upgrades.',
  'upgrade.bought':     '✓ Acheté',
  'upgrade.activated':  '⚙️ Upgrade activé !',

  // Marché
  'market.incomeUp':   '+{n}% revenus',
  'market.incomeDown': '−{n}% revenus',
  'market.click':      '×{mult} clics',
  'market.end':        "📊 Fin d'événement : {name}",

  // Jalons
  'milestone.10':      '🎉 Premiers €10 gagnés !',
  'milestone.100':     '💰 €100 en poche !',
  'milestone.1k':      "🚀 €1 000 — l'agence décolle !",
  'milestone.10k':     '⭐ €10 000 — client premium débloqué !',
  'milestone.100k':    '🔥 €100K — vous êtes sérieux !',
  'milestone.1m':      '👑 €1M — empire en construction !',
  'milestone.10m':     '💎 €10M — légende du secteur !',
  'milestone.100m':    '🌍 €100M — vous avez tout scalé !',
  'milestone.generic': '🏆 {amount} atteints !',

  // Contrats
  'contract.new':        '📋 Nouveau contrat : {title}',
  'contract.done':       '✅ Contrat complété ! +{reward} de {client}',
  'contract.accepted':   '✅ Contrat accepté ! Livraison dans {time}',
  'contract.board':      'BOARD DE CONTRATS — {available} disponible(s), {accepted} en cours',
  'contract.emptySlot':  "⏳ Slot {n} — En attente d'un nouveau contrat",
  'contract.nextIn':     'Prochain contrat dans 20-40 min',
  'contract.epic':       '⭐ ÉPIQUE',
  'contract.rare':       '✦ RARE',
  'contract.common':     'STANDARD',
  'contract.accept':     'Accepter',
  'contract.required':   'Requis ↑',
  'contract.inProgress': 'En cours...',

  // Réputation
  'rep.introTitle':   'Réputation — Bonus permanents',
  'rep.introText':    'Vendez votre agence (Prestige) pour gagner des points de réputation. Dépensez-les ici pour débloquer des avantages permanents qui survivent à chaque reset.',
  'rep.nextShort':    'Prochain prestige : +{rp} ⭐',
  'rep.next':         'Prochain prestige',
  'rep.points':       'Points de réputation',
  'rep.enabled':      '✓ Activé',
  'rep.owned':        'Acquis',
  'rep.buy':          'Acheter',
  'rep.missing':      'Manque {n} ⭐',
  'rep.activated':    '{icon} {name} activé !',

  // Partage / import
  'share.title':      'PARTAGER MON AGENCE',
  'share.subtitle':   "Ce lien contient ta progression complète. Envoie-le à toi-même pour changer d'appareil, migrer vers la PWA (écran d'accueil iPhone), ou partager tes stats !",
  'share.tip':        "💡 Sur iPhone : copie ce lien avant d'ajouter à l'écran d'accueil. La PWA et Safari ont des sauvegardes séparées — le cloud Firebase synchronise automatiquement.",
  'share.copy':       'Copier',
  'share.yes':        '✅ Partagé : progression, agents, €, prestiges',
  'share.no':         '🔒 Non partagé : achats, boosters, suppression pubs',
  'share.close':      'Fermer',
  'import.title':     'SAUVEGARDE DÉTECTÉE',
  'import.subtitle':  'Ce lien contient une progression. Veux-tu la charger ?',
  'import.warning':   '⚠️ Ta progression actuelle sera remplacée.',
  'import.confirm':   'Charger cette save',
  'import.cancel':    'Garder la mienne',
  'import.treasury':  'Trésorerie',
  'import.total':     'Total gagné',
  'import.agents':    'Agents',
  'import.clients':   'Clients',
  'import.prestiges': 'Prestiges',

  // Incidents
  'incident.notice':   '⚠️ Incident chez {client} — aider (+{reward})',
  'incident.ignore':   "Ignorer l'incident",
  'incident.skip':     'Ignorer cet incident',
  'incident.continue': 'Continuer',
  'incident.won':      '+{reward} encaissés ! {lesson}',
  'incident.solved':   '✅ Incident résolu ! +{reward}',
  'incident.wrong':    '❌ Mauvaise réponse — incident non résolu.',

  // Hors ligne
  'offline.title':    'BIENVENUE DE RETOUR',
  'offline.subtitle': 'Vos agents ont travaillé pendant votre absence.',
  'offline.earned':   'Revenus offline',
  'offline.collect':  'Encaisser',

  // Bulles d'aide
  'hint.firstClick':  "⚡ Clique ici pour exécuter ta première tâche : chaque clic rapporte de l'argent.",
  'hint.firstAgent':  '🤖 Tu peux recruter ton premier agent ! Il travaille pour toi en continu, même hors ligne.',
  'hint.firstClient': "🤝 Ton premier client a signé : il ajoute un bonus permanent. D'autres suivront si ta production grimpe.",
  'hint.close':       "Fermer l'aide",

  // Durées
  'duration.days':    '{n}j',
};

export type UiKey = keyof typeof fr;

const en: Record<UiKey, string> = {
  'meta.title':       'Bot Empire — Build your AI agency',
  'meta.description': 'An AI agency idle game. From solo freelancer to automation empire.',

  'lang.switch':      'FR',
  'lang.switchAria':  'Passer en français',

  'header.treasury':  'CASH',
  'header.rate':      'INCOME',
  'header.total':     'TOTAL EARNED',
  'header.prestiges': 'PRESTIGES',

  'bureau.title':     'VIRTUAL OFFICE',
  'bureau.empty':     'Hire your first agent',
  'bureau.agents':    '{n} agent',
  'bureau.agentsPl':  '{n} agents',
  'bureau.founder':   'Founder',
  'bureau.newStage':  '{icon} New office: {label} — {sublabel}',

  'click.label':      'Run a task',

  'echo.label':       'ECHO MODE',
  'echo.activated':   '↺ ECHO mode on — your clicks replay for 60s!',
  'echo.active':      'Active — {n}s left',
  'echo.cooldown':    'Recharging — {time}',
  'echo.needClicks':  'Click {n}× more to enable',
  'echo.ready':       '{n} clicks recorded — ready!',

  'stats.title':      'DASHBOARD',
  'stats.agents':     'Active agents',
  'stats.clients':    'Signed clients',
  'stats.upgrades':   'Upgrades bought',
  'stats.multiplier': 'Multiplier',
  'stats.offline':    'Offline income',

  'save.share':        '🔗 Share',
  'save.shareTitle':   'Share my agency',
  'save.export':       '💾 Export',
  'save.exportTitle':  'Export save file',
  'save.import':       '📂 Import',
  'save.importTitle':  'Import a save file',
  'save.exported':     '💾 Save exported!',
  'save.imported':     '📂 Save imported!',
  'save.importedUrl':  '📥 Save imported successfully!',
  'save.invalid':      '❌ Invalid file.',
  'save.linkCopied':   '🔗 Link copied!',
  'save.cloudRestored': '☁️ Progress restored from the cloud!',

  'prestige.cardTitle':  'SELL THE AGENCY',
  'prestige.target':     'Goal: {amount}',
  'prestige.button':     'Sell the Agency (+15% permanent)',
  'prestige.modalTitle': 'AGENCY SALE',
  'prestige.modalSub':   'You are about to sell your agency.',
  'prestige.value':      'Sale value',
  'prestige.gained':     'Multiplier gained',
  'prestige.after':      'Total after prestige',
  'prestige.warning':    '⚠️ All your agents and contracts will be reset.',
  'prestige.confirm':    'Confirm sale',
  'prestige.cancel':     'Cancel',
  'prestige.gain':       '+15% income & +{rp} ⭐ Reputation',
  'prestige.next':       '×{mult} — next goal: {amount}',
  'prestige.done':       '🏆 Agency sold! +{rp} ⭐ Reputation earned.',

  'tab.agents':     'Agents',
  'tab.clients':    'Clients',
  'tab.upgrades':   'Upgrades',
  'tab.contracts':  'Contracts',
  'tab.reputation': 'Reputation',
  'tab.academy':    'Academy',
  'tab.agency':     'Agency',
  'panel.label':    'Management tabs',
  'panel.expand':   'Expand the panel',
  'panel.collapse': 'Collapse the panel',

  'agent.perUnit':      '{rate}/unit',
  'agent.total':        '{rate} total',
  'agent.recruited':    '🤖 Agent hired!',
  'client.bonus':       '{rate} bonus',
  'client.unlockAt':    'Unlocks at {rate} from agents',
  'client.missing':     ' — {rate} to go',
  'client.active':      'Active',
  'client.new':         '🤝 New client: {name}',
  'upgrade.empty':      'Hire agents to unlock upgrades.',
  'upgrade.bought':     '✓ Bought',
  'upgrade.activated':  '⚙️ Upgrade enabled!',

  'market.incomeUp':   '+{n}% income',
  'market.incomeDown': '−{n}% income',
  'market.click':      '×{mult} clicks',
  'market.end':        '📊 Event over: {name}',

  'milestone.10':      '🎉 First €10 earned!',
  'milestone.100':     '💰 €100 in the bank!',
  'milestone.1k':      '🚀 €1,000 — the agency takes off!',
  'milestone.10k':     '⭐ €10,000 — premium client unlocked!',
  'milestone.100k':    "🔥 €100K — you're serious!",
  'milestone.1m':      '👑 €1M — an empire in the making!',
  'milestone.10m':     '💎 €10M — industry legend!',
  'milestone.100m':    "🌍 €100M — you've scaled everything!",
  'milestone.generic': '🏆 {amount} reached!',

  'contract.new':        '📋 New contract: {title}',
  'contract.done':       '✅ Contract complete! +{reward} from {client}',
  'contract.accepted':   '✅ Contract accepted! Delivery in {time}',
  'contract.board':      'CONTRACT BOARD — {available} available, {accepted} in progress',
  'contract.emptySlot':  '⏳ Slot {n} — Waiting for a new contract',
  'contract.nextIn':     'Next contract in 20-40 min',
  'contract.epic':       '⭐ EPIC',
  'contract.rare':       '✦ RARE',
  'contract.common':     'STANDARD',
  'contract.accept':     'Accept',
  'contract.required':   'Required ↑',
  'contract.inProgress': 'In progress...',

  'rep.introTitle':   'Reputation — Permanent bonuses',
  'rep.introText':    'Sell your agency (Prestige) to earn reputation points. Spend them here on permanent perks that survive every reset.',
  'rep.nextShort':    'Next prestige: +{rp} ⭐',
  'rep.next':         'Next prestige',
  'rep.points':       'Reputation points',
  'rep.enabled':      '✓ Enabled',
  'rep.owned':        'Owned',
  'rep.buy':          'Buy',
  'rep.missing':      '{n} ⭐ short',
  'rep.activated':    '{icon} {name} enabled!',

  'share.title':      'SHARE MY AGENCY',
  'share.subtitle':   'This link holds your full progress. Send it to yourself to switch devices, move to the home-screen app, or show off your stats!',
  'share.tip':        '💡 On iPhone: copy this link before adding to the home screen. The home-screen app and Safari keep separate saves — Firebase cloud sync handles it automatically.',
  'share.copy':       'Copy',
  'share.yes':        '✅ Shared: progress, agents, €, prestiges',
  'share.no':         '🔒 Not shared: purchases, boosters, ad removal',
  'share.close':      'Close',
  'import.title':     'SAVE DETECTED',
  'import.subtitle':  'This link contains a save. Load it?',
  'import.warning':   '⚠️ Your current progress will be replaced.',
  'import.confirm':   'Load this save',
  'import.cancel':    'Keep mine',
  'import.treasury':  'Cash',
  'import.total':     'Total earned',
  'import.agents':    'Agents',
  'import.clients':   'Clients',
  'import.prestiges': 'Prestiges',

  'incident.notice':   '⚠️ Incident at {client} — help out (+{reward})',
  'incident.ignore':   'Ignore the incident',
  'incident.skip':     'Ignore this incident',
  'incident.continue': 'Continue',
  'incident.won':      '+{reward} earned! {lesson}',
  'incident.solved':   '✅ Incident solved! +{reward}',
  'incident.wrong':    '❌ Wrong answer — incident not solved.',

  'offline.title':    'WELCOME BACK',
  'offline.subtitle': 'Your agents kept working while you were away.',
  'offline.earned':   'Offline income',
  'offline.collect':  'Collect',

  'hint.firstClick':  '⚡ Click here to run your first task: every click earns money.',
  'hint.firstAgent':  '🤖 You can hire your first agent! It works for you nonstop, even offline.',
  'hint.firstClient': '🤝 Your first client signed: it adds a permanent bonus. More will follow as your income grows.',
  'hint.close':       'Close tip',

  'duration.days':    '{n}d',
};

export const UI: Record<'fr' | 'en', Record<UiKey, string>> = { fr, en };
