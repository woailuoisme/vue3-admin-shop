<template lang="html">
  <div v-if="isEnded">Ended.</div>
  <div v-else>
    <span>Days: {{ data.days }}</span>
    <span>Hours: {{ data.hours }}</span>
    <span>Minutes: {{ data.minutes }}</span>
    <span>Seconds: {{ data.seconds }}</span>
  </div>
</template>

<script setup>
import {defineProps, onMounted, onUnmounted, reactive} from 'vue'

const props = defineProps({
  endDate: {
    type: Date, // Date.parse(this.endDate)
  },
})
let timer
const isEnded = ref(false)
let data = reactive({
  days: null,
  hours: null,
  minutes: null,
  seconds: null,
})

function updateRemaining(distance) {
  this.days = Math.floor(distance / (1000 * 60 * 60 * 24))
  this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  this.seconds = Math.floor((distance % (1000 * 60)) / 1000)
}

function tick() {
  const currentTime = new Date()
  const distance = Math.max(props.endDate - currentTime, 0)
  updateRemaining(distance)
  if (distance === 0) {
    clearInterval(timer)
    isEnded.value = true
  }
}

onMounted(() => {
  tick()
  timer = setInterval(tick.bind(this), 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

</script>
