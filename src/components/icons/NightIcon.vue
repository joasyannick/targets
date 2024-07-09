<script setup lang="ts">
  import { useNightStore } from '@/stores/night'
  const night = useNightStore()
</script>

<template>
  <svg class="trgt-night-icon" viewBox="0 0 417 417" @click="night.toggle()">
    <path d="M208.333,0c114.983,0 208.334,93.351 208.334,208.333c-0,114.983 -93.351,208.334 -208.334,208.334c-114.982,-0 -208.333,-93.351 -208.333,-208.334c-0,-114.982 93.351,-208.333 208.333,-208.333Zm0,374.147l0,-331.628c-91.515,0 -165.814,74.299 -165.814,165.814c0,91.516 74.299,165.814 165.814,165.814Z" />
  </svg>
</template>

<style scoped>
  svg.trgt-night-icon {
    width: 10px;
    height: 10px;
  }
</style>