import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { LegacyPixiApplication } from '@/core/LegacyPixiApplication';
import { AppElements } from '@/types';

function getElement<T extends HTMLElement>(id: string): T {
  var element = document.getElementById(id);

  if (!element) {
    throw new Error('Missing required element #' + id);
  }

  return element as T;
}

var elements: AppElements = {
  root: getElement<HTMLElement>('app-root'),
  shell: getElement<HTMLElement>('game-shell'),
  canvas: getElement<HTMLCanvasElement>('game-canvas'),
};

var app = new LegacyPixiApplication(elements);
app.start();

window.addEventListener('beforeunload', function () {
  app.destroy();
});
