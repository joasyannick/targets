<script setup lang="ts">
  import { RouterView } from 'vue-router'
  import Background from '@/components/images/Background.vue'
</script>

<template>
  <main>
    <Background />
    <RouterView />
  </main>
</template>

<style scoped>
  main {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: hsl(var(--TRGT-BACKGROUND-HUE), var(--TRGT-BACKGROUND-SATURATION), var(--trgt-background-lightness));
    transition: background-color var(--TRGT-NIGHT-TRANSITION-DURATION);
  }
</style>