<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <main :class="$style.app">
    <nav :class="$style.nav" aria-label="Demo pages">
      <RouterLink to="/pixi">PixiJS</RouterLink>
      <RouterLink to="/phaser">Phaser</RouterLink>
    </nav>
    <RouterView />
  </main>
</template>

<style module>
.app {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(135deg, rgba(37, 98, 97, 0.28), transparent 34%),
    linear-gradient(225deg, rgba(176, 75, 43, 0.22), transparent 38%), #171717;
}

.nav {
  position: fixed;
  z-index: 20;
  top: 14px;
  left: 50%;
  display: flex;
  gap: 8px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  background: rgba(20, 20, 20, 0.72);
  backdrop-filter: blur(16px);
  transform: translateX(-50%);
}

.nav a {
  min-width: 86px;
  padding: 8px 12px;
  border-radius: 6px;
  color: #d9ded9;
  text-align: center;
  text-decoration: none;
}

.nav a:global(.router-link-active) {
  color: #171717;
  background: #f2c46d;
}
</style>
