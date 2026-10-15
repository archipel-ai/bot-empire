import { t } from '../i18n/i18n.ts';

/**
 * Drawer — sur téléphone, le panneau d'onglets est un tiroir posé sous la scène.
 * On le fait glisser (ou on touche la poignée) pour l'agrandir par-dessus la scène,
 * puis le redescendre. Sur ordinateur, il ne fait rien : le panneau est une colonne.
 */

/** Doit rester identique à la requête « TÉLÉPHONE » de style.css. */
export const PHONE_QUERY = '(max-width: 899px) and (orientation: portrait), (max-width: 639px)';

const FULL_GAP     = 8;  // px entre la barre du haut et le tiroir agrandi
const HALF_GAP     = 8;  // px entre la scène et le tiroir replié
const TAP_SLOP     = 6;  // px : en deçà, le geste est un toucher, pas un glissement

export class Drawer {
  private panel  = document.getElementById('panel')!;
  private handle = document.getElementById('drawer-handle') as HTMLButtonElement;
  private stage  = document.getElementById('stage')!;
  private header = document.getElementById('header')!;
  private phone  = window.matchMedia(PHONE_QUERY);
  private expanded = false;

  private dragStartY   = 0;
  private dragStartTop = 0;
  private dragMoved    = false;
  private dragging     = false;

  constructor() {
    this.handle.addEventListener('pointerdown', (e) => this.onDown(e));
    this.handle.addEventListener('pointermove', (e) => this.onMove(e));
    this.handle.addEventListener('pointerup',   (e) => this.onUp(e));
    this.handle.addEventListener('pointercancel', () => this.onCancel());
    this.handle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.setExpanded(!this.expanded); }
    });

    this.phone.addEventListener('change', () => this.layout());
    const ro = new ResizeObserver(() => this.layout());
    ro.observe(this.stage);
    ro.observe(this.header);
    const banner = document.getElementById('market-banner');
    if (banner) ro.observe(banner);
    window.addEventListener('resize', () => this.layout());
    this.layout();
  }

  /** Replie le tiroir (utile quand le joueur revient vers la scène). */
  collapse(): void { this.setExpanded(false); }

  private setExpanded(value: boolean): void {
    this.expanded = value;
    this.layout();
  }

  private fullTop(): number { return this.header.getBoundingClientRect().bottom + FULL_GAP; }
  private halfTop(): number { return this.stage.getBoundingClientRect().bottom + HALF_GAP; }

  /** Recale le tiroir selon l'état et la taille de l'écran. */
  layout(): void {
    if (!this.phone.matches) {
      this.panel.style.top = '';
      this.handle.setAttribute('aria-expanded', 'true');
      return;
    }
    if (this.dragging) return;
    this.panel.style.top = `${Math.round(this.expanded ? this.fullTop() : this.halfTop())}px`;
    this.handle.setAttribute('aria-expanded', String(this.expanded));
    this.handle.setAttribute('aria-label', t(this.expanded ? 'panel.collapse' : 'panel.expand'));
  }

  private onDown(e: PointerEvent): void {
    if (!this.phone.matches) return;
    this.dragging     = true;
    this.dragMoved    = false;
    this.dragStartY   = e.clientY;
    this.dragStartTop = this.panel.getBoundingClientRect().top;
    this.handle.setPointerCapture(e.pointerId);
    this.panel.classList.add('dragging');
  }

  private onMove(e: PointerEvent): void {
    if (!this.dragging) return;
    const dy = e.clientY - this.dragStartY;
    if (Math.abs(dy) > TAP_SLOP) this.dragMoved = true;
    const top = Math.min(this.halfTop(), Math.max(this.fullTop(), this.dragStartTop + dy));
    this.panel.style.top = `${Math.round(top)}px`;
  }

  private onUp(e: PointerEvent): void {
    if (!this.dragging) return;
    this.dragging = false;
    this.panel.classList.remove('dragging');
    if (this.handle.hasPointerCapture(e.pointerId)) this.handle.releasePointerCapture(e.pointerId);
    if (!this.dragMoved) {
      this.setExpanded(!this.expanded);
      return;
    }
    const top = this.panel.getBoundingClientRect().top;
    this.setExpanded(top < (this.fullTop() + this.halfTop()) / 2);
  }

  private onCancel(): void {
    this.dragging = false;
    this.panel.classList.remove('dragging');
    this.layout();
  }
}
