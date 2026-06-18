# HTML5 / TypeScript animation test

Монорепозиторий содержит две независимые реализации тестового задания: современное Vue-приложение с PixiJS и Phaser и отдельную legacy-сборку PixiJS 5 для IE11.

## Техническое задание

- логическая сцена и фон `1000x600`;
- центральный анимированный объект не меньше `400x400`, минимум 5 кадров;
- реализация анимации через PixiJS или Phaser;
- плавное перемещение к клику или тапу, по возможности по нелинейной траектории;
- политика быстрых нажатий `latest target wins`;
- корректная работа рядом с границами сцены;
- реакция на resize, orientation change, вход и выход из fullscreen;
- desktop и mobile режимы;
- desktop scaling по меньшей стороне с максимумом `1280x768` и центрированием;
- mobile scaling до максимально доступного размера с центрированием;
- запрос mobile fullscreen на первом пользовательском жесте и повторная попытка после отказа;
- ООП-структура с выделенными сущностями и системами;
- динамические параметры в конфигурационных файлах;
- отдельная legacy-реализация без Vue, с ES5-транспиляцией, polyfills и fullscreen fallbacks для IE11.

## Структура

- `apps/modern-vue-demo` - Vue 3, Vite, PixiJS 8, Phaser 3, маршруты `/pixi` и `/phaser`;
- `apps/legacy-pixi-ie11` - PixiJS 5, Webpack, Babel, `core-js`, статический HTML;

```bash
pnpm install
```

## Запуск

```bash
pnpm dev          # modern: http://127.0.0.1:5173
pnpm dev:legacy   # legacy: http://127.0.0.1:5174
```

Подробности: [modern README](./apps/modern-vue-demo/README.md) и [legacy README](./apps/legacy-pixi-ie11/README.md).

## Проверки

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm smoke        # требует предварительный pnpm build
pnpm format:check
pnpm check        # полный локальный pipeline
```
