import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { ManifestOptions, VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import svgrPlugin from "vite-plugin-svgr";
import htmlMinifier from "vite-plugin-html-minifier";
const pwaOptions: Partial<VitePWAOptions> = {
  mode: "development",
  base: "/",
  includeAssets: ["favicon.svg"],
  workbox: {
    clientsClaim: false,
    skipWaiting: true,
    navigateFallbackDenylist: [/^\/backoffice/],
    disableDevLogs: true
  },
  manifest: {
    name: "Admin Lte",
    short_name: "Admin Lte",
    theme_color: "#ffffff",
    icons: [
      {
        src: "pwa-192x192.png", // <== don't add slash, for testing
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/pwa-512x512.png", // <== don't remove slash, for testing
        sizes: "512x512",
        type: "image/png"
      },
      {
        src: "pwa-512x512.png", // <== don't add slash, for testing
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable"
      }
    ]
  },
  devOptions: {
    enabled: process.env.SW_DEV === "true",
    /* when using generateSW the PWA plugin will switch to classic */
    type: "module",
    navigateFallback: "index.html"
  }
};

const replaceOptions = { __DATE__: new Date().toISOString() };
const claims = process.env.CLAIMS === "true";
const reload = process.env.RELOAD_SW === "true";
const selfDestroying = process.env.SW_DESTROY === "true";

if (process.env.SW === "true") {
  pwaOptions.srcDir = "src";
  pwaOptions.filename = claims ? "claims-sw.ts" : "prompt-sw.ts";
  pwaOptions.strategies = "injectManifest";
  (pwaOptions.manifest as Partial<ManifestOptions>).name =
    "PWA Inject Manifest";
  (pwaOptions.manifest as Partial<ManifestOptions>).short_name = "PWA Inject";
}

if (claims) pwaOptions.registerType = "autoUpdate";

if (reload) {
  // @ts-expect-error just ignore
  replaceOptions.__RELOAD_SW__ = "true";
}

if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      react(),
      VitePWA(pwaOptions),
      htmlMinifier({
        minify: true
      }),
      svgrPlugin({
        svgrOptions: {
          icon: true
        }
      })
    ],
    resolve: {
      alias: [
        { find: "@/", replacement: "/src" },
        { find: "@/Assets", replacement: "/src/assets" },
        { find: "@/Components", replacement: "/src/components" }
      ]
    },
    build: {
      emptyOutDir: true,
      outDir: "build",
      sourcemap: process.env.SOURCE_MAP === "true",
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
              return "assets/images/[name]-[hash][extname]";
            }
            if (/\.(ttf|woff2|svg)$/.test(name ?? "")) {
              return "assets/font/[name]-[hash][extname]";
            }
            if (/\.css$/.test(name ?? "")) {
              return "assets/css/[name]-[hash][extname]";
            }
            return "assets/[name]-[hash][extname]";
          }
        }
      }
    }
  };
});
