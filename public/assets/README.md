# Static assets

```text
public/assets/img/
  products/   Product photos (one folder per product line)
  brand/      Logos (navbar, hero, favicon, admin)
  ui/         UI chrome: badges, social icons, care icons, medals, share, etc.
  site/       Marketing / About Us imagery
  icons/      Decorative scatter icons (SideDecorations)
  uploads/    New files uploaded via Decap CMS (/admin)
```

## CMS uploads

Decap writes to `uploads/` (`media_folder` in `public/admin/config.yml`).  
Existing product photos stay under `products/` and are referenced from `src/content/products/*.json`.

## Adding a product image

1. Prefer upload via `/admin` → lands in `uploads/`, or
2. Place files under `products/<line>/` and set paths in the product JSON.
