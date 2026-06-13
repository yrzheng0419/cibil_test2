import { animate, stagger } from 'animejs';

// Scroll-reveal via Intersection Observer (threshold 0.15) + Anime.js (Spec §12).
//
// Markup contract:
//   <el data-animate data-anim-y="20" data-anim-duration="600">  standalone
//   <group data-stagger="80" data-anim-x="-16">                  staggered container
//       <child data-animate> ... </child>
// Container children carry [data-animate]; the container animates them together
// with a per-item stagger. Initial hidden state is set in global.css.

interface AnimProps {
  opacity: [number, number];
  duration: number;
  ease: string;
  translateY?: [number, number];
  translateX?: [number, number];
  scale?: [number, number];
}

function propsFrom(el: HTMLElement): AnimProps {
  const d = el.dataset;
  const y = parseFloat(d.animY ?? '16');
  const x = parseFloat(d.animX ?? '0');
  const scale = d.animScale ? parseFloat(d.animScale) : null;
  const props: AnimProps = {
    opacity: [0, 1],
    duration: parseFloat(d.animDuration ?? '500'),
    ease: 'outQuad',
  };
  if (y) props.translateY = [y, 0];
  if (x) props.translateX = [x, 0];
  if (scale !== null) props.scale = [scale, 1];
  return props;
}

let observer: IntersectionObserver | null = null;

export function initAnimations(): void {
  // Reduced-motion: reveal everything, skip animation.
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const groups = Array.from(
    document.querySelectorAll<HTMLElement>('[data-stagger]'),
  );
  const solo = Array.from(
    document.querySelectorAll<HTMLElement>('[data-animate]'),
  ).filter((el) => !el.closest('[data-stagger]'));

  if (reduce) {
    [...groups.flatMap((g) => Array.from(g.querySelectorAll<HTMLElement>('[data-animate]'))), ...solo].forEach(
      (el) => (el.style.opacity = '1'),
    );
    return;
  }

  observer?.disconnect();
  observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        obs.unobserve(el);

        if (el.dataset.stagger !== undefined) {
          const items = el.querySelectorAll<HTMLElement>('[data-animate]');
          if (items.length === 0) continue;
          animate(items, {
            ...propsFrom(el),
            delay: stagger(parseFloat(el.dataset.stagger || '80')),
          });
        } else {
          animate(el, propsFrom(el));
        }
      }
    },
    { threshold: 0.15 },
  );

  [...groups, ...solo].forEach((el) => observer!.observe(el));
}
