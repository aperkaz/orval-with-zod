import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // This proxies requests starting with /pet/
      "/pet": {
        target: "https://petstore3.swagger.io/api/v3/pet",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/pet/, ""),
      },
    },
  },
});
