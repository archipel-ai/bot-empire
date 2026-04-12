import { GameState } from '../core/GameState.ts';

// ─── CONFIG ───────────────────────────────────────────────────

interface CharConfig {
  color: string;
  badge: string;
  speedFactor: number;
  squareHead: boolean;
  scale: number;
  names: string[];
  dialogues: string[];
}

const CONFIGS: Record<string, CharConfig> = {
  'bot-workflows': {
    color: '#00d4ff', badge: '🤖', speedFactor: 1.8, squareHead: true, scale: 1,
    names: ['BOT-001', 'NEXUS-7', 'UNIT-42', 'ALPHA-X', 'BOT-099', 'CIPHER', 'FLUX-2', 'NODE-5'],
    dialogues: ['workflow lancé ⚙️', 'HTTP 200 OK ✓', 'npm install...', 'trigger actif !', 'retry #3...', '42 tâches/min', 'loop en cours'],
  },
  'agent-copy': {
    color: '#ff6b9d', badge: '✍️', speedFactor: 0.85, squareHead: false, scale: 1,
    names: ['Sophie', 'Lucas', 'Emma', 'Théo', 'Jade', 'Hugo', 'Léa', 'Maxime'],
    dialogues: ['"Votre marque..."', 'SEO ×3 ✓', 'thread viral ?', 'H1 optimisé !', '"CTA parfait"', 'engagement +40%', 'landing en cours'],
  },
  'agent-analytics': {
    color: '#4ecdc4', badge: '📊', speedFactor: 0.65, squareHead: false, scale: 1,
    names: ['Iris', 'Sigma', 'Marco', 'Pixel', 'Atlas', 'Vector', 'Data-One'],
    dialogues: ['p-value: 0.03', 'dashboard ouvert', 'R² = 0.97 🎯', 'anomalie détectée', 'rapport prêt ✓', 'KPI en hausse !', 'AB test lancé'],
  },
  'agent-audit': {
    color: '#ffd93d', badge: '🔍', speedFactor: 0.75, squareHead: false, scale: 1,
    names: ['Jules', 'Scout', 'Rex', 'Aurélie', 'Inspecteur', 'Sherlock'],
    dialogues: ['bug trouvé 🔍', 'dette tech: 4j', 'RGPD conforme ✓', 'audit complet !', 'vuln. patchée', 'score: 94/100', 'tests passés ✓'],
  },
  'agent-legal': {
    color: '#a29bfe', badge: '⚖️', speedFactor: 0.45, squareHead: false, scale: 1,
    names: ['Me. Martin', 'Lex', 'Justice', 'Maître B.', 'Conseil', 'Me. Dubois'],
    dialogues: ['CGV à jour ✓', 'CNIL notifiée', 'contrat signé !', 'clause validée', 'RGPD OK 📋', 'marché public !', 'DPA rédigé'],
  },
  'agent-growth': {
    color: '#00b894', badge: '🚀', speedFactor: 1.25, squareHead: false, scale: 1,
    names: ['Rocket', 'Boost', 'Viral', 'Surge', 'Nova', 'Max', 'Flash'],
    dialogues: ['+500 leads !', 'viral sur LI !', 'partner signé', 'CTR: 12% 🔥', 'pipeline plein', 'ARR: +40% 📈', 'funnel lancé'],
  },
  'agent-supervisor': {
    color: '#fdcb6e', badge: '🎯', speedFactor: 0.4, squareHead: false, scale: 1.5,
    names: ['Le Boss', 'Director', 'Chief', 'Le Grand', 'CEO'],
    dialogues: ['bien joué équipe', 'objectif atteint ✓', 'réunion à 14h', 'performance max', '⭐ excellent !', 'on scale ! 🚀', 'livraison top'],
  },
};

// ─── TYPES ────────────────────────────────────────────────────

interface LiveChar {
  agentId: string;
  name: string;
  el: HTMLElement;
  x: number;
  y: number;
  prevX: number;
  wanderTimer: number;
  workTimer: number;
  bubbleTimer: number;
  particleTimer: number;
  isWorking: boolean;
}

const MAX_VISIBLE = 20;
let uid = 0;

const FOUNDER_DIALOGUES = [
  'On scale ! 🚀', "C'est bon ça...", 'Excellent travail !',
  'Encore un client !', 'Le plan se déroule', '💰 KPI au vert !',
  'On build ! ⚡', 'Série A en vue 👀', 'Pipeline plein 🔥',
  'Claude, continue...', 'Vision claire 🎯', "L'empire grandit.",
];

// ─── BUREAU ───────────────────────────────────────────────────

export class Bureau {
  private container = document.getElementById('bureau-chars')!;
  private emptyEl   = document.getElementById('bureau-empty')!;
  private countEl   = document.getElementById('bureau-count')!;
  private chars: LiveChar[] = [];
  private lastCounts: Record<string, number> = {};
  private founder: LiveChar | null = null;
  private lastPrestigeCount = -1;

