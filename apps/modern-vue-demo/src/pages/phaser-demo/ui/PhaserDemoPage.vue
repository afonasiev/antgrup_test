<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { DemoLayout } from '@/widgets/demo-layout';
import canvasStyles from '@/shared/styles/canvas-surface.module.css';
import { ScaleController } from '@/features/canvas-resize/model/ScaleController';
import { FullscreenController } from '@/features/fullscreen-request/model/FullscreenController';
import { PhaserGameFactory } from '../model/PhaserGameFactory';
import type { PhaserDemoPageState } from '../model/phaser-demo-page.types';

const hostRef = ref<HTMLElement | null>(null);
const state = ref<PhaserDemoPageState>({ isReady: false });
const factory = new PhaserGameFactory();
const scaleController = new ScaleController();
let game: Phaser.Game | null = null;
let resizeObserver: ResizeObserver | null = null;
let fullscreenController: FullscreenController | null = null;

function applyCanvasScale(): void {
  if (!hostRef.value || !game) {
    return;
  }

  scaleController.apply(hostRef.value, game.canvas);
}

onMounted(() => {
  if (!hostRef.value) {
    return;
  }

  game = factory.create(hostRef.value);
  fullscreenController = new FullscreenController(hostRef.value);
  fullscreenController.bindGestureListeners(hostRef.value);
  applyCanvasScale();
  resizeObserver = new ResizeObserver(applyCanvasScale);
  resizeObserver.observe(hostRef.value);
  document.addEventListener('fullscreenchange', applyCanvasScale);
  document.addEventListener('webkitfullscreenchange', applyCanvasScale);
  window.addEventListener('orientationchange', applyCanvasScale);
  state.value.isReady = true;
});

onUnmounted(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  fullscreenController?.unbindGestureListeners();
  fullscreenController = null;
  document.removeEventListener('fullscreenchange', applyCanvasScale);
  document.removeEventListener('webkitfullscreenchange', applyCanvasScale);
  window.removeEventListener('orientationchange', applyCanvasScale);

  if (game) {
    factory.destroy(game);
    game = null;
  }
});
</script>

<template>
  <DemoLayout title="Phaser">
    <div ref="hostRef" :class="canvasStyles.host" :data-ready="state.isReady" />
  </DemoLayout>
</template>
