<template>
  <v-footer class="d-flex justify-space-between" app border height="20">
    <span class="px-4 py-2 bg-gray text-center">Today: {{ timestamp }}</span>
    <vue-countdown v-slot="{ days, hours, minutes, seconds }" :time="diffYear">
      距离 {{ year }} 年 结束 ：{{ days }} days, {{ hours }} hours, {{ minutes }} minutes, {{ seconds }} seconds.
    </vue-countdown>
  </v-footer>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import { getYear, endOfYear, differenceInMilliseconds, format } from 'date-fns'

const now = new Date()
const year = getYear(now)
// debugger
const diffYear = differenceInMilliseconds(endOfYear(now), now)

function getNow() {
  const today = new Date()
  timestamp.value = format(today, 'yyyy-MM-dd')
}

onMounted(() => {
  // setInterval(getNow, 60000)
})

onUnmounted(() => {
  // clearInterval(getNow)
})

const timestamp = ref(format(new Date(), 'yyyy-MM-dd'))
</script>
