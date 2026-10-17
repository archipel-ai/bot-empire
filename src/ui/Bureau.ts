import { GameState } from '../core/GameState.ts';
import { AGENTS } from '../config/agents.ts';
import { CLIENTS } from '../config/clients.ts';
import { t } from '../i18n/i18n.ts';
import { PHONE_QUERY } from './Drawer.ts';
import { icon, type IconName } from './icons.ts';

/**
 * Bureau — la scène principale, dessinée dans un seul canvas.
 * Une dalle de porcelaine isométrique qui s'étend avec l'étape ; un socle par type
 * d'agent, surmonté de la nuée de lettres de ce type (densité logarithmique) ;
 * de temps en temps une feuille s'écrit au-dessus d'un poste. Le fondateur est un
 * socle doré avec un fauteuil vide, au centre.
 * Inspiré du rendu de la vitrine du studio (dalle, socle, nuée, feuille).
 */

// ─── STAGES ───────────────────────────────────────────────────

export interface BureauStage {
  id:       string;
  label:    string;
  sublabel: string;
  icon:     IconName;
}

export const STAGES: Array<{ minAgents: number; minPrestige: number } & BureauStage> = [
  { id: 'chambre',     minAgents: 0,   minPrestige: 0, icon: 'sofa',    label: 'Chambre d\'ado',   sublabel: 'Le voyage commence ici' },
  { id: 'home-office', minAgents: 1,   minPrestige: 0, icon: 'monitor', label: 'Home Office',      sublabel: 'Les premiers projets arrivent' },
  { id: 'coworking',   minAgents: 10,  minPrestige: 0, icon: 'cup',     label: 'Espace Coworking', sublabel: 'L\'équipe prend forme' },
  { id: 'startup',     minAgents: 25,  minPrestige: 0, icon: 'rocket',  label: 'Locaux Startup',   sublabel: 'On scale !' },
  { id: 'scale-up',    minAgents: 60,  minPrestige: 0, icon: 'building', label: 'Scale-up',         sublabel: 'L\'empire se construit' },
  { id: 'unicorn',     minAgents: 120, minPrestige: 0, icon: 'crown',   label: 'Siège Social',     sublabel: 'Niveau licorne !' },
];

function getStageIndex(totalAgents: number, prestigeCount: number): number {
  // Chaque prestige réduit les seuils de 20% (cumulatif), pour récompenser la progression
  const reduction = Math.pow(0.8, prestigeCount);
  let current = 0;
  STAGES.forEach((s, i) => {
    if (totalAgents >= Math.floor(s.minAgents * reduction)) current = i;
  });
  return current;
}

// ─── LIGNES MÉTIER ────────────────────────────────────────────
// Ce que chaque type d'agent écrit sur sa feuille. Français ici, anglais dans i18n/content.ts.

export const AGENT_LINES: Record<string, string[]> = {
  'bot-workflows':    ['workflow n8n relancé', 'webhook reçu', 'HTTP 200 OK', 'retry n°3 réussi', '42 tâches/min', 'cron de 6 h lancé'],
  'agent-copy':       ['brouillon v2 prêt', 'titre H1 réécrit', 'newsletter envoyée', 'post LinkedIn calé', 'fiche produit livrée', 'accroche testée'],
  'agent-analytics':  ['tableau de bord à jour', 'anomalie détectée', 'test A/B lancé', 'rapport hebdo prêt', 'cohorte analysée', 'KPI en hausse'],
  'agent-audit':      ['audit RGPD terminé', 'faille corrigée', 'score : 94/100', 'dette tech : 4 j', 'tests au vert', 'journaux vérifiés'],
  'agent-legal':      ['CGV mises à jour', 'clause validée', 'DPA rédigé', 'devis envoyé', 'contrat relu', 'registre RGPD tenu'],
  'agent-growth':     ['+500 prospects', 'relance n°2 partie', 'partenaire signé', 'pipeline plein', 'démo réservée', 'campagne lancée'],
  'agent-supervisor': ['priorités du jour', "revue d'équipe", 'livraison validée', 'charge rééquilibrée', 'objectif atteint', 'agents synchronisés'],
  'agent-rag':        ['index vectoriel à jour', '1 200 docs ingérés', 'source citée', 'passage n°48 trouvé', 'base de savoir enrichie', 'réponse sourcée'],
  'agent-voice':      ['appel décroché', 'rendez-vous pris', 'transcription prête', 'standard ouvert 24 h/24', 'rappel programmé', 'appel résumé'],
};

// ─── RÉGLAGES ─────────────────────────────────────────────────

