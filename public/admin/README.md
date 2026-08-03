# Svaštaonica Admin (Decap CMS)

## Local development

**Option A — one command:**
```bash
npm run dev:cms
```
Then open [http://localhost:5173/admin/](http://localhost:5173/admin/)

**Option B — two terminals:**
1. Terminal 1: `npm run dev`
2. Terminal 2: `npm run cms`
3. Open [http://localhost:5173/admin/](http://localhost:5173/admin/)

### Where are the products?

Open **Proizvodi** in the sidebar. You should see every product as its own row (not an empty list).

Each product is a JSON file in `src/content/products/`. Blog posts live in `src/content/blogs/`. The site reads them via `src/catalog.js`.

### Why does Login skip authentication locally?

That is **expected**. With `local_backend: true` and `decap-server` running, Decap **bypasses login** so you can edit without Netlify Identity. Anyone with access to your machine / `localhost` can use it — this is not production auth.

On production (`svastaonica.netlify.app`) that bypass does not apply; real login is required.

## Production (Netlify) — invite only

1. Site settings → **Identity** → Enable Identity  
2. Identity → **Registration** → **Invite only** (do not leave Open)  
3. Identity → **Services** → Enable **Git Gateway**  
4. Identity → **Invite users** → invite only yourself / the owner  
5. Open `https://svastaonica.netlify.app/admin/` → log in with the invite email  

Without an invite, nobody else can open admin.

Edits write to `src/content/products/` (and blogs) and uploaded images to `public/assets/img/uploads/`. After Save, Netlify runs a new deploy.
