/**
 * Write a public CSV price list (NN 132/2026) under public/cjenici/.
 * A new dated file is written only when prices or the priced assortment change.
 * The replaced file stays public for 15 days. The current bytes are also at vazeci.csv.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productsDir = path.join(root, "src/content/products");
const outDir = path.join(root, "public/cjenici");

const META = {
  // Isti OIB kao u src/cjenik/config.js. Za obrt zamijeni matičnim brojem ako nije isti.
  oib: "05429065302",
  oblikObjekta: "Radionica s prodajom na daljinu",
  adresa: "V.Lisinskog172",
  mjesto: "Našice",
  oznakaObjekta: "Svaštaonica",
  oznakaPoslovnice: "POSL1",
  vrstaCjenika: "ROBA",
  marka: "Svaštaonica",
  stableFile: "vazeci.csv",
  archiveDays: 15,
};

const HEADERS = [
  "naziv",
  "sifra",
  "marka",
  "neto_kolicina",
  "jedinica_mjere",
  "maloprodajna_cijena",
  "poseban_oblik_prodaje",
  "cijena_za_jedinicu_mjere",
  "barkod",
  "ean_barkod",
  "bazna_cijena",
];

function zagrebNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Zagreb",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
    timeZoneName: "longOffset",
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  const zone = get("timeZoneName") || "";
  const offsetMatch = zone.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);
  const offset = offsetMatch
    ? `${offsetMatch[1]}${offsetMatch[2].padStart(2, "0")}:${(offsetMatch[3] || "00").padStart(2, "0")}`
    : "+01:00";
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
    offset,
  };
}

function csvCell(value) {
  const s = value == null ? "" : String(value);
  if (/[;"\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function money(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  return n.toFixed(2).replace(".", ",");
}

function rowFor(product) {
  return [
    product.name,
    `SV-${product.id}`,
    META.marka,
    "",
    "",
    money(product.price),
    "NE",
    "",
    "",
    "",
    money(product.sidrenaCijena),
  ];
}

function buildCsv(products) {
  const lines = [HEADERS.join(";")];
  for (const product of products) {
    lines.push(rowFor(product).map(csvCell).join(";"));
  }
  return lines.join("\n") + "\n";
}

function fileToken(value) {
  return String(value).trim().replace(/\s+/g, "_");
}

function filenameFor(stamp, broj) {
  const pohrana = String(broj).padStart(3, "0");
  const ts = `${stamp.year}${stamp.month}${stamp.day}_${stamp.hour}${stamp.minute}`;
  return [
    META.oib,
    fileToken(META.oblikObjekta),
    fileToken(META.adresa),
    fileToken(META.mjesto),
    fileToken(META.oznakaObjekta),
    fileToken(META.oznakaPoslovnice),
    META.vrstaCjenika,
    pohrana,
    ts,
  ].join("_") + ".csv";
}

function stampKey(file) {
  const current = file.match(/_(\d{8})_(\d{4})\.csv$/);
  if (current) return Number(current[1] + current[2]);
  const legacy = file.match(/_(\d{8})T(\d{6})\.csv$/);
  if (legacy) return Number(legacy[1] + legacy[2].slice(0, 4));
  return 0;
}

function brojPohrane(file) {
  const match = file.match(/_ROBA_(\d+)_\d{8}_\d{4}\.csv$/);
  return match ? Number(match[1]) : 0;
}

function keyToDate(key) {
  const s = String(key).padStart(12, "0");
  const y = s.slice(0, 4);
  const m = s.slice(4, 6);
  const d = s.slice(6, 8);
  return new Date(`${y}-${m}-${d}T12:00:00`);
}

function readCsvBody(file) {
  const text = fs.readFileSync(path.join(outDir, file), "utf8");
  return text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").trim();
}

function writeCsv(file, body) {
  fs.writeFileSync(path.join(outDir, file), `\uFEFF${body}`, "utf8");
}

function datedCsvs() {
  return fs
    .readdirSync(outDir)
    .filter((file) => file.endsWith(".csv") && file !== META.stableFile);
}

function fileUrl(file) {
  return `/cjenici/${encodeURIComponent(file)}`;
}

function writeListing(stamp, listed) {
  const filesJson = {
    generatedAt: `${stamp.year}-${stamp.month}-${stamp.day}T${stamp.hour}:${stamp.minute}:${stamp.second}${stamp.offset}`,
    stableUrl: `/cjenici/${META.stableFile}`,
    files: listed.map((file) => ({
      name: file,
      url: fileUrl(file),
    })),
  };
  fs.writeFileSync(
    path.join(outDir, "files.json"),
    JSON.stringify(filesJson, null, 2) + "\n"
  );

  const listItems = listed.length
    ? listed
        .map((file) => `    <li><a href="${fileUrl(file)}">${file}</a></li>`)
        .join("\n")
    : "    <li>Cjenik proizvoda bit će objavljen kad se upišu cijene.</li>";

  const stable = listed.length
    ? `  <p><a href="/cjenici/${META.stableFile}">Važeći cjenik</a></p>\n`
    : "";

  const listingHtml = `<!DOCTYPE html>
<html lang="hr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Cjenik — Svaštaonica</title>
  <style>
    body { font-family: sans-serif; background: #fff; color: #222; padding: 1.5rem; line-height: 1.5; }
    a { color: #5b3a78; }
  </style>
</head>
<body>
  <h1>Cjenik proizvoda — Svaštaonica</h1>
  <p>Strojno čitljivi cjenik (CSV) prema Pravilniku o načinu objave cjenika proizvoda (NN 132/2026). Zamijenjeni cjenik ostaje dostupan 15 dana.</p>
${stable}  <ul>
${listItems}
  </ul>
</body>
</html>
`;
  fs.writeFileSync(path.join(outDir, "index.html"), listingHtml);
}

function pruneReplaced(files, stamp) {
  const sorted = [...files].sort((a, b) => stampKey(a) - stampKey(b));
  if (sorted.length < 2) return 0;
  const today = new Date(`${stamp.year}-${stamp.month}-${stamp.day}T12:00:00`);
  let removed = 0;
  for (let i = 0; i < sorted.length - 1; i += 1) {
    const replacedAt = stampKey(sorted[i + 1]);
    if (!replacedAt) continue;
    const ageDays = (today - keyToDate(replacedAt)) / 86400000;
    if (ageDays > META.archiveDays) {
      fs.unlinkSync(path.join(outDir, sorted[i]));
      removed += 1;
    }
  }
  return removed;
}

function loadProducts() {
  return fs
    .readdirSync(productsDir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => JSON.parse(fs.readFileSync(path.join(productsDir, file), "utf8")))
    .filter(
      (product) =>
        !product.comingSoon &&
        product.price !== "" &&
        product.price != null &&
        Number.isFinite(Number(product.price)) &&
        Number.isFinite(Number(product.id))
    )
    .sort((a, b) => Number(a.id) - Number(b.id));
}

export function generateCjenik() {
  const products = loadProducts();
  const stamp = zagrebNow();
  fs.mkdirSync(outDir, { recursive: true });

  if (products.length === 0) {
    for (const file of fs.readdirSync(outDir).filter((name) => name.endsWith(".csv"))) {
      fs.unlinkSync(path.join(outDir, file));
    }
    writeListing(stamp, []);
    console.log("No product prices set — skipped CSV generation.");
    return null;
  }

  const body = buildCsv(products);
  const bodyKey = body.trim();
  let dated = datedCsvs();
  const latest = [...dated].sort((a, b) => stampKey(b) - stampKey(a))[0];
  const latestBody = latest ? readCsvBody(latest) : "";
  let changed = false;
  let written = latest || null;

  if (latestBody !== bodyKey) {
    const broj = dated.reduce((max, file) => Math.max(max, brojPohrane(file)), 0) + 1;
    written = filenameFor(stamp, broj);
    writeCsv(written, body);
    dated = datedCsvs();
    changed = true;
  }

  if (pruneReplaced(dated, stamp) > 0) changed = true;

  const stablePath = path.join(outDir, META.stableFile);
  const stableBody = fs.existsSync(stablePath)
    ? fs.readFileSync(stablePath, "utf8").replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").trim()
    : "";
  if (stableBody !== bodyKey) {
    writeCsv(META.stableFile, body);
    changed = true;
  }

  const listed = datedCsvs().sort((a, b) => stampKey(b) - stampKey(a));
  if (changed || !fs.existsSync(path.join(outDir, "files.json"))) {
    writeListing(stamp, listed);
  }

  if (written && latestBody !== bodyKey) {
    console.log(`Wrote ${products.length} products → public/cjenici/${written}`);
  } else {
    console.log("Cjenik unchanged — kept the current CSV.");
  }
  return written;
}

const isDirect =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirect) {
  generateCjenik();
}
