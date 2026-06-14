import type { Lang, Publication, Member, Domain } from '../../types';
import type { ResearchBlock, BiPair } from '../../i18n/content';
import { escapeHtml, pickField, assetUrl } from '../dom';

// Shared renderers for the Research page domain panels (Spec §8).

function emptyState(lang: Lang): string {
  return `<p class="py-4 text-sm text-muted">${lang === 'zh' ? '尚無資料' : 'No records yet'}</p>`;
}

// --- Domain content blocks (text / image / video) ---------------------------
// Rendered statically with both languages inline; CSS (.lang-en/.lang-zh)
// toggles them, so no client re-render is needed for language.

function biSpans(en: string, zh: string): string {
  const e = escapeHtml(en);
  const z = escapeHtml(zh && zh.trim() ? zh : en);
  return `<span class="lang-en">${e}</span><span class="lang-zh">${z}</span>`;
}

function caption(cap: BiPair | undefined): string {
  if (!cap) return '';
  return `<figcaption>${biSpans(cap.en, cap.zh)}</figcaption>`;
}

export function renderDomainBlocks(blocks: ResearchBlock[]): string {
  return blocks
    .map((b) => {
      if (b.type === 'text') {
        return `<p class="research-text">${biSpans(b.en, b.zh)}</p>`;
      }
      if (b.type === 'image') {
        const alt = escapeHtml(b.alt ?? '');
        return `<figure class="research-media">
          <img src="${assetUrl('research', b.src, '')}" alt="${alt}" loading="lazy">
          ${caption(b.caption)}
        </figure>`;
      }
      // video — embed a YouTube player by id
      const id = encodeURIComponent(b.youtube);
      return `<figure class="research-media">
        <div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video" loading="lazy" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
        ${caption(b.caption)}
      </figure>`;
    })
    .join('');
}

/** Latest `limit` publications for a domain (newest first). */
export function renderRecentPublications(
  pubs: Publication[],
  domain: Domain,
  lang: Lang,
  limit = 3,
): string {
  const items = pubs
    .filter((p) => p.domain === domain)
    .sort((a, b) => b.year - a.year)
    .slice(0, limit);
  if (!items.length) return emptyState(lang);

  return items
    .map((p) => {
      const cite = escapeHtml(p.citation);
      const c = p.doi
        ? `<a href="${escapeHtml(p.doi)}" target="_blank" rel="noopener" class="transition-colors hover:text-brand">${cite}</a>`
        : cite;
      return `<div class="border-b border-brand-light/50 py-2.5">
        <p class="citation text-sm text-body">${c}</p>
        <p class="mt-0.5 font-mono text-xs text-muted">${p.year}</p>
      </div>`;
    })
    .join('');
}

/** Latest `limit` alumni theses for a domain (by year_grad desc). */
export function renderRecentTheses(
  members: Member[],
  domain: Domain,
  lang: Lang,
  limit = 3,
): string {
  const items = members
    .filter((m) => m.status === 'alumni' && m.domain === domain)
    .sort((a, b) => (b.year_grad ?? 0) - (a.year_grad ?? 0))
    .slice(0, limit);
  if (!items.length) return emptyState(lang);

  return items
    .map((m) => {
      const name = escapeHtml(pickField(m.name_en, m.name_zh, lang));
      const title = escapeHtml(
        pickField(m.research_title_en, m.research_title_zh, lang),
      );
      const hasUrl = m.thesis_url && m.thesis_url !== 'NA';
      const titleHtml = hasUrl
        ? `<a href="${escapeHtml(m.thesis_url)}" target="_blank" rel="noopener" class="underline-offset-2 transition-colors hover:text-brand hover:underline">${title}</a>`
        : title;
      const yr = m.year_grad ? ` ’${String(m.year_grad).slice(-2)}` : '';
      return `<div class="border-b border-brand-light/50 py-2.5">
        <p class="text-sm font-medium text-heading">${name}<span class="font-normal text-muted">${yr}</span></p>
        <p class="text-sm text-body">${titleHtml}</p>
      </div>`;
    })
    .join('');
}
