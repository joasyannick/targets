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
  <header><NightIcon /></header>
  <DialogBox />
  <RouterView />
</template>

<style scoped>

</style>
