<script setup lang="ts">
  import { inject } from 'vue'
  import type { IDialogBox } from '@/injection'
  import { iDialogBox } from '@/injection'

  const dialogBox = inject( iDialogBox ) as IDialogBox  
</script>

<template>
  <aside class="trgt-dialog-box" v-show="dialogBox.show.value">
    <p>{{ dialogBox.message.value }}</p>
    <button type="button" @click="dialogBox.close">OK</button>
  </aside>
</template>

<style>
  aside.trgt-dialog-box {
    --trgt-dialog-box-lightness: (var(--trgt-background-lightness) + (var(--trgt-night-sign)) * 2.5%);
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    background-color: hsl(calc(var(--TRGT-BACKGROUND-HUE) + 30), var(--TRGT-BACKGROUND-SATURATION), calc(var(--trgt-dialog-box-lightness)), 0.9);
  }

  aside.trgt-dialog-box > button {
    all: unset;
    cursor: default;
    border-radius: 15%/50%;
    padding: 0.25rem 4rem;
    background-color: hsl(calc(var(--TRGT-BUTTON-HUE) + 30), var(--TRGT-BACKGROUND-SATURATION), calc(var(--trgt-dialog-box-lightness) - (var(--trgt-night-sign)) * 15%));
    color: hsl(calc(var(--TRGT-BUTTON-HUE) + 30), var(--TRGT-TEXT-SATURATION), calc(var(--trgt-text-lightness)));
  }
</style>