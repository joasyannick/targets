<script setup lang="ts">
  import { ref, computed, provide } from 'vue'
  import { RouterView } from 'vue-router'
  import { iDialogBox } from '@/injection'
  import NightIcon from '@/components/icons/NightIcon.vue'
  import DialogBox from '@/components/DialogBox.vue'

  const message = ref( '' )
  const show = computed( () => message.value !== '' )
  const say = ( something: string ) => message.value = something
  const close = () => message.value = ''

  provide( iDialogBox, { message: message, show: show, say: say, close: close } )
</script>

<template>
  <header class="trgt-header">
    <NightIcon />
  </header>    
  <RouterView />
  <footer class="trgt-footer">
    <DialogBox />
  </footer>
</template>

<style scoped>
  header.trgt-header, footer.trgt-footer {
    position: absolute;
    z-index: 1;
  }

  header.trgt-header {
    display: inline-flex;
    left: 0;
    top: 0;
  }

  footer.trgt-footer {
    left: 0;
    bottom: 0;
  }
</style>