  update(dt: number, state: GameState): void {
    this.syncFounder(state.prestigeCount);
    this.sync(state);
    this.tick(dt);
  }

  // ─── FONDATEUR ──────────────────────────────────────────────

  private syncFounder(prestigeCount: number): void {
    if (this.founder && prestigeCount === this.lastPrestigeCount) return;

    if (this.founder) {
      // Mise à jour visuelle au prestige
      const scale = Math.min(1.35 + prestigeCount * 0.12, 2.4);
      this.founder.el.style.setProperty('--char-scale', String(scale));
      const badge = this.founder.el.querySelector('.char-badge');
      if (badge) badge.textContent = prestigeCount > 0
        ? '⭐'.repeat(Math.min(prestigeCount, 5))
        : '🧑‍💻';
      // Flash doré au prestige
      this.founder.el.classList.add('prestige-flash');
      setTimeout(() => this.founder?.el.classList.remove('prestige-flash'), 1200);
      this.lastPrestigeCount = prestigeCount;
      return;
    }

    // Premier spawn du fondateur — toujours au centre
    const x = 44 + (Math.random() - 0.5) * 8;
    const y = 52;
    const scale = Math.min(1.35 + prestigeCount * 0.12, 2.4);

    const el = document.createElement('div');
    el.className = 'bureau-char bureau-founder spawning';
    el.id = 'bureau-founder';
    el.style.cssText = [
      `left:${x}%`, `top:${y}%`,
      `--char-color:#e2e8f0`,
      `--char-scale:${scale}`,
      `--bounce-ms:2200ms`,
      `--leg-ms:950ms`,
    ].join(';');
    el.innerHTML = `
      <div class="char-badge">${prestigeCount > 0 ? '⭐'.repeat(Math.min(prestigeCount, 5)) : '🧑‍💻'}</div>
      <div class="char-inner">
        <div class="char-head founder-head">
          <div class="char-eyes"><span></span><span></span></div>
          <div class="founder-smile"></div>
        </div>
        <div class="char-body founder-body"></div>
        <div class="char-legs founder-legs"><span></span><span></span></div>
      </div>
      <div class="char-name founder-label">Fondateur</div>
    `;

    this.container.appendChild(el);
    setTimeout(() => el.classList.remove('spawning'), 600);

    this.founder = {
      agentId: 'founder', name: 'Fondateur',
      el, x, y, prevX: x,
      wanderTimer:   5 + Math.random() * 4,
      workTimer:     4 + Math.random() * 5,
      bubbleTimer:   7 + Math.random() * 6,
      particleTimer: 99,
      isWorking: false,
    };
    this.lastPrestigeCount = prestigeCount;
  }

  // ─── SYNC ───────────────────────────────────────────────────

  private sync(state: GameState): void {
    let changed = false;
    for (const [id, { count }] of Object.entries(state.agents)) {
      if ((this.lastCounts[id] ?? 0) !== count) { changed = true; break; }
    }
    if (!changed) return;

    for (const [id, { count }] of Object.entries(state.agents)) {
      this.lastCounts[id] = count;
    }

    const totalAgents = Object.values(state.agents).reduce((s, a) => s + a.count, 0);
    const targets     = this.computeTargets(state.agents, totalAgents);

    const current: Record<string, number> = {};
    for (const c of this.chars) current[c.agentId] = (current[c.agentId] ?? 0) + 1;

    for (const [agentId, target] of Object.entries(targets)) {
      for (let i = (current[agentId] ?? 0); i < target; i++) this.spawn(agentId);
    }

    for (const [agentId, cur] of Object.entries(current)) {
      let toRemove = cur - (targets[agentId] ?? 0);
      while (toRemove-- > 0) {
        const entry = [...this.chars.entries()].filter(([, c]) => c.agentId === agentId).pop();
        if (entry) this.remove(entry[0]);
      }
    }

    const total = this.chars.length;
    this.emptyEl.style.display = total === 0 ? '' : 'none';
    this.countEl.textContent   = `${totalAgents} agent${totalAgents > 1 ? 's' : ''}`;
  }

  private computeTargets(agents: GameState['agents'], total: number): Record<string, number> {
    const targets: Record<string, number> = {};
    if (total === 0) return targets;

    if (total <= MAX_VISIBLE) {
      for (const [id, { count }] of Object.entries(agents)) {
        if (count > 0) targets[id] = count;
      }
      return targets;
    }

    const ratio = MAX_VISIBLE / total;
    let used = 0;
    for (const [id, { count }] of Object.entries(agents)) {
      if (count === 0) continue;
      const alloc = Math.max(1, Math.round(count * ratio));
      targets[id] = alloc;
      used += alloc;
    }
    while (used > MAX_VISIBLE) {
      const max = Object.entries(targets).sort((a, b) => b[1] - a[1])[0];
      if (!max || max[1] <= 1) break;
      targets[max[0]]--;
      used--;
    }
    return targets;
  }

  // ─── SPAWN / REMOVE ─────────────────────────────────────────

