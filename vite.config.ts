import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgrPlugin from "vite-plugin-svgr";
import inject from "@rollup/plugin-inject";

// export default defineConfig({command, mode})=>{}
export default defineConfig(({command, mode }) => {
  return {
    // publicDir: './src/assets',
    plugins: [
      react(),
      reactRefresh(),
      svgrPlugin({
        svgrOptions: {
          icon: true,
        },
      }),
      inject({
        jQuery: "jquery",
      }),
    ],
    optimizeDeps: {
      include: ["jquery"],
    },
    resolve: {
      alias: [
        { find: "@/", replacement: "/src" },
        { find: "@/Assets", replacement: "/src/assets" },
        { find: "@/Components", replacement: "/src/components" },
      ],
    },
    build: {
      emptyOutDir: true,
      outDir: "build",
      sourcemap: true,
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
          },
        },
      },
    },
    // assetsDir: 'res',
    // plugins: [vue()],
    // root: 'src',
    // build: {
    //   emptyOutDir: true,
    //   outDir: '../dist'
    // }
  }
});
