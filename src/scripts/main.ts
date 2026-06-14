import { initNav } from './nav';
import { initLangToggle } from './langToggle';
import { initAnimations } from './animate';
import { bootstrapData } from './refresh';
import { LANG_KEY } from '../constants/sheets';

// Single client entry point. Everything wires up on `astro:page-load`, which
// fires on the initial load AND after every View Transitions navigation
// (Spec gap #4) — using DOMContentLoaded would break after the first nav.
function init(): void {
  initLangToggle();
  initNav();
  initAnimations();
  bootstrapData();
}

// View Transitions swaps in the next page's <html>, whose SSR default is
// data-lang="en" — that would reset the user's chosen language on every
// navigation. Re-apply the stored language to the incoming document *before*
// it swaps in, so there's no flash back to English.
document.addEventListener('astro:before-swap', (e) => {
  let lang = 'en';
  try {
    lang = localStorage.getItem(LANG_KEY) === 'zh' ? 'zh' : 'en';
  } catch {
    /* private mode — ignore */
  }
  const swapEvent = e as Event & { newDocument?: Document };
  swapEvent.newDocument?.documentElement.setAttribute('data-lang', lang);
});

document.addEventListener('astro:page-load', init);
