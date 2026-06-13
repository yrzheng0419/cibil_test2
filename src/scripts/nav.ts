// Navbar scroll behaviour (Spec §4): add `.scrolled` once the user scrolls
// past the hero so CSS can apply the blur + translucent wash.

const SCROLL_THRESHOLD = 80;

let onScroll: (() => void) | null = null;

export function initNav(): void {
  const nav = document.querySelector<HTMLElement>('.site-nav');
  if (!nav) return;

  // Detach any listener from a previous page (View Transitions navigation).
  if (onScroll) window.removeEventListener('scroll', onScroll);

  onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
