/**
 * Write a public CSV price list (NN 101/2026) under public/cjenici/.
 * One dated file per calendar day (Europe/Zagreb); older files kept 30 days.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const productsDir = path.join(root, "src/content/products");
const outDir = path.join(root, "public/cjenici");

const META = {
  oblikObjekta: "trgovina",
  adresa: "Nasice",
  oznakaObjekta: "Svastaonica",
  brojPohrane: "001",
  marka: "Svaštaonica",
  jedinicaMjere: "kom",
};

const HEADERS = [
  "naziv",
  "sifra",
  "marka",
  "jedinica_mjere",
  "cijena_za_jedinicu_mjere",
  "maloprodajna_cijena",
  "poseban_oblik_prodaje",
  "naziv_posebnog_oblika_prodaje",
  "sidrena_cijena",
  "najniza_cijena_30_dana",
  "barkod",
  "dostupnost",
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
  }).formatToParts(date);
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  };
}

function csvCell(value) {
  const s = value == null ? "" : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replaceAll('"', '""')}"`;
  return s;
}

function money(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "";
  return n.toFixed(2);
}

function isOnSale(product) {
  return Array.isArray(product.badges) && product.badges.includes("badge4");
}

function rowFor(product) {
  const sale = isOnSale(product);
  return [
    product.name,
    `SV-${product.id}`,
    META.marka,
    META.jedinicaMjere,
    money(product.price),
    money(product.price),
    sale ? "da" : "ne",
    sale ? "akcija" : "",
    money(product.sidrenaCijena),
    money(product.najnizaCijena30dana),
    "",
    product.soldout ? "nedostupno" : "dostupno",
  ];
}

function buildCsv(products) {
  const lines = [HEADERS.join(",")];
  for (const product of products) {
    lines.push(rowFor(product).map(csvCell).join(","));
  }
  return lines.join("\n") + "\n";
}

function filenameFor(stamp) {
  const ts = `${stamp.year}${stamp.month}${stamp.day}T${stamp.hour}${stamp.minute}${stamp.second}`;
  return [
    META.oblikObjekta,
    META.adresa,
    META.oznakaObjekta,
    META.brojPohrane,
    ts,
  ].join("_") + ".csv";
}

function datePrefix(stamp) {
  return `${META.oblikObjekta}_${META.adresa}_${META.oznakaObjekta}_${META.brojPohrane}_${stamp.year}${stamp.month}${stamp.day}T`;
}

function pruneOld(files, stamp) {
  const today = new Date(`${stamp.year}-${stamp.month}-${stamp.day}T12:00:00`);
  for (const file of files) {
    const match = file.match(/_(\d{8})T\d{6}\.csv$/);
    if (!match) continue;
    const y = match[1].slice(0, 4);
    const m = match[1].slice(4, 6);
    const d = match[1].slice(6, 8);
    const fileDate = new Date(`${y}-${m}-${d}T12:00:00`);
    const ageDays = (today - fileDate) / 86400000;
    if (ageDays > 30) {
      fs.unlinkSync(path.join(outDir, file));
    }
  }
}

function writeListing(stamp, listed) {
  const filesJson = {
    generatedAt: `${stamp.year}-${stamp.month}-${stamp.day}T${stamp.hour}:${stamp.minute}:${stamp.second}+02:00`,
    files: listed.map((file) => ({
      name: file,
      url: `/cjenici/${file}`,
    })),
  };
  fs.writeFileSync(
    path.join(outDir, "files.json"),
    JSON.stringify(filesJson, null, 2) + "\n"
  );

  const listItems = listed.length
    ? listed
        .map((file) => `    <li><a href="/cjenici/${file}">${file}</a></li>`)
        .join("\n")
    : "    <li>Cjenik proizvoda bit će objavljen kad se upišu cijene.</li>";

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
  <p>Strojno čitljivi cjenici (CSV) prema Odluci NN 101/2026. Datoteke ostaju dostupne 30 dana.</p>
  <ul>
${listItems}
  </ul>
</body>
</html>
`;
  fs.writeFileSync(path.join(outDir, "index.html"), listingHtml);
}

export function generateCjenik() {
  const files = fs.readdirSync(productsDir).filter((f) => f.endsWith(".json"));
  const products = files
    .map((file) =>
      JSON.parse(fs.readFileSync(path.join(productsDir, file), "utf8"))
    )
    .filter(
      (p) =>
        !p.comingSoon &&
        p.price !== "" &&
        p.price != null &&
        Number.isFinite(Number(p.price)) &&
        Number.isFinite(Number(p.id))
    )
    .sort((a, b) => Number(a.id) - Number(b.id));

  const stamp = zagrebNow();
  fs.mkdirSync(outDir, { recursive: true });

  const existing = fs.readdirSync(outDir).filter((f) => f.endsWith(".csv"));

  if (products.length === 0) {
    for (const file of existing) {
      fs.unlinkSync(path.join(outDir, file));
    }
    writeListing(stamp, []);
    console.log("No product prices set — skipped CSV generation.");
    return null;
  }

  const todayPrefix = datePrefix(stamp);
  for (const file of existing) {
    if (file.startsWith(todayPrefix)) {
      fs.unlinkSync(path.join(outDir, file));
    }
  }

  const name = filenameFor(stamp);
  fs.writeFileSync(path.join(outDir, name), buildCsv(products), "utf8");

  const afterWrite = fs.readdirSync(outDir).filter((f) => f.endsWith(".csv"));
  pruneOld(afterWrite, stamp);

  const listed = fs
    .readdirSync(outDir)
    .filter((f) => f.endsWith(".csv"))
    .sort()
    .reverse();

  writeListing(stamp, listed);
  console.log(`Wrote ${products.length} products → public/cjenici/${name}`);
  return name;
}

const isDirect =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isDirect) {
  generateCjenik();
}
