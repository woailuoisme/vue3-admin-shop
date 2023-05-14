<template>
  <v-footer class="d-flex justify-space-between" app border height="20">
    <span>Copyright ©2021 Vuetify Admin</span>
    <span class="px-4 py-2 bg-gray text-center">Today: {{ formatted }}</span>
    <span>距离 {{ year }} 年 结束 ：{{ timer.days }} 天, {{ timer.hours }} 小时, {{ timer.minutes }} 分钟, {{ timer.seconds }} 秒</span>
  </v-footer>
</template>

<script setup>
import { useTimer } from "vue-timer-hook"
import dayjs from "dayjs"

const diff = dayjs().diff(dayjs().startOf("year"), "seconds")

const time = new Date()
time.setSeconds(time.getSeconds() + diff)
const timer = useTimer(time)

const formatted = dayjs().format("YYYY MM DD")

onMounted(() => {
  timer.start()
})

onUnmounted(() => {
  timer.pause()
})
</script>
