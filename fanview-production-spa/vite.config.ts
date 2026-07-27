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
  test: {
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    setupFiles: ["./src/test/setup.ts"],
  },
  plugins: [react()],
});
