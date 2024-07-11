<script setup lang="ts">
  import { ref, computed } from 'vue'

  const props = defineProps< { id: number } >()
  const emit = defineEmits< { hit: [ id: number ] } >()

  enum TargetType { BOMB, NORMAL, BRONZE, SILVER, GOLD }
  enum Direction { LEFT, RIGHT, UP, DOWN }

  const randomEnum = < T >( anEnum: T extends object ? T : never ): T[ keyof T ] => {
      const enumValues = Object.keys( anEnum )
          .map( n => Number.parseInt( n ) )
          .filter( n => ! Number.isNaN( n ) ) as unknown as T[ keyof T ][]
      return enumValues[ Math.floor( Math.random() * enumValues.length ) ];
    }
  
  const x = Math.random() * 100
  const y = Math.random() * 100
  const enter = randomEnum( Direction )
  const leave = randomEnum( Direction )
  const style = { left: `${ x }%`, top: `${ y }%` }
  const type = ref( randomEnum( TargetType ) )

  const value = computed( () => {
      switch ( type.value ) {
        case TargetType.BOMB:
          return -50
        case TargetType.NORMAL:
          return 50
        case TargetType.BRONZE:
          return 100
        case TargetType.SILVER:
          return 150
        case TargetType.GOLD:
          return 200
      }
    } )

  const classes = computed( () => {
      const results = []
      switch ( type.value ) {
        case TargetType.BOMB:
          results.push( 'trgt-bomb' )
          break
        case TargetType.NORMAL:
          results.push( 'trgt-normal' )
          break
        case TargetType.BRONZE:
          results.push( 'trgt-bronze' )
          break
        case TargetType.SILVER:
          results.push( 'trgt-silver' )
          break
        case TargetType.GOLD:
          results.push( 'trgt-gold' )
          break
      }
      switch ( enter ) {
        case Direction.LEFT:
          results.push( 'trgt-enter-left' )
          break
        case Direction.RIGHT:
          results.push( 'trgt-enter-right' )
          break
        case Direction.UP:
          results.push( 'trgt-enter-top' )
          break
        case Direction.DOWN:
          results.push( 'trgt-enter-bottom' )
          break
      }
      switch ( leave ) {
        case Direction.LEFT:
          results.push( 'trgt-leave-left' )
          break
        case Direction.RIGHT:
          results.push( 'trgt-leave-right' )
          break
        case Direction.UP:
          results.push( 'trgt-leave-up' )
          break
        case Direction.DOWN:
          results.push( 'trgt-leave-down' )
          break
      }
      return results
    } )
  
    const onHit = () => {
      emit( 'hit', props.id )
    }
</script>

<template>
  <svg :class="classes" :style="style" viewbox="0 0 100 100" @click="onHit">
    <circle cx="50" cy="50" r="50" />
  </svg>
</template>

<style>
</style>