/** Demi-côté de la dalle (unités de grille) par étape : chambre → siège social. */
const STAGE_EXTENT   = [1.7, 2.6, 3.2, 3.6, 4.1, 4.6];
const CELL           = 2.2;           // écart entre deux postes
/** Place de chaque type d'agent autour du fondateur, dans l'ordre de AGENTS. */
const POST_CELLS: Array<[number, number]> = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1], [2, 0]];
const POST_HALF      = 0.62;          // demi-côté d'un socle
const POST_HEIGHT    = 26;            // hauteur d'un socle (1/60 de S)
const FOUNDER_HALF   = 0.78;
const FOUNDER_HEIGHT = 30;
const LETTERS_BASE   = 12;            // lettres d'une nuée pour un seul agent…
const LETTERS_LOG    = 15;            // … puis + LETTERS_LOG × log2(1 + n)
const LETTERS_MAX    = 80;            // plafond par nuée (fluidité)
const MAX_S          = 92;            // échelle maximale (px par unité)
const CAMERA_RATE    = 1.6;           // vitesse de la caméra (1/s)
const SHEET_TYPE_CPS = 16;            // lettres écrites par seconde sur une feuille
const SHEET_HOLD     = 2.4;           // s : la feuille reste lisible une fois écrite
const SHEET_FADE     = 0.6;           // s
const SHEET_GAP_MIN  = 2.2;           // s entre deux nouvelles feuilles
const SHEET_GAP_MAX  = 4.8;
const TOUCH_TIP_MS   = 2600;
const MAX_DT         = 0.05;
const BURST_LETTERS  = 9;             // lettres qui convergent vers le socle à l'achat
const BOUNCE_TIME    = 0.45;          // s
const STAMP_IN       = 0.22;          // s : le tampon s'abat
const STAMP_HOLD     = 1.3;
const STAMP_OUT      = 0.8;
const BANNER_MS      = 2800;
const INK_IN         = 1.3;           // s : la dalle se vide en encre (prestige)
const INK_OUT        = 1.7;           // s : puis renaît
const REBIRTH_EXTENT = 0.6;

// ─── TYPES ────────────────────────────────────────────────────

interface Letter { ch: string; a: number; r: number; h: number; v: number; ph: number; }

interface Flight { ch: string; t: number; x0: number; y0: number; idx: number; }

interface Sheet {
  text:   string;
  typed:  number;
  acc:    number;
  hold:   number;   // temps restant une fois écrite (puis fondu)
  flights: Flight[];
}

interface Burst { ch: string; t: number; dx: number; dy: number; }

interface Stamp { label: string; t: number; }

interface Post {
  id:      string;
  bursts:  Burst[];
  bounce:  number;
  name:    string;
  gx:      number;
  gy:      number;
  count:   number;
  letters: Letter[];
  source:  string;
  sheet:   Sheet | null;
  // Projection du dernier rendu (pour le survol)
  sx: number; sy: number; top: number;
}

interface Palette {
  encre: string; pale: string; outremer: string; ambre: string; brume: string;
  socle: string; fond: string; fond2: string;
}

// ─── COULEURS ─────────────────────────────────────────────────

type Rgb = [number, number, number];

function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '').trim();
  const n = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
  return [n >> 16, (n >> 8) & 255, n & 255];
}
function rgba(c: Rgb, a: number): string { return `rgba(${c[0]},${c[1]},${c[2]},${Math.max(0, Math.min(1, a))})`; }
function mix(a: Rgb, b: Rgb, t: number): Rgb {
  return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t)];
}

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const tok = (n: string) => css.getPropertyValue(n).trim();
  return {
    encre: tok('--encre'), pale: tok('--encre-pale'), outremer: tok('--outremer'), ambre: tok('--ambre'),
    brume: tok('--brume'), socle: tok('--socle'), fond: tok('--porcelaine'), fond2: tok('--porcelaine-2'),
  };
}

const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);

// ─── BUREAU ───────────────────────────────────────────────────

export class Bureau {
  private bureauEl   = document.getElementById('bureau')!;
  private emptyEl    = document.getElementById('bureau-empty')!;
  private countEl    = document.getElementById('bureau-count')!;
  private stageBadge = document.getElementById('bureau-stage-badge')!;
  private canvas     = document.createElement('canvas');
  private ctx        = this.canvas.getContext('2d')!;
  private tooltip    = document.createElement('div');

  private reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  private phone   = window.matchMedia(PHONE_QUERY);

  private W = 0; private H = 0; private S = 40; private CX = 0; private CY = 0;
  private ext = STAGE_EXTENT[0]!;   // demi-côté affiché (suit la cible en douceur)
  private extTarget = STAGE_EXTENT[0]!;
  private time = 0;
  private sheetTimer = 1.5;

  private posts: Post[];
  private founderMult = 1;
  private prestigeCount = 0;
  private totalAgents = 0;
  private hovered: string | null = null;
  private touchTimer: ReturnType<typeof setTimeout> | null = null;
  private dpr = 1;
  private clients: string[] = [];        // noms des clients signés, dans l'ordre
  private freshClient = '';              // dernier signé (étiquette en ambre)
  private freshTimer = 0;
  private stampState: Stamp | null = null;
  private ink = -1;                      // temps de l'animation de prestige (< 0 : aucune)
  private banner = document.createElement('div');
  private bannerTimer: ReturnType<typeof setTimeout> | null = null;

  // Couleurs résolues depuis les jetons CSS
  private C: Record<keyof Palette, Rgb>;
  private faceL: Rgb; private faceR: Rgb; private slabTop: Rgb; private slabL: Rgb; private slabR: Rgb;
  private goldTop: Rgb; private goldL: Rgb; private goldR: Rgb;
  private mono: string; private display: string;

  private currentStageId = '';
  onStageChange?: (stage: BureauStage) => void;

