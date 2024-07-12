<script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'

  const props = defineProps< { targetId: number } >()
  const emit = defineEmits< { hit: [ targetId: number, value: number ], timeout: [ targetId: number ] } >()

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
  const type = ref( randomEnum( TargetType ) )
  let timeout = 0

  const style = { left: `${ x }%`, top: `${ y }%` }

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
  
    const color = computed( () => {
      let hue = 210
      let saturation = 100
      let lightness = 50
      switch ( type.value ) {
        case TargetType.BOMB:
          hue = 0
          break
        case TargetType.BRONZE:
          hue = 30
          saturation = 60
          break
        case TargetType.SILVER:
          saturation = 0
          lightness = 75
          break
        case TargetType.GOLD:
          hue = 50
          break
      }
      return `hsl( ${ hue }, ${ saturation }%, ${ lightness }% )`
    } )

    const duration = computed( () => {
        switch ( type.value ) {
          case TargetType.BOMB:
            return 4
          case TargetType.NORMAL:
            return 4
          case TargetType.BRONZE:
            return 3
          case TargetType.SILVER:
            return 2
          case TargetType.GOLD:
            return 1
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
          results.push( 'trgt-enter-up' )
          break
        case Direction.DOWN:
          results.push( 'trgt-enter-down' )
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
      emit( 'hit', props.targetId, value.value )
    }

  onMounted( () => timeout = setTimeout( () => emit( 'timeout', props.targetId ), duration.value * 1000 ) )
  
  onUnmounted( () => clearTimeout( timeout ) )
</script>

<template>
  <div>
  <svg class="trgt-target" :class="classes" :style="style" viewbox="0 0 100 100" @click="onHit">
    <circle :fill="color" cx="50" cy="50" r="50" />
  </svg>
  </div>

</template>

<style>
  svg.trgt-target {
    display: flex;
    position: absolute;
    width: 100px;
    height: 100px;
  }
</style>