import Papa from 'papaparse';
import type { Publication, PubType, Domain } from '../../types';

function str(value: string | undefined): string {
  return (value ?? '').trim();
}

/** Parses the `publications` CSV (Spec §13 Sheet 2). The `citation` field is
 *  free text with commas/quotes — PapaParse handles RFC-4180 quoting. */
export function parsePublications(csv: string): Publication[] {
  if (!csv.trim()) return [];
  const { data } = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return data
    .filter((row) => str(row.citation))
    .map((row) => ({
      year: parseInt(str(row.year), 10) || 0,
      pub_type: (str(row.pub_type).toLowerCase() || 'journal') as PubType,
      domain: (str(row.domain) || 'NA') as Domain,
      citation: str(row.citation),
      doi: str(row.doi),
    }));
}
