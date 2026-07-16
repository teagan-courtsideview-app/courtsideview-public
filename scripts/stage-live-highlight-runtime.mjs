import { copyFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const webRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repositoryRoot = join(webRoot, '..');

const files = [
  ['packages/live-highlight-control-ui/dist/broadcaster-controller.js', 'live-highlight/broadcaster-controller.js'],
  ['packages/live-highlight-control-ui/dist/types.js', 'live-highlight/types.js'],
  ['web-broadcaster-replay/dist/webcodecs-capabilities.js', 'live-highlight/webcodecs-capabilities.js'],
  ['web-broadcaster-replay/dist/webcodecs-ring.js', 'live-highlight/webcodecs-ring.js'],
  ['web-broadcaster-replay/dist/webcodecs-capture.js', 'live-highlight/webcodecs-capture.js'],
  ['web-broadcaster-replay/dist/mediabunny-replay-muxer.js', 'live-highlight/mediabunny-replay-muxer.js'],
  ['web-broadcaster-replay/dist/indexeddb-sink.js', 'live-highlight/indexeddb-sink.js'],
  [
    'web-broadcaster-replay/node_modules/mediabunny/dist/bundles/mediabunny.min.mjs',
    'live-highlight/vendor/mediabunny.min.mjs',
  ],
];

for (const [source, destination] of files) {
  const target = join(webRoot, destination);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(join(repositoryRoot, source), target);
}

console.log(`Staged ${files.length} pinned FanView highlight runtime modules.`);
