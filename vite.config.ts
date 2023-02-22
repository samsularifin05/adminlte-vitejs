import react from "@vitejs/plugin-react-swc";
import { defineConfig, splitVendorChunkPlugin } from "vite";
import { ManifestOptions, VitePWA, VitePWAOptions } from "vite-plugin-pwa";
import svgrPlugin from "vite-plugin-svgr";
import htmlMinifier from "vite-plugin-html-minifier";
import viteCompression from "vite-plugin-compression";

const getCache = ({ name, pattern }: any) => ({
  urlPattern: pattern,
  handler: "CacheFirst" as const,
  options: {
    cacheName: name,
    expiration: {
      maxEntries: 500,
      maxAgeSeconds: 60 * 60 * 24 * 365 * 2 // 2 years
    },
    cacheableResponse: {
      statuses: [200]
    }
  }
});
const pwaOptions: Partial<VitePWAOptions> = {
  mode: "production",
  base: "/",
  includeAssets: ["favicon.svg"],
  registerType: "autoUpdate",
  workbox: {
    clientsClaim: false,
    skipWaiting: true,
    navigateFallbackDenylist: [/^\/backoffice/],
    disableDevLogs: true,
    runtimeCaching: [
      getCache({
        pattern: /^https:\/\/adminlte-vite-js.netlify.app\/assets/,
        name: "local-images1"
      }),
      getCache({
        pattern: /^https:\/\/adminlte-vite-js.netlify.app\/assets\/css/,
        name: "local-css"
      })
    ]
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
      sourcemap: false,
      minify: true,
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
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
