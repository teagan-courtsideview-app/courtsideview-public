import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/widget.tsx"),
      fileName: () => "fanview-community-react-v1.js",
      formats: ["es"],
    },
    minify: "esbuild",
    outDir: "../assets/fanview-community",
    sourcemap: false,
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react()],
});
