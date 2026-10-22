import { resolve } from "node:path";
import { searchForWorkspaceRoot } from "vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/assets/fanview-production/",
  resolve: {
    dedupe: ["@phosphor-icons/react", "react", "react-dom"],
  },
  build: {
    emptyOutDir: true,
    outDir: "dist",
  },
  server: {
    fs: {
      // Use the same approved fonts and sprite as public product pages.
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        resolve(__dirname, "../assets/fonts"),
        resolve(__dirname, "../assets/product-design-v1"),
        resolve(__dirname, "../fanview-spa/src"),
      ],
    },
  },
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
  },
  plugins: [react()],
});
