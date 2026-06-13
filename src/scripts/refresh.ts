import type { SheetData } from '../types';
import { DATA_ISLAND_ID } from '../constants/sheets';
import { fetchAllSheets, EMPTY_DATA } from '../lib/fetchSheets';

// Hybrid data flow (plan §"Key architectural pattern"):
//   1. Build bakes the parsed dataset into a <script type="application/json">.
//   2. On load we read that island and dispatch `cibi:data` so dynamic pages
//      can hydrate their interactive state instantly (no network).
//   3. We then re-fetch the CSVs in the background and, if the data changed,
//      dispatch `cibi:data` again so edits in Google Sheets appear without a
//      redeploy.
// Pages that have no dynamic data simply ignore the event.

export function getEmbeddedData(): SheetData {
  const el = document.getElementById(DATA_ISLAND_ID);
  if (!el?.textContent) return EMPTY_DATA;
  try {
    return JSON.parse(el.textContent) as SheetData;
  } catch {
    return EMPTY_DATA;
  }
}

function emit(data: SheetData): void {
  document.dispatchEvent(new CustomEvent<SheetData>('cibi:data', { detail: data }));
}

export function bootstrapData(): void {
  const embedded = getEmbeddedData();
  emit(embedded);

  // Skip the network round-trip if no CSV URLs are configured yet.
  void fetchAllSheets(true).then((fresh) => {
    const changed = JSON.stringify(fresh) !== JSON.stringify(embedded);
    const hasData =
      fresh.members.length || fresh.publications.length || fresh.gallery.length;
    if (changed && hasData) emit(fresh);
  });
}
