/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { VitePWA } from "vite-plugin-pwa";
import preload from "vite-plugin-preload";

import siteConfig from "./site.config";

export default defineConfig({
  cacheDir: "../../node_modules/.vite/www",

  server: {
    port: 4200,
    host: "localhost",
  },

  preview: {
    port: 4300,
    host: "localhost",
  },

  plugins: [
    react(),
    nxViteTsPaths(),
    preload(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      devOptions: {
        enabled: true,
      },
      includeAssets: [
        siteConfig.assets.favicon,
        siteConfig.assets.appleTouchIcon,
        siteConfig.assets.maskedIcon,
      ],
      manifest: {
        name: siteConfig.appName,
        short_name: siteConfig.appShortName,
        description: siteConfig.description,
        theme_color: siteConfig.theme.background,
        icons: siteConfig.assets.icons,
      },
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
