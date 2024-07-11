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
  type Target = { x: number, y: number, arrival: Direction, departure: Direction, type: Type, clicked: boolean }

  let lastTargetId = 0

  const countdown = ref( constants.gameDuration )
  const score = ref ( 0 )
  const targets = ref ( new Map() as Map< number, Target > )

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
  
  const value = ( target: Target ) => {
      switch ( target.type ) {
        case Type.BOMB:
          return -50
        case Type.NORMAL:
          return 50
        case Type.BRONZE:
          return 100
        case Type.SILVER:
          return 150
        case Type.GOLD:
          return 200
      }
    }
  
  const classes = ( target: Target ) => {
      const results = []
      switch ( target.type ) {
        case Type.BOMB:
          results.push( 'trgt-bomb' )
          break
        case Type.NORMAL:
          results.push( 'trgt-normal' )
          break
        case Type.BRONZE:
          results.push( 'trgt-bronze' )
          break
        case Type.SILVER:
          results.push( 'trgt-silver' )
          break
        case Type.GOLD:
          results.push( 'trgt-gold' )
          break
      }
      switch ( target.arrival ) {
        case Direction.LEFT:
          results.push( 'trgt-arrival-left' )
          break
        case Direction.RIGHT:
          results.push( 'trgt-arrival-right' )
          break
        case Direction.UP:
          results.push( 'trgt-arrival-up' )
          break
        case Direction.DOWN:
          results.push( 'trgt-arrival-down' )
          break
      }
      switch ( target.departure ) {
        case Direction.LEFT:
          results.push( 'trgt-departure-left' )
          break
        case Direction.RIGHT:
          results.push( 'trgt-departure-right' )
          break
        case Direction.UP:
          results.push( 'trgt-departure-up' )
          break
        case Direction.DOWN:
          results.push( 'trgt-departure-down' )
          break
      }
      if ( target.clicked ) {
        results.push( 'trgt-clicked' )
      }
    }

  const style = ( target: Target ) => {
      return {
          left: `${ target.x }%`,
          top: `${ target.y }%`
        }
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
    } )
  
  const onTargetClick = ( id: number ) => {
      if ( targets.value.get( id ) ) {
        targets.value.get( id )!.clicked = true
        targets.value.delete( id )
        score.value += value( targets.value.get( id )! )
      }
    }
</script>

<template>
  <div class="trgt-playground">
    <time :datetime="time.datetime">{{ time.countdown }}</time>
    <TransitionGroup name="trgt">
      <template v-for="[ id, target ] in targets" :key="id">
        <svg :class="classes( target )" :style="style( target )" viewbox="0 0 100 100" @click="onTargetClick( id )">
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