  constructor() {
    const p = readPalette();
    this.C = Object.fromEntries(Object.entries(p).map(([k, v]) => [k, hexToRgb(v)])) as Record<keyof Palette, Rgb>;
    this.slabTop = mix(this.C.socle, this.C.fond, 0.35);
    this.slabL   = mix(this.C.fond2, this.C.brume, 0.18);
    this.slabR   = mix(this.C.fond2, this.C.brume, 0.34);
    this.faceL   = mix(this.C.fond2, this.C.brume, 0.22);
    this.faceR   = mix(this.C.fond2, this.C.brume, 0.40);
    this.goldTop = mix(this.C.socle, this.C.ambre, 0.22);
    this.goldL   = mix(this.C.ambre, this.C.socle, 0.45);
    this.goldR   = mix(this.C.ambre, this.C.encre, 0.12);
    const css = getComputedStyle(document.documentElement);
    this.mono    = css.getPropertyValue('--mono').trim() || 'monospace';
    this.display = css.getPropertyValue('--display').trim() || 'sans-serif';

    this.posts = AGENTS.map((def, i) => {
      const [cx, cy] = POST_CELLS[i % POST_CELLS.length]!;
      const source = (AGENT_LINES[def.id] ?? [def.name]).join('').replace(/\s+/g, '');
      return {
        id: def.id, name: def.name, gx: cx * CELL, gy: cy * CELL, count: 0,
        letters: [], source, sheet: null, sx: 0, sy: 0, top: 0, bursts: [], bounce: 0,
      };
    });

    this.canvas.className = 'bureau-canvas';
    this.canvas.setAttribute('role', 'img');
    this.tooltip.className = 'bureau-tooltip hidden';
    this.tooltip.setAttribute('aria-hidden', 'true');
    this.bureauEl.prepend(this.canvas);
    this.bureauEl.appendChild(this.tooltip);
    this.banner.className = 'bureau-banner hidden';
    this.banner.setAttribute('role', 'status');
    this.bureauEl.appendChild(this.banner);

    new ResizeObserver(() => this.resize()).observe(this.bureauEl);
    this.resize();

    this.canvas.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') this.pick(e, false); });
    this.canvas.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') this.setHover(null); });
    this.canvas.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') this.pick(e, true); });
  }

  /** Avance la scène de `dt` secondes et la redessine (rien si l'onglet est caché). */
  update(dt: number, state: GameState): void {
    this.sync(state);
    if (document.hidden || this.W === 0) return;
    const step = Math.min(dt, MAX_DT);
    this.time += step;
    this.animate(step);
    this.draw();
  }

  // ─── EFFETS DÉCLENCHÉS PAR LE JEU ───────────────────────────

  /** Achat d'agents : des lettres convergent vers le socle, qui rebondit. */
  celebratePurchase(agentId: string): void {
    const post = this.posts.find(p => p.id === agentId);
    if (!post || this.reduced.matches) return;
    post.bounce = BOUNCE_TIME;
    for (let i = 0; i < BURST_LETTERS; i++) {
      const a = (i / BURST_LETTERS) * Math.PI * 2 + Math.random() * 0.5;
      post.bursts.push({
        ch: post.source[Math.floor(Math.random() * post.source.length)] ?? '·',
        t: -Math.random() * 0.25,
        dx: Math.cos(a) * (1.4 + Math.random() * 0.8),
        dy: Math.sin(a) * (0.9 + Math.random() * 0.6) - 0.6,
      });
    }
  }

  /** Client signé : tampon « SIGNÉ » sur la scène, puis étiquette sur la dalle. */
  stamp(clientName: string): void {
    this.freshClient = clientName;
    this.freshTimer = 6;
    this.stampState = { label: t('bureau.signed'), t: this.reduced.matches ? STAMP_IN : 0 };
  }

  /** Prestige : la dalle se vide doucement en encre, puis renaît. */
  playPrestige(): void {
    if (this.reduced.matches) return;
    this.ink = 0;
  }

  private showBanner(stage: BureauStage): void {
    this.announce(t('bureau.newSpace'), stage.label, stage.sublabel);
  }

  /** Bandeau sobre sur la scène : surtitre, titre, sous-titre (étape franchie, nouveaux marchés). */
  announce(kicker: string, title: string, sub: string): void {
    this.banner.innerHTML = '<span class="bureau-banner-kicker"></span><strong></strong><span class="bureau-banner-sub"></span>';
    this.banner.querySelector('.bureau-banner-kicker')!.textContent = kicker;
    this.banner.querySelector('strong')!.textContent = title;
    this.banner.querySelector('.bureau-banner-sub')!.textContent = sub;
    this.banner.classList.remove('hidden', 'leaving');
    if (this.bannerTimer) clearTimeout(this.bannerTimer);
    this.bannerTimer = setTimeout(() => {
      this.banner.classList.add('leaving');
      this.bannerTimer = setTimeout(() => this.banner.classList.add('hidden'), 400);
    }, BANNER_MS);
  }

  // ─── ÉTAT ───────────────────────────────────────────────────

