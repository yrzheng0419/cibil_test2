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
      name_zh: str(row.name_zh),
      group: (str(row.group).toLowerCase() || 'ai') as Group,
      status: (str(row.status).toLowerCase() || 'current') as MemberStatus,
      degree_type: (str(row.degree_type).toLowerCase() || 'ms') as DegreeType,
      year_joined: int(row.year_joined),
      year_grad: int(row.year_grad),
      domain: (str(row.domain) || 'NA') as Domain,
      research_title_en: str(row.research_title_en),
      research_title_zh: str(row.research_title_zh),
      thesis_url: str(row.thesis_url),
      email: str(row.email),
      photo_filename: str(row.photo_filename),
    }));
}
