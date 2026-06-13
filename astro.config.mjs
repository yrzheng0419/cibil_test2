// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// GitHub Pages *project* page for repo yrzheng0419/cibil_test2, served from
//   https://yrzheng0419.github.io/cibil_test2/
// Rule: site = https://<user>.github.io ; base = /<repo-name>.
// (If you later add a custom domain or rename the repo, update these.)
// All internal links and public/assets URLs go through withBase() in src/lib/dom.ts.
export default defineConfig({
  site: 'https://yrzheng0419.github.io',
  base: '/cibil_test2',
  output: 'static',
  trailingSlash: 'ignore',
  vite: {
    plugins: [tailwindcss()],
  },
});
