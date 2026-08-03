/**
 * Resolve a product text field for the active locale.
 * Falls back to Croatian when the English value is missing/empty.
 */
export function productText(product, field, locale) {
  if (!product) return "";
  if (locale === "en") {
    const en = product[`${field}En`];
    if (en != null && String(en).trim() !== "") return String(en);
  }
  const hr = product[field];
  return hr == null ? "" : String(hr);
}

/** Match search query against HR + EN name (and optional description). */
export function productMatchesQuery(product, query) {
  const q = String(query || "")
    .trim()
    .toLowerCase();
  if (!q) return true;
  const haystack = [
    product.name,
    product.nameEn,
    product.subheading,
    product.subheadingEn,
  ]
    .filter(Boolean)
    .map((s) => String(s).toLowerCase());
  return haystack.some((s) => s.includes(q));
}
