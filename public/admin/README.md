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

Open **Proizvodi** in the sidebar. You should see every product as its own row.

Each product is a JSON file in `src/content/products/`. Blog posts live in `src/content/blogs/`. The site reads them via `src/catalog.js`.

### Why does Login skip authentication locally?

That is **expected**. With `local_backend: true` and `decap-server` running, Decap **bypasses login**. Anyone with access to your machine / `localhost` can use it — this is not production auth.

## Production — GitHub OAuth (two people only)

Access is limited by **GitHub repo permissions**, not Netlify Identity.

1. Create a GitHub OAuth App  
   - Homepage: `https://svastaonica.netlify.app`  
   - Callback: `https://api.netlify.com/auth/done`
2. Netlify → **Access & security → OAuth → Install provider → GitHub**  
   (paste Client ID + Secret — **not** Google, **not** Identity/Git Gateway)
3. This repo’s `public/admin/config.yml` uses:
   ```yaml
   backend:
     name: github
     repo: AntonioSertic23/Svastaonica
     branch: main
   ```
4. GitHub repo → **Settings → Collaborators** → only the two allowed accounts with **Write**
5. Deploy, then open `https://svastaonica.netlify.app/admin/` → **Login with GitHub**

Edits commit to `src/content/products/` (and blogs); uploads go to `public/assets/img/uploads/`. Netlify rebuilds after push.
