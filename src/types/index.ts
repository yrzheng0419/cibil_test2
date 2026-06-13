// Shared type definitions — mirrors the Google Sheets schema (Spec §13).

export type Lang = 'en' | 'zh';

export type Domain =
  | 'Medical Image'
  | 'Smart Agriculture'
  | 'Medical Data'
  | 'Biosensing'
  | 'NA';

export type Group = 'ai' | 'statistics' | 'ra';
export type MemberStatus = 'current' | 'alumni';
export type DegreeType = 'ms' | 'phd' | 'ra';
export type PubType = 'journal' | 'conference';
export type GalleryType = 'academic' | 'extracurricular';

/** Sheet 1: members */
export interface Member {
  name_en: string;
  name_zh: string;
  group: Group;
  status: MemberStatus;
  degree_type: DegreeType;
  year_joined: number | null;
  year_grad: number | null;
  domain: Domain;
  research_title_en: string;
  research_title_zh: string;
  thesis_url: string; // '' or 'NA' -> no link
  email: string;
  photo_filename: string; // '' -> default.jpg
}

/** Sheet 2: publications */
export interface Publication {
  year: number;
  pub_type: PubType;
  domain: Domain;
  citation: string;
  doi: string; // '' -> no link
}

/** Sheet 3: gallery (one row per photo) */
export interface GalleryItem {
  date: string; // YYYY-MM-DD
  type: GalleryType;
  title_en: string;
  title_zh: string;
  remark: string; // 'NA' -> none
  photo_filename: string;
}

export interface SheetData {
  members: Member[];
  publications: Publication[];
  gallery: GalleryItem[];
}

/** The four content domains (excludes 'NA'), in canonical order. */
export const DOMAINS: Exclude<Domain, 'NA'>[] = [
  'Medical Image',
  'Smart Agriculture',
  'Medical Data',
  'Biosensing',
];

/** Maps a domain to its CSS pill class (Spec §9). */
export const DOMAIN_TAG_CLASS: Record<Exclude<Domain, 'NA'>, string> = {
  'Medical Image': 'tag-medical',
  'Smart Agriculture': 'tag-agri',
  'Medical Data': 'tag-data',
  Biosensing: 'tag-biosense',
};
