import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const manifest = JSON.parse(readFileSync(resolve(__dirname, 'scripts/approved-presentation.json'), 'utf8'));
const css = readFileSync(resolve(__dirname, '../assets/fanview-production/assets', manifest.stylesheet));
const expected = manifest.files.find((file: {file: string}) => file.file === manifest.stylesheet);
if (createHash('sha256').update(css).digest('hex') !== expected.sha256) throw new Error('Approved scoreboard CSS hash mismatch.');
const corrections = readFileSync(resolve(__dirname, 'scripts/reflow-corrections.css'), 'utf8');

export default defineConfig({
  plugins: [react()],
  resolve: { dedupe: ['react', 'react-dom', '@phosphor-icons/react'] },
  define: { "process.env.NODE_ENV": JSON.stringify("production"), __BROADCAST_APPROVED_CSS__: JSON.stringify(css.toString('utf8') + corrections) },
  build: {
    outDir: 'dist-broadcaster', emptyOutDir: true,
    lib: { entry: resolve(__dirname, 'src/BroadcasterDisplay.tsx'), formats: ['es'], fileName: () => 'broadcaster-display.js' },
  },
});
