import { cp, mkdir, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const rootDir = resolve(import.meta.dirname, '..');
const outputDir = join(rootDir, 'pages-dist');

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(join(rootDir, 'apps/modern-vue-demo/dist'), outputDir, { recursive: true });
await cp(join(rootDir, 'apps/legacy-pixi-ie11/dist'), join(outputDir, 'legacy'), {
  recursive: true,
});
await cp(join(outputDir, 'index.html'), join(outputDir, '404.html'));

console.log('GitHub Pages artifact prepared in pages-dist/.');
