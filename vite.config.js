import { defineConfig } from "vite";
import { resolve } from "path";

// plugins: chunkSplitPlugin, legacy, ViteImageOptimizer
// import { chunkSplitPlugin } from "vite-plugin-chunk-split";
// import legacy from "@vitejs/plugin-legacy";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  // base: "./" - root is the current folder where is index.html
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      //for multiple and nested pages input:...
      input: {
        main: resolve(__dirname, "index.html"),
        // about: resolve(__dirname, "about.html"),
        // info: resolve(__dirname, "info/index.html"),
      },
      // for creating assets file structure after build output:...
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(jpe?g|png|gif|tiff|webp|svg|avif|ico)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (/\.(ttf|otf|woff2?)$/.test(name ?? "")) {
            return "assets/fonts/[name]-[hash][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "assets/[name]-[hash][extname]";
        },
      },
    },
  },
  plugins: [
    // ...
    //chunkSplitPlugin(),
    ViteImageOptimizer({
      /* pass your config */
      png: {
        // https://sharp.pixelplumbing.com/api-output#png
        quality: 80,
      },
      jpeg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
      },
      jpg: {
        // https://sharp.pixelplumbing.com/api-output#jpeg
        quality: 80,
      },
    }),
    // Legacy
    // legacy({
    //   targets: ["defaults", "not IE 11"],
    // }),
  ],
});
