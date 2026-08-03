/**
 * Snapshot all product JSON files into backups/products-<timestamp>/.
 * Primary recovery for production deletes is still GitHub history (see admin README).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productsDir = path.join(root, "src/content/products");
const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
const outDir = path.join(root, "backups", `products-${stamp}`);

fs.mkdirSync(outDir, { recursive: true });
const files = fs.readdirSync(productsDir).filter((f) => f.endsWith(".json"));
for (const file of files) {
  fs.copyFileSync(path.join(productsDir, file), path.join(outDir, file));
}

console.log(`Backup: ${files.length} products → ${path.relative(root, outDir)}`);
