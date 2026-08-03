/**
 * Site catalog — products loaded from Decap CMS folder collection.
 * Each entry is a JSON file under src/content/products/.
 */

const productModules = import.meta.glob("./content/products/*.json", {
  eager: true,
});

function toIdList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "object" && item != null ? item.id ?? item.productId : item))
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id));
}

function normalizeSizes(sizes) {
  if (Array.isArray(sizes)) return sizes.map(String).join(", ");
  if (sizes == null) return "";
  return String(sizes);
}

function normalizeDeclaration(declaration) {
  const d = declaration && typeof declaration === "object" ? declaration : {};
  return {
    text: d.text != null ? String(d.text) : "",
    textEn: d.textEn != null ? String(d.textEn) : "",
    showStandardsImage: Boolean(d.showStandardsImage),
    careIcons: Array.isArray(d.careIcons)
      ? d.careIcons.map(String).filter(Boolean)
      : [],
  };
}

function normalizeProduct(product) {
  return {
    ...product,
    categories: toIdList(product.categories),
    similarItems: toIdList(product.similarItems),
    bundleItems: toIdList(product.bundleItems),
    sizes: normalizeSizes(product.sizes),
    declaration: normalizeDeclaration(product.declaration),
    badges: Array.isArray(product.badges) ? product.badges.map(String) : [],
    nameEn: product.nameEn != null ? String(product.nameEn) : "",
    subheadingEn: product.subheadingEn != null ? String(product.subheadingEn) : "",
    descriptionEn:
      product.descriptionEn != null ? String(product.descriptionEn) : "",
  };
}

function loadEntries(modules, normalize) {
  return Object.values(modules)
    .map((mod) => (normalize ? normalize(mod.default) : mod.default))
    .sort((a, b) => Number(a.id) - Number(b.id));
}

const catalog = {
  data: loadEntries(productModules, normalizeProduct),
};

export default catalog;
