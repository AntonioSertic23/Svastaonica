# Svaštaonica

Website for **Svaštaonica** — handmade gifts and crafts from Našice. Vue 3 SPA (Composition API) + Bootstrap 5, hosted on Netlify.

Live site: [https://svastaonica.netlify.app/](https://svastaonica.netlify.app/)

---

## Update products (CMS)

Production (GitHub login):

**[https://svastaonica.netlify.app/admin/](https://svastaonica.netlify.app/admin/)**

Trailing slash matters. Open **Proizvodi**, pick an item, edit, then **Publish / Save**. That commits to GitHub and Netlify rebuilds.

On each product you can set:

- **Maloprodajna cijena**, **sidrena/dodatna cijena** — empty fields are not shown on the site
- Badges (Novo, U trendu, Preporuka, …)
- **Rasprodano** / **Uskoro** — availability flags
- Bundle flag + related products, gallery, declaration, etc.

### Homepage “Najtraženiji”

Under **Početna stranica → Najtraženiji proizvodi**, pick exactly **3** products for the home bestsellers row (gold / silver / bronze). Stored in `src/content/site/homepage.json`.

Local editor: `npm run dev:cms` then [http://localhost:5173/admin/](http://localhost:5173/admin/)

More detail (OAuth, backups): [`public/admin/README.md`](public/admin/README.md)

---

## What’s on the site

- Home: brand hero, product slider (random catalog photos), featured bestsellers, gallery preview, order process, visual price-list flyer, stats
- Gallery with search (no category filters)
- Product pages (open photo gallery, sizes, related items, reviews)
- About, contact
- HR / EN
- **Cjenik** (`/cjenik`) — machine-readable CSV for the price-list decision (NN 101/2026). Generated at **build time** once at least one product has a retail price. Dated files are **committed to the repo** and stay public for 30 days. Prices are VAT-exempt (Art. 90(1)); filenames use the workshop / remote-sale naming scheme. A designed flyer also appears on the home page.

### Daily cjenik (working days before 08:00 Zagreb)

GitHub Action `.github/workflows/daily-cjenik.yml` runs Mon–Fri at 05:00 UTC (07:00 in summer / 06:00 in winter): it regenerates the CSV, commits it under `public/cjenici/`, and pushes. Netlify then deploys from that commit, so the archive is not lost between builds.

You can also run it by hand: GitHub → **Actions → Daily cjenik rebuild → Run workflow**. A CMS save still rebuilds the site immediately (and refreshes today’s CSV in the deploy).

---

## Local setup

```sh
npm install
npm run dev
```

App: [http://localhost:5173/](http://localhost:5173/)

CMS + app together:

```sh
npm run dev:cms
```

Useful scripts:

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run dev:cms` | Site + Decap local backend |
| `npm run build` | Production build (also regenerates CMS index + cjenik CSV) |
| `npm run backup:products` | Snapshot `src/content/products/` |

Products live in `src/content/products/`. Homepage featured IDs live in `src/content/site/homepage.json`. The catalog is assembled in `src/catalog.js`.
