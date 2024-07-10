<script setup lang="ts">
  import { inject, ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import constants from '@/constants'
  import type { IDialogBox } from '@/injection'
  import { iDialogBox } from '@/injection'

  const router = useRouter()
  const dialogBox = inject( iDialogBox ) as IDialogBox

  enum Type { BOMB, NORMAL, BRONZE, SILVER, GOLD }
  enum Direction { LEFT, RIGHT, UP, DOWN }
  type Target = { id: number, x: number, y: number, enter: Direction, leave: Direction, type: Type }

  const countdown = ref( constants.gameDuration )
  const score = ref ( 0 )
  const targets = ref ( [] as Target[] )

  const onGameOver = () => {
      dialogBox.say( `You scored ${ score } points` )
      router.push( '/' )
    }

  const time = computed( () => {
      const minutes = Math.floor( countdown.value / 60 )
      const seconds = countdown.value % 60
      return {
          datetime: `PT${ String( minutes ) }M${ String( seconds ) }S`,
          countdown: `${ String( minutes ).padStart( 2, '0' ) }:${ String( seconds ).padStart( 2, '0' ) }`
        }
    } )
  
  const classes = computed( () => targets.value.map( ( target ) => {
      switch ( target.type ) {
        case Type.BOMB:
          return 'trgt-bomb'
        case Type.NORMAL:
          return 'trgt-normal'
        case Type.BRONZE:
          return 'trgt-bronze'
        case Type.SILVER:
          return 'trgt-silver'
        case Type.GOLD:
          return 'trgt-gold'
      }
    } ) )

  onMounted( () => {
      const interval = setInterval( () => {
          if ( countdown.value > 0 ) {
            countdown.value -= 1
          } else {
            clearInterval(interval)
            onGameOver()
          }
        }, 1000 )
    } )
</script>

<template>
  <div class="trgt-playground">
    <time :datetime="time.datetime">{{ time.countdown }}</time>
    <TransitionGroup name="trgt">
      <template v-for="( target, index ) in targets" :key="target.id">
        <svg :class="classes[ index ]" viewbox="0 0 100 100">
          <circle cx="50" cy="50" r="50" />
        </svg>
      </template>
    </TransitionGroup>
  </div>
  
</template>

<style>
  div.trgt-playground {
    position: relative;
    width: 100%;
    height: 100%;
  }

  div.trgt-playground > time {
    position: absolute;
    left: 50%;
    top: 0;
    font-size: 2rem;
    transform: translateX(-50%);
  }
</style>