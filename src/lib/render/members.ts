import type { Lang, Member, Group, DegreeType } from '../../types';
import { escapeHtml, pickField, assetUrl } from '../dom';

// Shared renderer for Team page cards (Spec §9).

export type TeamSection = 'msc' | 'phd' | 'alumni' | 'ra';

const GROUP_META: Record<Group, { label: string; cls: string }> = {
  ai: { label: 'AI', cls: 'pill-ai' },
  statistics: { label: 'Statistics', cls: 'pill-statistics' },
  ra: { label: 'RA', cls: 'pill-ra' },
};

const DEGREE_LABEL: Record<DegreeType, string> = {
  ms: 'MSc',
  phd: 'PhD',
  ra: 'RA',
};

function photo(m: Member): string {
  const src = assetUrl('members', m.photo_filename, 'default.png');
  const fallback = assetUrl('members', '', 'default.png');
  const alt = escapeHtml(m.name_en);
  return `<div class="aspect-[3/4] w-full overflow-hidden rounded-lg bg-brand-wash">
      <img src="${src}" alt="${alt}" class="h-full w-full object-cover" loading="lazy" onerror="this.onerror=null;this.src='${fallback}'">
    </div>`;
}

function currentCard(m: Member, lang: Lang): string {
  const g = GROUP_META[m.group];
  const name = escapeHtml(pickField(m.name_en, m.name_zh, lang));
  const title = escapeHtml(pickField(m.research_title_en, m.research_title_zh, lang));
  const email = m.email
    ? `<a href="mailto:${escapeHtml(m.email)}" class="mt-1 block truncate text-xs text-brand-mid transition-colors hover:text-brand">${escapeHtml(m.email)}</a>`
    : '';
  return `<div class="w-[120px] shrink-0">
      ${photo(m)}
      <p class="mt-2 text-sm font-medium text-heading">${name}</p>
      <span class="pill-group ${g.cls} mt-1">${g.label}</span>
      <p class="mt-1 text-xs leading-snug text-body">${title}</p>
      ${email}
    </div>`;
}

function alumniCard(m: Member, lang: Lang): string {
  const g = GROUP_META[m.group];
  const name = escapeHtml(pickField(m.name_en, m.name_zh, lang));
  const title = escapeHtml(pickField(m.research_title_en, m.research_title_zh, lang));
  const yr = m.year_grad ? ` ’${String(m.year_grad).slice(-2)}` : '';
  const hasUrl = m.thesis_url && m.thesis_url !== 'NA';
  const titleHtml = hasUrl
    ? `<a href="${escapeHtml(m.thesis_url)}" target="_blank" rel="noopener" class="text-brand-mid underline-offset-2 transition-colors hover:text-brand hover:underline">${title}</a>`
    : title;
  return `<div class="w-[140px] shrink-0">
      ${photo(m)}
      <p class="mt-2 text-sm font-medium text-heading">${name}<span class="font-normal text-muted">${yr}</span></p>
      <div class="mt-1 flex flex-wrap gap-1">
        <span class="pill-neutral">${DEGREE_LABEL[m.degree_type]}</span>
        <span class="pill-group ${g.cls}">${g.label}</span>
      </div>
      <p class="mt-1 text-xs leading-snug text-body">${titleHtml}</p>
    </div>`;
}

export function renderMembers(members: Member[], section: TeamSection, lang: Lang): string {
  let list: Member[];
  switch (section) {
    case 'msc':
      list = members
        .filter((m) => m.status === 'current' && m.degree_type === 'ms')
        .sort((a, b) => (a.year_joined ?? 0) - (b.year_joined ?? 0));
      break;
    case 'phd':
      list = members
        .filter((m) => m.status === 'current' && m.degree_type === 'phd')
        .sort((a, b) => (a.year_joined ?? 0) - (b.year_joined ?? 0));
      break;
    case 'alumni':
      list = members
        .filter((m) => m.status === 'alumni')
        .sort((a, b) => (b.year_grad ?? 0) - (a.year_grad ?? 0));
      break;
    default: // ra
      list = members.filter((m) => m.status === 'current' && m.degree_type === 'ra');
  }

  if (!list.length) {
    return `<p class="py-2 text-sm text-muted">${lang === 'zh' ? '尚無資料' : 'No records yet'}</p>`;
  }
  const card = section === 'alumni' ? alumniCard : currentCard;
  return list.map((m) => card(m, lang)).join('');
}
