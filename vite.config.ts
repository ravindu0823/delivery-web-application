import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 2000,
    strictPort: true,
    /* open: true,
    watch: {
      usePolling: true,
    }, */
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, "./src/styles"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  preview: {
    port: 2000,
    strictPort: true,
  },
});
