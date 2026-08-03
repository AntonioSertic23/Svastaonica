/**
 * Site catalog — products & blogs loaded from Decap CMS folder collections.
 * Each entry is a JSON file under src/content/{products|blogs}/.
 */

const productModules = import.meta.glob("./content/products/*.json", {
  eager: true,
});
const blogModules = import.meta.glob("./content/blogs/*.json", { eager: true });

function toIdList(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "object" && item != null ? item.id ?? item.productId : item))
    .map((id) => Number(id))
    .filter((id) => Number.isFinite(id));
}

function normalizeProduct(product) {
  return {
    ...product,
    categories: toIdList(product.categories),
    similarItems: toIdList(product.similarItems),
    bundleItems: toIdList(product.bundleItems),
    bundle: toIdList(product.bundle),
    sizes: Array.isArray(product.sizes) ? product.sizes.map(String) : [],
    badges: Array.isArray(product.badges) ? product.badges.map(String) : [],
  };
}

function loadEntries(modules, normalize) {
  return Object.values(modules)
    .map((mod) => (normalize ? normalize(mod.default) : mod.default))
    .sort((a, b) => Number(a.id) - Number(b.id));
}

const catalog = {
  data: loadEntries(productModules, normalizeProduct),
  blogs: loadEntries(blogModules),
};

export default catalog;
