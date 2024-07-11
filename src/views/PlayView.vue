<script setup lang="ts">
  import { inject, ref, computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import constants from '@/constants'
  import type { IDialogBox } from '@/injection'
  import { iDialogBox } from '@/injection'
  import Target from '@/components/Target.vue'

  const router = useRouter()
  const dialogBox = inject( iDialogBox ) as IDialogBox

  let lastTargetId = 0

  const countdown = ref( constants.gameDuration )
  const score = ref ( 0 )
  const targets = ref ( [] as number[] )

  const onGameOver = () => {
      dialogBox.say( `You scored ${ score.value } points` )
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

  const randomTimeout = () => Math.floor( Math.random() * 5000 ) + 1000 // Random timeout between 1 and 6 seconds

  const addTarget = () => {
      targets.value.push( ++lastTargetId )
      setTimeout( addTarget, randomTimeout() )
    }

  const onHit = ( targetId: number ) => {
      targets.value = targets.value.filter( id => id !== targetId )
    }

  onMounted( () => {
      const interval = setInterval( () => {
          if ( countdown.value > 0 ) {
            countdown.value -= 1
          } else {
            clearInterval(interval)
            onGameOver()
          }
        }, 1000 )
      addTarget()
    } )
</script>

<template>
  <div class="trgt-playground">
    <time :datetime="time.datetime">{{ time.countdown }}</time>
    <TransitionGroup name="trgt">
      <template v-for="id in targets" :key="id">
        <Target :id="id" @hit="onHit" />
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