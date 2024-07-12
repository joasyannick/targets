<script setup lang="tsx">
  import { defineComponent, inject, ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRouter } from 'vue-router'
  import constants from '@/constants'
  import type { IDialogBox } from '@/injection'
  import { iDialogBox } from '@/injection'
  import Target from '@/components/Target.vue'

  const Countdown = defineComponent( ( _, { emit } ) => {
      let interval = 0
      const timeLeft = ref( constants.gameDuration )

      const formatted = computed( () => {
          const minutes = Math.floor( timeLeft.value / 60 )
          const seconds = timeLeft.value % 60
          return {
              datetime: `PT${ String( minutes ) }M${ String( seconds ) }S`,
              countdown: `${ String( minutes ).padStart( 2, '0' ) }:${ String( seconds ).padStart( 2, '0' ) }`
            }
        } )

      onMounted( () => {
          interval = setInterval( () => {
              if ( timeLeft.value > 0 ) {
                timeLeft.value -= 1
              } else {
                clearInterval(interval)
                emit( 'gameOver' )
              }
            }, 1000 )
        } )
      
      onUnmounted( () => clearInterval( interval ) )

      return () => ( <time datetime={ formatted.value.datetime }>{ formatted.value.countdown }</time> )
    } )

  const router = useRouter()
  const dialogBox = inject( iDialogBox ) as IDialogBox
  const minDelayBetweenTargets = 1
  const maxDelayBetweenTargets = 8

  let lastTargetId = 0
  let timeout = 0

  const score = ref ( 0 )
  const targets = ref ( [] as number[] )

  const randomDelay = () => Math.floor( Math.random() * ( maxDelayBetweenTargets - minDelayBetweenTargets + 1 ) + minDelayBetweenTargets )

  const addTarget = () => {
      targets.value.push( ++lastTargetId )
      timeout = setTimeout( addTarget, randomDelay() * 1000 )
    }

  const onHit = ( targetId: number, value: number ) => {
      score.value += value
      targets.value = targets.value.filter( target => target !== targetId )
    }
  
  const onTimeout = ( targetId: number ) => {
      targets.value = targets.value.filter( target => target !== targetId )
    }

  const onGameOver = () => {
      dialogBox.say( `You scored ${ score.value } points` )
      router.push( '/' )
    }

  onMounted( () => addTarget() )
  
  onUnmounted( () => clearTimeout( timeout ) )
</script>

<template>
  <div class="trgt-playground">
    <Countdown clas="trgt-timer" @gameOver="onGameOver" />
    <span class="trgt-score">{{ score }}</span>
    <TransitionGroup name="trgt">
      <template v-for="target in targets" :key="target">
        <Target :target-id="target" @hit="onHit" @timeout="onTimeout" />
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