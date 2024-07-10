<script setup lang="ts">
import { inject, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import constants from '@/constants'
import type { IDialogBox } from '@/injection'
import { iDialogBox } from '@/injection'

const router = useRouter()
const dialogBox = inject(iDialogBox) as IDialogBox

enum Type { BOMB, NORMAL, BRONZE, SILVER, GOLD }
enum Direction { LEFT, RIGHT, UP, DOWN }
type Target = { id: number, x: number, y: number, enter: Direction, leave: Direction, type: Type }

const countdown = ref(constants.gameDuration)
const score = ref(0)
const targets = ref([] as Target[])

// Global counter for target IDs
let targetIdCounter = 0

const onGameOver = () => {
  dialogBox.say(`You scored ${score.value} points`)
  router.push('/')
}

const time = computed(() => {
  const minutes = Math.floor(countdown.value / 60)
  const seconds = countdown.value % 60
  return {
    datetime: `PT${String(minutes)}M${String(seconds)}S`,
    countdown: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
} )

const classes = computed(() => targets.value.map((target) => {
  switch (target.type) {
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
}))

const generateRandomInterval = () => Math.floor(Math.random() * 5000) + 1000 // Random interval between 1 and 6 seconds

const getRandomEnumValue = <T>(enumObj: T): T[keyof T] => {
  const enumValues = Object.values(enumObj)
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  return enumValues[randomIndex]
}

const addTarget = () => {
  const newTarget: Target = {
    id: ++targetIdCounter, // Increment the global counter for each new target
    x: Math.random() * 100,
    y: Math.random() * 100,
    enter: getRandomEnumValue(Direction),
    leave: getRandomEnumValue(Direction),
    type: getRandomEnumValue(Type)
  }
  targets.value.push(newTarget)
  setTimeout(addTarget, generateRandomInterval())
}

onMounted(() => {
  const countdownInterval = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
    } else {
      clearInterval(countdownInterval)
      onGameOver()
    }
  }, 1000)

  addTarget() // Add the first target immediately
})
</script>

<template>
  <div>
    <p>Time left: {{ time.countdown }}</p>
    <!-- Other template code -->
  </div>
</template>

<style>
/* Add your styles here */
</style>