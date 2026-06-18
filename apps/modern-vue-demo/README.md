# Modern Vue demo

Vue 3 SPA с двумя маршрутами:

- `/pixi` - PixiJS 8;
- `/phaser` - Phaser 3.

```bash
pnpm install
pnpm dev
```

Проверка и production preview:

```bash
pnpm --filter modern-vue-demo test
pnpm --filter modern-vue-demo typecheck
pnpm --filter modern-vue-demo build
pnpm --filter modern-vue-demo exec vite preview --host 127.0.0.1
```
