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

export function isOnSale(product) {
  if (!product) return false;
  return Array.isArray(product.badges) && product.badges.includes("badge4");
}

export function saleLabel(product) {
  return isOnSale(product) ? "akcija" : "";
}

export { cjenikMeta };
