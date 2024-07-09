import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useNightStore = defineStore( 'night', () => {

  const storageKey = 'trgt.night'
  const storedNight = localStorage.getItem( storageKey )

  const night = ref( storedNight ? storedNight === 'true' : matchMedia( '( prefers-color-scheme : dark )' ).matches )

  const toggle = () => night.value = ! night.value

  watch( night, ( now ) => {
      localStorage.setItem( storageKey, now.toString() )
      if ( now ) {
        document.getElementById( 'trgt-app' )!.dataset.trgtNight = ''
      } else {
        delete document.getElementById( 'trgt-app' )!.dataset.trgtNight
      }
    }, { immediate: true } )

  return { night, toggle }
} )