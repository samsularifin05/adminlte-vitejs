import react from "@vitejs/plugin-react-swc";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { ManifestOptions, VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import svgrPlugin from "vite-plugin-svgr";
import htmlMinifier from "vite-plugin-html-minifier";
import viteCompression from "vite-plugin-compression";
import path from "path";
function isExternal(id: string) {
  return !id.startsWith(".") && !path.isAbsolute(id) && !id.startsWith("~/");
}
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
      splitVendorChunkPlugin(),
      htmlMinifier({
        minify: true
      }),
      svgrPlugin({
        svgrOptions: {
          icon: true
        }
      }),
      viteCompression()
    ],
    build: {
      emptyOutDir: true,
      outDir: "build",
      sourcemap: false,
      minify: true,
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        external: isExternal,
        output: {
          chunkFileNames: "assets/js/[hash].js",
          entryFileNames: "assets/js/[hash].js",
          assetFileNames: ({ name }) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
              return "assets/images/[hash][extname]";
            }
            if (/\.(ttf|woff2|svg)$/.test(name ?? "")) {
              return "assets/font/[hash][extname]";
            }
            if (/\.css$/.test(name ?? "")) {
              return "assets/css/[hash][extname]";
            }
            return "assets/[hash][extname]";
          }
        }
      }
    }
  };
});
