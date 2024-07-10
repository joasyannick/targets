<script setup lang="ts">
  import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink class="trgt-play-link" to="/play">Play</RouterLink>
</template>

<style scoped>
  a.trgt-play-link {
    all: unset;
    cursor: default;
    position: absolute;
    left: 50%;
    top: 50%;
    border-radius: 15%/50%;
    padding: 0.25rem 4rem;
    font-size: 2rem;
    background-color: hsl(calc(var(--TRGT-BUTTON-HUE)), var(--TRGT-BACKGROUND-SATURATION), calc(var(--trgt-background-lightness) - (var(--trgt-night-sign)) * 15%));
    color: hsl(calc(var(--TRGT-BUTTON-HUE)), var(--TRGT-TEXT-SATURATION), calc(var(--trgt-text-lightness)));
    transform: translate(-50%, -50%);
    transition:
        background-color var(--TRGT-NIGHT-TRANSITION-DURATION),
        color var(--TRGT-NIGHT-TRANSITION-DURATION);
  }
</style>