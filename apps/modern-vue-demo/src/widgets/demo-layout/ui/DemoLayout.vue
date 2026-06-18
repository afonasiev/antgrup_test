<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <section :class="$style.layout">
    <div :class="$style.surface">
      <slot />
    </div>
    <div :class="$style.label">{{ title }}</div>
  </section>
</template>

<style module>
.layout {
  position: relative;
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
}

.surface {
  position: relative;
  width: 100%;
  height: 100%;
}

.label {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  padding: 8px 10px;
  border-radius: 6px;
  color: rgba(247, 247, 244, 0.82);
  background: rgba(20, 20, 20, 0.58);
}
</style>
