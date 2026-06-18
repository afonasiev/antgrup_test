<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { DemoLayout } from '@/widgets/demo-layout';
import canvasStyles from '@/shared/styles/canvas-surface.module.css';
import { PixiGameApp } from '../model/PixiGameApp';
import type { PixiDemoPageState } from '../model/pixi-demo-page.types';

const hostRef = ref<HTMLElement | null>(null);
const state = ref<PixiDemoPageState>({ isReady: false });
let game: PixiGameApp | null = null;

onMounted(async () => {
  if (!hostRef.value) {
    return;
  }

  const instance = new PixiGameApp(hostRef.value);
  game = instance;
  await instance.init();

  if (game !== instance) {
    return;
  }

  state.value.isReady = true;
});

onUnmounted(() => {
  game?.destroy();
  game = null;
});
</script>

<template>
  <DemoLayout title="PixiJS">
    <div ref="hostRef" :class="canvasStyles.host" :data-ready="state.isReady" />
  </DemoLayout>
</template>
