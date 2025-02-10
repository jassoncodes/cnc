import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    // https: {
    //   key: "./https/private.key",
    //   cert: "./https/certificate.crt",
    // },
    // hmr: {
    //   protocol: "ws",
    //   host: "localhost",
    //   port: 3000,
    // },
  },
  plugins: [react()],
});
