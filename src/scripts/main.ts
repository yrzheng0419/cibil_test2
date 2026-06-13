import { initNav } from './nav';
import { initLangToggle } from './langToggle';
import { initAnimations } from './animate';
import { bootstrapData } from './refresh';

// Single client entry point. Everything wires up on `astro:page-load`, which
// fires on the initial load AND after every View Transitions navigation
// (Spec gap #4) — using DOMContentLoaded would break after the first nav.
function init(): void {
  initLangToggle();
  initNav();
  initAnimations();
  bootstrapData();
}

document.addEventListener('astro:page-load', init);
