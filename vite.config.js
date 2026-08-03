import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

/** Serve Decap CMS from /public/admin instead of the Vue SPA. */
function adminStaticPlugin() {
  return {
    name: "admin-static",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split("?")[0] ?? "";
        if (url === "/admin" || url === "/admin/") {
          req.url = "/admin/index.html";
        }
        next();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [adminStaticPlugin(), vue()],
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
