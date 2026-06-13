import Papa from 'papaparse';
import type { Member, Group, MemberStatus, DegreeType, Domain } from '../../types';

function int(value: string | undefined): number | null {
  if (!value) return null;
  const n = parseInt(value.trim(), 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function str(value: string | undefined): string {
  return (value ?? '').trim();
}

/** Like str(), but treats a literal "NA" as empty (for free-text fields the
 *  maintainers fill with NA when unknown). Enum fields keep their NA. */
function txt(value: string | undefined): string {
  const s = str(value);
  return s.toUpperCase() === 'NA' ? '' : s;
}

/** Parses the `members` CSV (Spec §13 Sheet 1) into typed Member rows. */
export function parseMembers(csv: string): Member[] {
  if (!csv.trim()) return [];
  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return data
    .filter((row) => str(row.name_en))
    .map((row) => ({
      name_en: str(row.name_en),
      name_zh: txt(row.name_zh),
      group: (str(row.group).toLowerCase() || 'ai') as Group,
      status: (str(row.status).toLowerCase() || 'current') as MemberStatus,
      degree_type: (str(row.degree_type).toLowerCase() || 'ms') as DegreeType,
      year_joined: int(row.year_joined),
      year_grad: int(row.year_grad),
      domain: (str(row.domain) || 'NA') as Domain,
      research_title_en: txt(row.research_title_en),
      research_title_zh: txt(row.research_title_zh),
      thesis_url: txt(row.thesis_url),
      email: txt(row.email),
      photo_filename: txt(row.photo_filename),
    }));
}
