import { cjenikMeta } from "./config.js";

const euro = new Intl.NumberFormat("hr-HR", {
  style: "currency",
  currency: "EUR",
});

export function formatEuro(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  return euro.format(n);
}

export function hasAmount(value) {
  if (value === "" || value == null) return false;
  return Number.isFinite(Number(value));
}

export function hasPrice(product) {
  return product != null && hasAmount(product.price);
}

/** Datum uz cijenu na dan. Prazno polje znači 10. 9. 2026. */
export function cijenaDatum(product) {
  return formatCijenaDatum(product?.baznaDatum) || cjenikMeta.cijenaNaDan;
}

export function formatCijenaDatum(value) {
  if (value == null || value === "") return "";
  const s = String(value).trim();
  const hr = s.match(/^(\d{1,2})\.\s*(\d{1,2})\.\s*(\d{4})\.?$/);
  if (hr) return `${Number(hr[1])}. ${Number(hr[2])}. ${hr[3]}.`;
  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${Number(iso[3])}. ${Number(iso[2])}. ${iso[1]}.`;
  return s;
}

export { cjenikMeta };