  private spawn(agentId: string): void {
    const cfg = CONFIGS[agentId];
    if (!cfg) return;

    const x = 6 + Math.random() * 82;
    const y = 32 + Math.random() * 44; // min 32% pour que les bulles aient de la place
    const bounceMs = ((1.5 / cfg.speedFactor) * 1000).toFixed(0);
    const legMs    = ((0.7 / cfg.speedFactor) * 1000).toFixed(0);
    const name     = cfg.names[Math.floor(Math.random() * cfg.names.length)];

    const el = document.createElement('div');
    el.className = 'bureau-char spawning';
    el.id = `char-${uid++}`;
    el.dataset['type'] = agentId;
    el.title = name;
    el.style.cssText = [
      `left:${x}%`, `top:${y}%`,
      `--char-color:${cfg.color}`,
      `--char-scale:${cfg.scale}`,
      `--bounce-ms:${bounceMs}ms`,
      `--leg-ms:${legMs}ms`,
    ].join(';');
    el.innerHTML = `
      <div class="char-badge">${cfg.badge}</div>
      <div class="char-inner">
        <div class="char-head${cfg.squareHead ? ' square' : ''}">
          <div class="char-eyes"><span></span><span></span></div>
        </div>
        <div class="char-body"></div>
        <div class="char-legs"><span></span><span></span></div>
      </div>
      <div class="char-name">${name}</div>
    `;

    this.container.appendChild(el);
    setTimeout(() => el.classList.remove('spawning'), 600);

    this.chars.push({
      agentId, name, el, x, y, prevX: x,
      wanderTimer:   Math.random() * 3 + 1,
      workTimer:     Math.random() * 5 + 2,
      bubbleTimer:   Math.random() * 8 + 5,
      particleTimer: Math.random() * 3 + 1,
      isWorking: false,
    });
  }

  private remove(idx: number): void {
    const char = this.chars[idx];
    char.el.classList.add('despawning');
    setTimeout(() => char.el.remove(), 380);
    this.chars.splice(idx, 1);
  }

  // ─── TICK ───────────────────────────────────────────────────

  private tick(dt: number): void {
    // Tick fondateur (mouvement lent + dialogues spéciaux)
    if (this.founder) {
      this.tickChar(this.founder, dt, 0.35, FOUNDER_DIALOGUES);
    }

    for (const char of this.chars) {
      const spd = CONFIGS[char.agentId]?.speedFactor ?? 1;
      const dialogues = CONFIGS[char.agentId]?.dialogues ?? [];
      this.tickChar(char, dt, spd, dialogues);
    }
  }

  private tickChar(char: LiveChar, dt: number, speedFactor: number, dialogues: string[]): void {
    // Working toggle
    char.workTimer -= dt;
    if (char.workTimer <= 0) {
      char.isWorking = !char.isWorking;
      char.el.classList.toggle('working', char.isWorking);
      char.workTimer = 2.5 + Math.random() * 5;
    }

    // Déplacement
    char.wanderTimer -= dt;
    if (char.wanderTimer <= 0) {
      char.prevX = char.x;
      char.x = clamp(char.x + (Math.random() - 0.5) * 28 * speedFactor, 4, 88);
      char.y = clamp(char.y + (Math.random() - 0.5) * 18 * speedFactor, 32, 80);
      char.el.style.left = `${char.x}%`;
      char.el.style.top  = `${char.y}%`;
      char.el.classList.toggle('facing-left', char.x < char.prevX);
      char.wanderTimer = (1.5 + Math.random() * 3.5) / Math.max(speedFactor, 0.1);
    }

    // Bulle de dialogue
    char.bubbleTimer -= dt;
    if (char.bubbleTimer <= 0 && dialogues.length > 0) {
      this.spawnBubble(char, dialogues);
      char.bubbleTimer = 8 + Math.random() * 10;
    }

    // Particule € (agents seulement, pas le fondateur)
    if (char.isWorking && char.agentId !== 'founder') {
      char.particleTimer -= dt;
      if (char.particleTimer <= 0) {
        this.spawnParticle(char);
        char.particleTimer = 2 + Math.random() * 3;
      }
    }
  }

  // ─── EFFETS ─────────────────────────────────────────────────

  private spawnBubble(char: LiveChar, dialogues: string[]): void {
    if (dialogues.length === 0) return;

    // Supprimer les bulles existantes sur ce perso
    char.el.querySelector('.char-bubble')?.remove();

    const text = dialogues[Math.floor(Math.random() * dialogues.length)];
    const el = document.createElement('div');
    el.className = 'char-bubble';
    el.textContent = text;
    char.el.appendChild(el);

    setTimeout(() => el.remove(), 3200);
  }

  private spawnParticle(char: LiveChar): void {
    const cfg = CONFIGS[char.agentId];
    const el  = document.createElement('div');
    el.className = 'char-particle';
    el.textContent = '€';
    el.style.cssText = `left:${char.x + 2}%;top:${char.y - 2}%;color:${cfg?.color ?? '#00ff88'}`;
    this.container.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}