  private sync(state: GameState): void {
    // Pendant que l'encre recouvre la dalle, l'ancienne agence reste affichée
    if (this.ink >= 0 && this.ink < INK_IN) return;

    const signed = CLIENTS.filter(c => state.clientsUnlocked[c.id]).map(c => c.name);
    if (signed.length !== this.clients.length) this.clients = signed;

    let total = 0;
    for (const post of this.posts) {
      const count = state.agents[post.id]?.count ?? 0;
      total += count;
      if (count !== post.count) {
        post.count = count;
        this.resizeCloud(post);
      }
    }
    this.prestigeCount = state.prestigeCount;
    this.founderMult = 1 + state.prestigeCount * 0.15;

    if (total !== this.totalAgents || !this.currentStageId) {
      this.totalAgents = total;
      this.countEl.textContent = t(total > 1 ? 'bureau.agentsPl' : 'bureau.agents', { n: total });
      this.emptyEl.style.display = total === 0 ? '' : 'none';
      this.canvas.setAttribute('aria-label', this.describe());
    }
    this.syncStage(total, state.prestigeCount);
  }

  private syncStage(totalAgents: number, prestigeCount: number): void {
    const idx = getStageIndex(totalAgents, prestigeCount);
    const stage = STAGES[idx]!;
    // Dalle : l'étape, mais jamais plus petite que les postes occupés
    const needed = this.posts.reduce((m, p) => p.count > 0 ? Math.max(m, Math.max(Math.abs(p.gx), Math.abs(p.gy)) + POST_HALF + 0.55) : m, 0);
    this.extTarget = Math.max(STAGE_EXTENT[idx] ?? STAGE_EXTENT[0]!, needed);

    if (stage.id === this.currentStageId) return;
    const prev = this.currentStageId;
    if (prev) this.bureauEl.classList.remove(`stage-${prev}`);
    this.bureauEl.classList.add(`stage-${stage.id}`);
    this.currentStageId = stage.id;

    this.stageBadge.innerHTML = `<span class="stage-icon">${icon(stage.icon)}</span><span class="stage-label"></span><span class="stage-sublabel"></span>`;
    this.stageBadge.querySelector('.stage-label')!.textContent = stage.label;
    this.stageBadge.querySelector('.stage-sublabel')!.textContent = stage.sublabel;

    if (!prev) {
      this.ext = this.extTarget; // premier chargement : pas de transition
      return;
    }
    // Transition : la caméra recule à partir de la dalle d'avant (voir animate), bandeau sobre
    if (idx > STAGES.findIndex(st => st.id === prev)) this.showBanner(stage);
    if (this.onStageChange) this.onStageChange(stage);
  }

  private describe(): string {
    const owned = this.posts.filter(p => p.count > 0).map(p => `${p.name} ×${p.count}`);
    return owned.length ? `${t('bureau.title')} — ${owned.join(', ')}` : t('bureau.empty');
  }

  /** Nombre de lettres d'une nuée : logarithmique, plafonné. */
  private cloudSize(count: number): number {
    if (count <= 0) return 0;
    return Math.min(LETTERS_MAX, Math.round(LETTERS_BASE + LETTERS_LOG * Math.log2(1 + count)));
  }

  private resizeCloud(post: Post): void {
    const target = this.cloudSize(post.count);
    while (post.letters.length > target) post.letters.pop();
    let j = post.letters.length;
    while (post.letters.length < target) {
      post.letters.push({
        ch: post.source[(j * 7) % post.source.length] ?? '·',
        a:  Math.random() * Math.PI * 2,
        r:  0.25 + Math.random() * 0.75,
        h:  Math.random(),
        v:  0.5 + Math.random() * 0.9,
        ph: Math.random() * Math.PI * 2,
      });
      j++;
    }
    if (post.count === 0) post.sheet = null;
  }

  // ─── ANIMATION ──────────────────────────────────────────────

  private animate(dt: number): void {
    const still = this.reduced.matches;
    // Caméra : la dalle s'étend en douceur vers sa cible
    this.ext = still ? this.extTarget : this.ext + (this.extTarget - this.ext) * (1 - Math.exp(-dt * CAMERA_RATE));

    if (!still) {
      for (const post of this.posts) {
        for (const l of post.letters) {
          l.a += l.v * dt * 0.6;
          l.h += l.v * dt * 0.2;
          if (l.h > 1) l.h -= 1;
        }
      }
    }

    for (const post of this.posts) {
      if (post.bounce > 0) post.bounce = Math.max(0, post.bounce - dt);
      if (post.bursts.length) {
        for (const b of post.bursts) b.t += dt * 1.6;
        post.bursts = post.bursts.filter(b => b.t < 1);
      }
    }
    if (this.stampState) {
      this.stampState.t += dt;
      if (this.stampState.t > STAMP_IN + STAMP_HOLD + STAMP_OUT) this.stampState = null;
    }
    if (this.freshTimer > 0) this.freshTimer -= dt;
    if (this.ink >= 0) {
      const before = this.ink;
      this.ink += dt;
      if (before < INK_IN && this.ink >= INK_IN) this.ext = REBIRTH_EXTENT; // la dalle renaît petite
      if (this.ink > INK_IN + INK_OUT) this.ink = -1;
    }

    // Feuilles : une nouvelle de temps en temps sur un poste occupé
    this.sheetTimer -= dt;
    const active = this.posts.filter(p => p.sheet).length;
    const maxSheets = this.phone.matches ? 1 : 2;
    if (this.sheetTimer <= 0) {
      this.sheetTimer = SHEET_GAP_MIN + Math.random() * (SHEET_GAP_MAX - SHEET_GAP_MIN);
      const free = this.posts.filter(p => p.count > 0 && !p.sheet);
      if (active < maxSheets && free.length) {
        const post = free[Math.floor(Math.random() * free.length)]!;
        const lines = AGENT_LINES[post.id] ?? [post.name];
        const text = lines[Math.floor(Math.random() * lines.length)]!;
        post.sheet = { text, typed: still ? text.length : 0, acc: 0, hold: SHEET_HOLD + (still ? 1.5 : 0), flights: [] };
      }
    }
    for (const post of this.posts) {
      const sh = post.sheet;
      if (!sh) continue;
      if (sh.typed < sh.text.length) {
        sh.acc += dt * SHEET_TYPE_CPS;
        while (sh.acc >= 1 && sh.typed < sh.text.length) {
          sh.acc -= 1;
          const ch = sh.text[sh.typed]!;
          if (ch.trim()) sh.flights.push({ ch, t: 0, x0: post.sx, y0: post.top - this.S * 0.6, idx: sh.typed });
          sh.typed++;
        }
      } else {
        sh.hold -= dt;
        if (sh.hold <= -SHEET_FADE) post.sheet = null;
      }
      for (const f of sh.flights) f.t += dt * 2.4;
      sh.flights = sh.flights.filter(f => f.t < 1);
    }
  }

