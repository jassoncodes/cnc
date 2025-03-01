import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8000,
    https: {
      key: "./https/private.key",
      cert: "./https/certificate.crt",
    },
    hmr: {
      protocol: "wss",
      host: "localhost",
      port: 8000,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },
  plugins: [react()],
});
