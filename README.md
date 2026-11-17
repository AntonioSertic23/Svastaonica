# Svaštaonica

Website for **Svaštaonica** — handmade gifts and crafts from Našice. Vue 3 SPA (Composition API) + Bootstrap 5, hosted on Netlify.

Live site: [https://svastaonica.netlify.app/](https://svastaonica.netlify.app/)

---

## Update products (CMS)

Production (GitHub login):

**[https://svastaonica.netlify.app/admin/](https://svastaonica.netlify.app/admin/)**

Trailing slash matters. Open **Proizvodi**, pick an item, edit, then **Publish / Save**. That commits to GitHub and Netlify rebuilds.

On each product you can set:

- **Cijena**, **cijena na dan 10. 9. 2026.** — empty fields are not shown on the site. For a product added after that day, set **Datum te cijene** to the first day it was offered (for example `15. 10. 2026.`)
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
- **Cjenik** (`/cjenik`) — machine-readable CSV under the price-list rules (NN 132/2026, in force 17 Nov 2026). Generated at **build time** when the price or the priced assortment changes. The current file is also at `/cjenici/vazeci.csv`. A replaced file stays public for 15 days. Prices are VAT-exempt (Art. 90(1)). A designed flyer also appears on the home page.

A CMS save rebuilds the site. If no price changed, the CSV is left as it is. There is no daily republish.

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