  // ─── RENDU ──────────────────────────────────────────────────

  private resize(): void {
    const r = this.bureauEl.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.dpr = dpr;
    this.W = Math.round(r.width);
    this.H = Math.round(r.height);
    this.canvas.width  = Math.max(1, Math.round(this.W * dpr));
    this.canvas.height = Math.max(1, Math.round(this.H * dpr));
    this.canvas.style.width  = `${this.W}px`;
    this.canvas.style.height = `${this.H}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    if (this.reduced.matches || document.hidden) this.draw();
  }

  /** Place la caméra pour que toute la dalle et ses nuées tiennent dans le canvas. */
  private frame(): void {
    const padX = 18;
    const padTop = 34;
    const padBottom = this.phone.matches ? 78 : 46;
    const above = 2.6; // nuées et feuilles au-dessus des postes du fond (en S)
    const below = 0.5; // épaisseur de la dalle et noms gravés
    const e = this.ext;
    const sW = (this.W - padX * 2) / (3.464 * e);
    const sH = (this.H - padTop - padBottom) / (2 * e + above + below);
    this.S = Math.max(8, Math.min(MAX_S, sW, sH));
    this.CX = this.W / 2;
    const used = (2 * e + above + below) * this.S;
    const top = padTop + Math.max(0, (this.H - padTop - padBottom - used) / 2);
    this.CY = top + (above + e) * this.S;
  }

  private iso(gx: number, gy: number, z = 0): [number, number] {
    return [this.CX + (gx - gy) * this.S * 0.866, this.CY + (gx + gy) * this.S * 0.5 - z * this.S / 60];
  }

  private draw(): void {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);
    if (this.W === 0) return;
    this.frame();
    this.drawSlab();
    this.drawClientLabels();

    const order = [...this.posts].sort((a, b) => (a.gx + a.gy) - (b.gx + b.gy));
    const founderDepth = 0;
    let founderDrawn = false;
    for (const post of order) {
      if (!founderDrawn && post.gx + post.gy > founderDepth) { this.drawFounder(); founderDrawn = true; }
      this.drawPost(post);
    }
    if (!founderDrawn) this.drawFounder();

    for (const post of order) this.drawCloud(post);
    for (const post of order) this.drawBursts(post);
    for (const post of order) this.drawSheet(post);
    this.drawInk();
    this.drawStamp();
  }

  /** Étiquettes des clients signés, couchées sur la dalle le long du bord avant gauche. */
  private drawClientLabels(): void {
    if (!this.clients.length) return;
    const ctx = this.ctx;
    const e = this.ext;
    const fs = Math.max(8, Math.min(13, this.S * 0.19));
    const unit = this.S;
    let gx = -e + 0.35;
    let gy = e - 0.3;
    ctx.save();
    ctx.font = `500 ${fs}px ${this.mono}`;
    for (const name of this.clients) {
      const label = name.toUpperCase();
      const len = (ctx.measureText(label).width + fs * 1.6) / unit; // en unités de grille
      if (gx + len > e - 0.2) { gx = -e + 0.35; gy -= 0.42; }
      const [x, y] = this.iso(gx, gy);
      // Repère couché sur le sol : x le long de gx, y le long de gy
      ctx.setTransform(this.dpr * 0.866, this.dpr * 0.5, this.dpr * -0.866, this.dpr * 0.5, x * this.dpr, y * this.dpr);
      const fresh = name === this.freshClient && this.freshTimer > 0;
      ctx.fillStyle = fresh ? rgba(this.C.ambre, 1) : rgba(this.C.encre, 0.42);
      ctx.fillText(label, 0, 0);
      gx += len;
    }
    ctx.restore();
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  private drawBursts(post: Post): void {
    if (!post.bursts.length) return;
    const ctx = this.ctx;
    const S = this.S;
    ctx.textAlign = 'center';
    ctx.font = `500 ${Math.max(8, S * 0.2)}px ${this.mono}`;
    for (const b of post.bursts) {
      if (b.t < 0) continue;
      const e = easeOut(b.t);
      const x = post.sx + b.dx * S * (1 - e);
      const y = post.top - S * 0.1 + b.dy * S * (1 - e);
      ctx.fillStyle = rgba(this.C.outremer, 0.35 + 0.65 * (1 - b.t));
      ctx.fillText(b.ch, x, y);
    }
    ctx.textAlign = 'left';
  }

  private drawStamp(): void {
    const st = this.stampState;
    if (!st) return;
    const ctx = this.ctx;
    const k = Math.min(1, st.t / STAMP_IN);
    const scale = 1 + (1 - easeOut(k)) * 1.4;
    const out = st.t - STAMP_IN - STAMP_HOLD;
    const alpha = (out > 0 ? 1 - out / STAMP_OUT : 1) * Math.min(1, k * 1.5);
    const fs = Math.max(24, Math.min(64, this.W * 0.07));
    ctx.save();
    ctx.translate(this.W / 2, this.H * 0.42);
    ctx.rotate(-0.14);
    ctx.scale(scale, scale);
    ctx.globalAlpha = Math.max(0, alpha) * 0.92;
    ctx.font = `800 ${fs}px ${this.display}`;
    const w = ctx.measureText(st.label).width + fs * 0.9;
    const h = fs * 1.35;
    ctx.strokeStyle = rgba(this.C.ambre, 1);
    ctx.lineWidth = Math.max(3, fs * 0.08);
    this.round(-w / 2, -h / 2, w, h, fs * 0.18);
    ctx.stroke();
    ctx.lineWidth = Math.max(1, fs * 0.03);
    this.round(-w / 2 + fs * 0.12, -h / 2 + fs * 0.12, w - fs * 0.24, h - fs * 0.24, fs * 0.12);
    ctx.stroke();
    ctx.fillStyle = rgba(this.C.ambre, 1);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(st.label, 0, fs * 0.04);
    ctx.restore();
  }

  /** Prestige : une tache d'encre recouvre la dalle depuis le fauteuil, puis se retire. */
  private drawInk(): void {
    if (this.ink < 0) return;
    const ctx = this.ctx;
    const [cx, cy] = this.iso(0, 0);
    const maxR = Math.hypot(this.W, this.H);
    let r: number;
    let a: number;
    if (this.ink < INK_IN) {
      const k = easeOut(this.ink / INK_IN);
      r = maxR * k;
      a = 0.88 * k;
    } else {
      const k = (this.ink - INK_IN) / INK_OUT;
      r = maxR;
      a = 0.88 * (1 - easeOut(k));
    }
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(1, r));
    g.addColorStop(0, rgba(this.C.encre, a));
    g.addColorStop(0.75, rgba(this.C.encre, a * 0.85));
    g.addColorStop(1, rgba(this.C.encre, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, this.W, this.H);
  }

  private poly(points: Array<[number, number]>): void {
    const ctx = this.ctx;
    ctx.beginPath();
    points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
    ctx.closePath();
  }

  private drawSlab(): void {
    const ctx = this.ctx;
    const e = this.ext;
    const corners: Array<[number, number]> = [this.iso(-e, -e), this.iso(e, -e), this.iso(e, e), this.iso(-e, e)];
    ctx.save();
    ctx.shadowColor = rgba(this.C.encre, 0.16);
    ctx.shadowBlur = 50;
    ctx.shadowOffsetY = 22;
    ctx.fillStyle = rgba(this.slabTop, 1);
    this.poly(corners);
    ctx.fill();
    ctx.restore();

    // Tranches avant
    const ep = this.S * 0.18;
    const [c0, c1, c2, c3] = corners as [[number, number], [number, number], [number, number], [number, number]];
    ctx.fillStyle = rgba(this.slabL, 1);
    this.poly([c3, c2, [c2[0], c2[1] + ep], [c3[0], c3[1] + ep]]);
    ctx.fill();
    ctx.fillStyle = rgba(this.slabR, 1);
    this.poly([c2, c1, [c1[0], c1[1] + ep], [c2[0], c2[1] + ep]]);
    ctx.fill();
    void c0;

    // Quadrillage gravé
    ctx.strokeStyle = rgba(this.C.encre, 0.05);
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = -Math.floor(e * 2) / 2; x <= e; x += 0.5) {
      ctx.moveTo(...this.iso(x, -e)); ctx.lineTo(...this.iso(x, e));
    }
    for (let y = -Math.floor(e * 2) / 2; y <= e; y += 0.5) {
      ctx.moveTo(...this.iso(-e, y)); ctx.lineTo(...this.iso(e, y));
    }
    ctx.stroke();

    // Emplacements libres : un carré gravé là où un poste viendra
    ctx.strokeStyle = rgba(this.C.brume, 0.35);
    ctx.setLineDash([3, 4]);
    for (const post of this.posts) {
      if (post.count > 0) continue;
      if (Math.max(Math.abs(post.gx), Math.abs(post.gy)) + POST_HALF > e) continue;
      const w = POST_HALF;
      this.poly([this.iso(post.gx - w, post.gy - w), this.iso(post.gx + w, post.gy - w), this.iso(post.gx + w, post.gy + w), this.iso(post.gx - w, post.gy + w)]);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  /** Socle en volume : faces gauche, droite, dessus. Retourne le centre du dessus. */
  private block(gx: number, gy: number, half: number, h: number, top: Rgb, left: Rgb, right: Rgb, edge: string | null): [number, number] {
    const ctx = this.ctx;
    const P = (x: number, y: number, z: number) => this.iso(gx + x, gy + y, z);
    const A = P(-half, half, 0), B = P(half, half, 0), Cc = P(half, -half, 0);
    const At = P(-half, half, h), Bt = P(half, half, h), Ct = P(half, -half, h), Dt = P(-half, -half, h);
    ctx.fillStyle = rgba(left, 1);
    this.poly([A, B, Bt, At]); ctx.fill();
    ctx.fillStyle = rgba(right, 1);
    this.poly([B, Cc, Ct, Bt]); ctx.fill();
    const g = ctx.createLinearGradient(Dt[0], Dt[1], Bt[0], Bt[1]);
    g.addColorStop(0, rgba(mix(top, this.C.socle, 0.6), 1));
    g.addColorStop(1, rgba(top, 1));
    ctx.fillStyle = g;
    this.poly([Dt, Ct, Bt, At]); ctx.fill();
    if (edge) {
      ctx.strokeStyle = edge;
      ctx.lineWidth = 1.4;
      this.poly([Dt, Ct, Bt, At]); ctx.stroke();
    }
    return P(0, 0, h);
  }

  private drawPost(post: Post): void {
    if (post.count <= 0) return;
    const hovered = this.hovered === post.id;
    const lift = post.bounce > 0 ? Math.sin((1 - post.bounce / BOUNCE_TIME) * Math.PI) * 8 : 0;
    const centre = this.block(post.gx, post.gy, POST_HALF, POST_HEIGHT + lift, this.C.socle, this.faceL, this.faceR,
      rgba(this.C.outremer, hovered ? 0.95 : 0.5));
    post.sx = centre[0];
    post.sy = centre[1];
    post.top = centre[1];

    // Compteur posé sur la face avant
    const ctx = this.ctx;
    const [nx, ny] = this.iso(post.gx + POST_HALF * 0.5, post.gy + POST_HALF, POST_HEIGHT * 0.45);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `500 ${Math.max(10, this.S * 0.2)}px ${this.mono}`;
    ctx.fillStyle = rgba(this.C.encre, 0.75);
    ctx.fillText(`×${post.count}`, nx, ny);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';
  }

  private drawFounder(): void {
    const ctx = this.ctx;
    const hovered = this.hovered === 'founder';
    const [cx, cy] = this.block(0, 0, FOUNDER_HALF, FOUNDER_HEIGHT, this.goldTop, this.goldL, this.goldR,
      rgba(this.C.ambre, hovered ? 1 : 0.7));
    const S = this.S;

    // Fauteuil vide, vu de trois quarts : assise, dossier, deux pieds
    const z0 = FOUNDER_HEIGHT;
    const P = (x: number, y: number, z: number) => this.iso(x, y, z0 + z);
    const ink = rgba(this.C.encre, 0.85);
    ctx.lineWidth = Math.max(1, S * 0.03);
    ctx.lineJoin = 'round';
    ctx.strokeStyle = ink;
    // Pied central
    ctx.beginPath(); ctx.moveTo(...P(0, 0, 2)); ctx.lineTo(...P(0, 0, 13)); ctx.stroke();
    // Assise
    const s = 0.38;
    ctx.fillStyle = rgba(this.C.socle, 1);
    this.poly([P(-s, -s, 13), P(s, -s, 13), P(s, s, 13), P(-s, s, 13)]);
    ctx.fill(); ctx.stroke();
    // Dossier (côté fond)
    ctx.fillStyle = rgba(mix(this.C.socle, this.C.ambre, 0.12), 1);
    this.poly([P(-s, -s, 13), P(s, -s, 13), P(s, -s, 46), P(-s, -s, 46)]);
    ctx.fill(); ctx.stroke();

    // Multiplicateur écrit à la main sur le dossier
    if (this.prestigeCount > 0) {
      const [mx, my] = P(0, -s, 31);
      ctx.save();
      ctx.translate(mx, my);
      ctx.rotate(-0.12);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `800 ${Math.max(10, S * 0.22)}px ${this.display}`;
      ctx.fillStyle = rgba(this.C.ambre, 1);
      ctx.fillText(`×${this.founderMult.toFixed(2)}`, 0, 0);
      ctx.restore();
    }
    void cx; void cy;
  }

  private drawCloud(post: Post): void {
    if (!post.letters.length) return;
    const ctx = this.ctx;
    const S = this.S;
    const cx = post.sx, cy = post.top;
    const height = S * 1.5;
    const col = this.C.outremer;
    const t = this.time;

    // Lueur au cœur de la nuée
    const g = ctx.createRadialGradient(cx, cy - height * 0.5, 0, cx, cy - height * 0.5, S * 0.95);
    g.addColorStop(0, rgba(col, 0.13));
    g.addColorStop(1, rgba(col, 0));
    ctx.fillStyle = g;
    ctx.fillRect(cx - S, cy - height * 0.5 - S, S * 2, S * 2);

    ctx.textAlign = 'center';
    ctx.font = `500 ${Math.max(7, S * 0.17)}px ${this.mono}`;
    for (const l of post.letters) {
      const r = l.r * S * (0.55 + 0.1 * Math.sin(t * 0.8 + l.ph));
      const x = cx + Math.cos(l.a) * r;
      const y = cy - S * 0.15 - l.h * height + Math.sin(l.a) * r * 0.38 + Math.sin(t * 1.3 + l.ph) * 2;
      const depth = (Math.sin(l.a) + 1) / 2; // devant / derrière
      const alpha = (0.3 + 0.62 * depth) * Math.sin(Math.PI * Math.min(1, l.h * 1.1 + 0.02));
      ctx.fillStyle = rgba(col, alpha);
      ctx.fillText(l.ch, x, y);
    }
    ctx.textAlign = 'left';
  }

  private drawSheet(post: Post): void {
    const sh = post.sheet;
    if (!sh) return;
    const ctx = this.ctx;
    const S = this.S;
    const fs = Math.max(10, Math.min(14, S * 0.2));
    ctx.font = `500 ${fs}px ${this.mono}`;
    const charW = ctx.measureText('M').width;
    const fw = charW * sh.text.length + 26;
    const fh = fs * 2.1;
    let fx = post.sx - fw / 2;
    let fy = post.top - S * 1.85 - fh;
    fx = Math.max(8, Math.min(this.W - fw - 8, fx));
    fy = Math.max(30, fy);
    const fade = sh.hold < 0 ? Math.max(0, 1 + sh.hold / SHEET_FADE) : 1;

    ctx.save();
    ctx.globalAlpha = fade;
    ctx.shadowColor = rgba(this.C.encre, 0.14);
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = rgba(this.C.socle, 0.97);
    this.round(fx, fy, fw, fh, 7);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = fade;
    ctx.fillStyle = rgba(this.C.outremer, 0.9);
    ctx.fillRect(fx, fy + 6, 2.5, fh - 12);
    const tx = fx + 14;
    const ty = fy + fh / 2 + fs * 0.36;
    // Lettres déjà posées (celles en vol n'apparaissent qu'à l'arrivée)
    const flying = new Set(sh.flights.map(f => f.idx));
    ctx.fillStyle = rgba(this.C.encre, 1);
    for (let i = 0; i < sh.typed; i++) {
      if (flying.has(i)) continue;
      ctx.fillText(sh.text[i]!, tx + i * charW, ty);
    }
    // Curseur
    if (sh.typed < sh.text.length || (!this.reduced.matches && Math.sin(this.time * 6) > 0)) {
      ctx.fillStyle = rgba(this.C.outremer, 1);
      ctx.fillRect(tx + sh.typed * charW + 1, ty - fs * 0.85, 2, fs);
    }
    // Lettres en vol, de la nuée vers leur place
    for (const f of sh.flights) {
      const e = easeOut(f.t);
      const x = f.x0 + (tx + f.idx * charW - f.x0) * e;
      const y = f.y0 + (ty - f.y0) * e - Math.sin(e * Math.PI) * S * 0.4;
      ctx.fillStyle = rgba(this.C.outremer, 1 - f.t * 0.5);
      ctx.fillText(f.ch, x, y);
    }
    ctx.restore();
  }

  private round(x: number, y: number, w: number, h: number, r: number): void {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // ─── SURVOL / TOUCHER ───────────────────────────────────────

  private pick(e: PointerEvent, touch: boolean): void {
    const r = this.canvas.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const S = this.S;
    let found: string | null = null;
    let best = Infinity;
    const candidates: Array<{ id: string; sx: number; top: number }> = this.posts
      .filter(p => p.count > 0)
      .map(p => ({ id: p.id, sx: p.sx, top: p.top }));
    const [fx, fy] = this.iso(0, 0, FOUNDER_HEIGHT);
    candidates.push({ id: 'founder', sx: fx, top: fy });
    for (const c of candidates) {
      const dx = Math.abs(x - c.sx);
      const dy = y - c.top; // de -1.4 S (haut de la nuée) à +0.6 S (pied du socle)
      if (dx > S * 0.75 || dy < -S * 1.7 || dy > S * 0.8) continue;
      const d = dx + Math.abs(dy + S * 0.4) * 0.5;
      if (d < best) { best = d; found = c.id; }
    }
    this.setHover(found);
    if (touch) {
      if (this.touchTimer) clearTimeout(this.touchTimer);
      this.touchTimer = setTimeout(() => this.setHover(null), TOUCH_TIP_MS);
    }
  }

  private setHover(id: string | null): void {
    if (id === this.hovered) return;
    this.hovered = id;
    this.canvas.style.cursor = id ? 'help' : '';
    if (!id) { this.tooltip.classList.add('hidden'); return; }

    let title: string;
    let detail: string;
    let x: number;
    let y: number;
    if (id === 'founder') {
      title  = t('bureau.founder');
      detail = this.prestigeCount > 0 ? `×${this.founderMult.toFixed(2)}` : t('bureau.founderHint');
      [x, y] = this.iso(0, 0, FOUNDER_HEIGHT);
    } else {
      const post = this.posts.find(p => p.id === id)!;
      title  = post.name;
      detail = t(post.count > 1 ? 'bureau.agentsPl' : 'bureau.agents', { n: post.count });
      x = post.sx;
      y = post.top;
    }
    this.tooltip.innerHTML = '<strong></strong><span></span>';
    this.tooltip.querySelector('strong')!.textContent = title;
    this.tooltip.querySelector('span')!.textContent = detail;
    this.tooltip.classList.remove('hidden');
    const w = this.tooltip.offsetWidth;
    const left = Math.max(6, Math.min(this.W - w - 6, x - w / 2));
    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top  = `${Math.max(6, y + this.S * 0.55)}px`;
  }
}
