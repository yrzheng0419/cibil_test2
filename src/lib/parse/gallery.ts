import Papa from 'papaparse';
import type { GalleryItem, GalleryType } from '../../types';

function str(value: string | undefined): string {
  return (value ?? '').trim();
}

/** Treats a literal "NA" as empty for free-text fields. */
function txt(value: string | undefined): string {
  const s = str(value);
  return s.toUpperCase() === 'NA' ? '' : s;
}

/** Parses the `gallery` CSV (Spec §13 Sheet 3). One row per photo. */
export function parseGallery(csv: string): GalleryItem[] {
  if (!csv.trim()) return [];
  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return data
    .filter((row) => str(row.date) && str(row.title_en))
    .map((row) => ({
      date: str(row.date),
      type: (str(row.type).toLowerCase() || 'academic') as GalleryType,
      title_en: str(row.title_en),
      title_zh: txt(row.title_zh),
      remark: txt(row.remark),
      photo_filename: txt(row.photo_filename),
    }));
}
