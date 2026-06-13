import Papa from 'papaparse';
import type { GalleryItem, GalleryType } from '../../types';

function str(value: string | undefined): string {
  return (value ?? '').trim();
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
      title_zh: str(row.title_zh),
      remark: str(row.remark),
      photo_filename: str(row.photo_filename),
    }));
}
