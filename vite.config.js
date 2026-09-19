import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { generateCjenik } from "./scripts/generate-cjenik.mjs";

/** Serve Decap CMS from /public/admin instead of the Vue SPA. */
function adminStaticPlugin() {
  return {
    name: "admin-static",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        // Decap resolves config.yml relative to the URL path. Without a
        // trailing slash, /admin loads /config.yml (404) instead of /admin/config.yml.
        if (url === "/admin") {
          res.statusCode = 302;
          res.setHeader("Location", "/admin/");
          res.end();
          return;
        }
        if (url === "/admin/") {
          req.url = "/admin/index.html";
        }
        next();
      });
    },
  };
}

function cjenikPlugin() {
  const regenerate = () => {
    try {
      generateCjenik();
    } catch (err) {
      console.error("[cjenik]", err);
    }
  };

  return {
    name: "generate-cjenik",
    buildStart() {
      regenerate();
    },
    configureServer(server) {
      regenerate();
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url === "/cjenici" || url === "/cjenici/") {
          req.url = "/cjenici/index.html";
        }
        next();
      });
      server.watcher.add("src/content/products");
      server.watcher.on("change", (file) => {
        if (file.includes("content/products") && file.endsWith(".json")) {
          regenerate();
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [adminStaticPlugin(), cjenikPlugin(), vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name].js",
        entryFileNames: "assets/js/[name].js",

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/img/[name][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name][extname]";
          }

          return "assets/[name][extname]";
        },
      },
    },
  },
});
