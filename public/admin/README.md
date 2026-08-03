# Svaštaonica Admin (Decap CMS)

## Local development

**Option A — one command:**
```bash
npm run dev:cms
```
Then open [http://localhost:5173/admin/](http://localhost:5173/admin/) (trailing slash matters).

**Option B — two terminals:**
1. Terminal 1: `npm run dev`
2. Terminal 2: `npm run cms`
3. Open [http://localhost:5173/admin/](http://localhost:5173/admin/)

### Where are the products?

Open **Proizvodi** in the sidebar. You should see every product as its own row.

Each product is a JSON file in `src/content/products/`. The site reads them via `src/catalog.js`.

Images live under `public/assets/img/` — see [`../assets/README.md`](../assets/README.md). New CMS uploads go to `img/uploads/`.

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

Edits commit to `src/content/products/`; uploads go to `public/assets/img/uploads/`. Netlify rebuilds after push.

## Backup & restore (accidental delete)

### Production (GitHub) — main safety net

Every CMS save or delete on production creates a **Git commit**. Nothing is permanently lost unless history is force-pushed away.

**Restore a deleted product:**
1. Open the repo on GitHub → `src/content/products/`
2. Open **History** (or find the delete commit)
3. Open the deleted file in an older commit → **⋯ → View file** / copy contents  
   or use **Revert** on that commit if it only deleted what you want back
4. Alternatively locally:
   ```bash
   git log -- src/content/products/
   git checkout <commit-before-delete> -- src/content/products/<file>.json
   git commit -m "Restore deleted product"
   git push
   ```

**Restore a bad edit:** same idea — check out the previous version of that JSON file from git history.

### Local snapshot

Before risky CMS edits, you can snapshot all product files:

```bash
npm run backup:products
```

Copies everything to `backups/products-<timestamp>/` (gitignored). To restore one file, copy it back into `src/content/products/`.
