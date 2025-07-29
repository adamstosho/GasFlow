import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "pwa-192x192.png", "pwa-512x512.png"],
      manifest: {
        name: "GasFlow - Ethereum Gas Fee Tracker",
        short_name: "GasFlow",
        description: "Real-time Ethereum gas fee visualizer and estimator for Web3 users",
        theme_color: "#3B82F6",
        background_color: "#F9FAFB",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        globIgnores: ["**/screenshots/**", "**/*.log", "**/node_modules/**"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB limit
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
})
