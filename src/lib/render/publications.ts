import type { Lang, Publication, Domain } from '../../types';
import { DOMAIN_TAG_CLASS } from '../../types';
import { escapeHtml } from '../dom';

// Shared renderer (build + client). Produces an HTML string for the
// year-grouped publication list (Spec §7). Citations are rendered verbatim;
// a DOI wraps the citation in a link.

function domainTag(domain: Domain): string {
  const cls = DOMAIN_TAG_CLASS[domain as Exclude<Domain, 'NA'>];
  if (!cls) return '';
  return `<span class="tag ${cls} self-start">${escapeHtml(domain)}</span>`;
}

function row(p: Publication): string {
  const badgeCls =
    p.pub_type === 'journal' ? 'pub-badge-journal' : 'pub-badge-conference';
  const badgeTxt = p.pub_type === 'journal' ? 'J' : 'C';
  const cite = escapeHtml(p.citation);
  const citeHtml = p.doi
    ? `<a href="${escapeHtml(p.doi)}" target="_blank" rel="noopener" class="transition-colors hover:text-brand">${cite}</a>`
    : cite;
  return `<div class="flex items-start gap-3 border-b border-brand-light/50 py-3">
      <span class="pub-badge ${badgeCls} mt-0.5">${badgeTxt}</span>
      <p class="citation flex-1 text-body">${citeHtml}</p>
      ${domainTag(p.domain)}
    </div>`;
}

export function renderPublications(pubs: Publication[], lang: Lang): string {
  if (!pubs.length) {
    const msg = lang === 'zh' ? '尚無資料' : 'No records yet';
    return `<p class="py-8 text-muted">${msg}</p>`;
  }

  const byYear = new Map<number, Publication[]>();
  for (const p of pubs) {
    const arr = byYear.get(p.year);
    if (arr) arr.push(p);
    else byYear.set(p.year, [p]);
  }
  const years = [...byYear.keys()].sort((a, b) => b - a);

  return years
    .map(
      (y) => `<section class="mb-10">
        <h2 class="mb-2 font-mono text-lg font-medium text-brand-mid">${y}</h2>
        ${byYear.get(y)!.map(row).join('')}
      </section>`,
    )
    .join('');
}
