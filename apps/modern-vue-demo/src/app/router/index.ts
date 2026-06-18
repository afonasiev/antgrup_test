import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/pixi' },
    {
      path: '/pixi',
      component: () => import('@/pages/pixi-demo').then((module) => module.PixiDemoPage),
    },
    {
      path: '/phaser',
      component: () => import('@/pages/phaser-demo').then((module) => module.PhaserDemoPage),
    },
  ],
});
