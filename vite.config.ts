import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/pc-builder-public/",
  plugins: [react()],
  build: { outDir: "docs", emptyOutDir: true, sourcemap: false }
});
