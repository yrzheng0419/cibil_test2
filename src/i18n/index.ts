import type { Lang } from '../types';
import { en } from './en';
import { zh } from './zh';

/** Shape of the per-language UI string dictionary. */
export interface Strings {
  meta: { title: string; description: string };
  nav: {
    home: string;
    publications: string;
    research: string;
    team: string;
    activities: string;
  };
  hero: {
    eyebrow: string;
    h1: string[]; // one or more lines
    subtitle: string;
    body: string;
    ctaResearch: string;
    ctaTeam: string;
  };
  pi: {
    jointAppointments: string;
    education: string;
    interests: string;
    courses: string;
    contact: string;
  };
  publications: { heading: string };
  research: {
    heading: string;
    recentPublications: string;
    recentTheses: string;
    empty: string;
  };
  team: {
    heading: string;
    msc: string;
    phd: string;
    alumni: string;
    ra: string;
  };
  activities: {
    heading: string;
    academic: string;
    extracurricular: string;
  };
  notFound: { title: string; message: string; back: string };
}

export const dicts: Record<Lang, Strings> = { en, zh };

/** Returns the string dictionary for a language. */
export function t(lang: Lang): Strings {
  return dicts[lang];
}

export { en, zh };
