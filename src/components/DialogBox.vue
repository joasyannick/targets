<script setup lang="ts">
  import { inject } from 'vue'
  import type { IDialogBox } from '@/injection'
  import { iDialogBox } from '@/injection'

  const dialogBox = inject( iDialogBox ) as IDialogBox
</script>

<template>
  <aside class="trgt-dialog-box" v-show="dialogBox.show.value">
    <p v-html="dialogBox.message.value"></p>
    <button type="button" @click="dialogBox.close">OK</button>
  </aside>
</template>

<style>
</style>
