/**
 * Tutorial — 4 étapes non-bloquantes pour les nouveaux joueurs.
 * Chaque étape met en avant un élément de l'UI avec un tooltip positionné.
 */

interface Step {
  title:   string;
  text:    string;
  target:  string | null; // ID de l'élément à highlight
  next:    string;
}

const STEPS: Step[] = [
  {
    title:  '👋 Bienvenue dans Bot Empire !',
    text:   'Tu viens de fonder ton agence IA. Commence seul dans ta chambre d\'ado — et scale jusqu\'au siège social d\'unicorn.',
    target: null,
    next:   'Allons-y !',
  },
  {
    title:  '⚡ Exécute ta première tâche',
    text:   'Clique ici pour gagner tes premières €. Chaque clic = mission livrée = argent.',
    target: 'btn-click',
    next:   'Compris →',
  },
  {
    title:  '🤖 Recrute tes premiers agents',
    text:   'Les agents travaillent 24h/24, même quand tu dors. Commence par un Bot Workflows — il automatise tout.',
    target: 'panel-right',
    next:   'Voir les agents →',
  },
  {
    title:  '🏢 Ton bureau évolue avec toi',
    text:   'Regarde ici ! Chaque agent recruté apparaît dans ton bureau. Chambre → Home Office → Startup → Unicorn.',
    target: 'bureau',
    next:   'Let\'s go ! 🚀',
  },
];

const TUTORIAL_KEY = 'tuto-done';
const CARD_W       = 300;

export class Tutorial {
  private step    = 0;
  private overlay: HTMLElement;
  private card:    HTMLElement;
  private titleEl: HTMLElement;
  private textEl:  HTMLElement;
  private nextBtn: HTMLButtonElement;
  private skipBtn: HTMLButtonElement;
  private stepLbl: HTMLElement;
  private active  = false;

  constructor() {
    this.overlay = document.getElementById('tutorial-overlay')!;
    this.card    = document.getElementById('tuto-card')!;
    this.titleEl = document.getElementById('tuto-title')!;
    this.textEl  = document.getElementById('tuto-text')!;
    this.nextBtn = document.getElementById('tuto-next')   as HTMLButtonElement;
    this.skipBtn = document.getElementById('tuto-skip')   as HTMLButtonElement;
    this.stepLbl = document.getElementById('tuto-step')!;

    this.nextBtn.addEventListener('click', () => this.next());
    this.skipBtn.addEventListener('click', () => this.complete());
  }

  shouldStart(): boolean { return !localStorage.getItem(TUTORIAL_KEY); }

  start(): void {
    if (!this.shouldStart()) return;
    this.active = true;
    this.step   = 0;
    this.overlay.classList.remove('hidden');
    this.render();
  }

  isActive(): boolean { return this.active; }

  private render(): void {
    const s = STEPS[this.step];
    if (!s) { this.complete(); return; }

    this.titleEl.textContent = s.title;
    this.textEl.textContent  = s.text;
    this.nextBtn.textContent = s.next;
    this.stepLbl.textContent = `${this.step + 1} / ${STEPS.length}`;

    // Highlight
    document.querySelectorAll('.tuto-hl').forEach(el => el.classList.remove('tuto-hl'));
    if (s.target) document.getElementById(s.target)?.classList.add('tuto-hl');

    this.positionCard(s.target);
  }

  private positionCard(targetId: string | null): void {
    if (!targetId) {
      this.card.style.cssText = `position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:${CARD_W}px`;
      return;
    }
    const el = document.getElementById(targetId);
    if (!el) { this.positionCard(null); return; }

    const r  = el.getBoundingClientRect();
    const w  = window.innerWidth;
    const h  = window.innerHeight;
    const gap = 14;
    const cardH = 200;

    let top: number;
    // Préférer en dessous si assez de place, sinon au-dessus
    if (r.bottom + cardH + gap < h) top = r.bottom + gap;
    else top = Math.max(gap, r.top - cardH - gap);

    let left = r.left + r.width / 2 - CARD_W / 2;
    left = Math.max(gap, Math.min(left, w - CARD_W - gap));

    this.card.style.cssText = `position:fixed;top:${top}px;left:${left}px;width:${CARD_W}px`;
  }

  next(): void {
    this.step++;
    if (this.step >= STEPS.length) this.complete();
    else this.render();
  }

  private complete(): void {
    this.active = false;
    this.overlay.classList.add('hidden');
    document.querySelectorAll('.tuto-hl').forEach(el => el.classList.remove('tuto-hl'));
    localStorage.setItem(TUTORIAL_KEY, '1');
  }
}
