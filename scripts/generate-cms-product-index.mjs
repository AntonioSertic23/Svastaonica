/**
 * Build public/admin/data/products.json for the CMS product-multiselect widget.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productsDir = path.join(root, "src/content/products");
const outDir = path.join(root, "public/admin/data");
const outFile = path.join(outDir, "products.json");

const files = fs.readdirSync(productsDir).filter((f) => f.endsWith(".json"));
const products = files
  .map((file) => {
    const data = JSON.parse(fs.readFileSync(path.join(productsDir, file), "utf8"));
    return {
      value: Number(data.id),
      label: String(data.name || `ID ${data.id}`),
      image: data.thumbnail || "/assets/img/brand/svastaonica-logo-2.jpg",
    };
  })
  .filter((p) => Number.isFinite(p.value))
  .sort((a, b) => a.value - b.value);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(products, null, 2) + "\n");
console.log(`Wrote ${products.length} products → ${path.relative(root, outFile)}`);
