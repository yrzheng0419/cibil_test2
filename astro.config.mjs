// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// NOTE: `site` + `base` target a GitHub Pages *project* page served from /cibi-lab/.
// Update both to the real org/repo before the first deploy (Spec §17 outstanding item).
// All internal links and public/assets URLs must go through withBase() in src/lib/dom.ts.
export default defineConfig({
  site: 'https://YOUR-ORG.github.io',
  base: '/cibi-lab',
  output: 'static',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
