import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const rootDir = resolve(import.meta.dirname, '..');
const modernDist = join(rootDir, 'apps/modern-vue-demo/dist');
const legacyDist = join(rootDir, 'apps/legacy-pixi-ie11/dist');

function getContentType(pathname) {
  switch (extname(pathname)) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

function createStaticServer(baseDir, fallbackToIndex) {
  const server = createServer(async (request, response) => {
    const url = new URL(request.url || '/', 'http://127.0.0.1');
    const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
    const filePath = join(baseDir, pathname);

    try {
      const body = await readFile(filePath);
      response.writeHead(200, { 'Content-Type': getContentType(filePath) });
      response.end(body);
    } catch {
      if (!fallbackToIndex) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }

      const body = await readFile(join(baseDir, 'index.html'));
      response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end(body);
    }
  });

  return new Promise((resolveServer) => {
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        throw new Error('Unable to start smoke server.');
      }
      resolveServer({
        baseUrl: `http://127.0.0.1:${address.port}`,
        close: () => new Promise((resolveClose) => server.close(resolveClose)),
      });
    });
  });
}

async function assertOk(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Expected 200 from ${url}, got ${response.status}`);
  }
  return response.text();
}

const modernServer = await createStaticServer(modernDist, true);
const legacyServer = await createStaticServer(legacyDist, false);

try {
  const modernRoot = await assertOk(`${modernServer.baseUrl}/`);
  await assertOk(`${modernServer.baseUrl}/pixi`);
  await assertOk(`${modernServer.baseUrl}/phaser`);

  if (!modernRoot.includes('type="module"')) {
    throw new Error('Modern build index.html does not include a module entry script.');
  }

  const legacyRoot = await assertOk(`${legacyServer.baseUrl}/`);
  if (
    !legacyRoot.includes('id="app-root"') ||
    !legacyRoot.includes('id="game-shell"') ||
    !legacyRoot.includes('id="game-canvas"')
  ) {
    throw new Error('Legacy build does not contain the required manual DOM elements.');
  }

  await assertOk(`${legacyServer.baseUrl}/app.js`);
  await assertOk(`${legacyServer.baseUrl}/styles.css`);
  console.log('Smoke checks passed.');
} finally {
  await modernServer.close();
  await legacyServer.close();
}
