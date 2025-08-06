import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      // 👈 y esto es lo nuevo que agregamos
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Vtos App",
        short_name: "Vtos",
        description: "Gestion de vencimientos -vtos App",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#002c5f",
        theme_color: "#002c5f",
        icons: [
          {
            src: "icons/logo_pwa192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/logo_pwa512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
