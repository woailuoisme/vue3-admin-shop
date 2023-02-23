<template>
  <v-footer class="d-flex flex-row " app border height="20">
    <v-spacer></v-spacer>
    <div class="px-4 py-2 bg-gray text-center w-100">
      {{ timestamp }} — Vuetify
    </div>
  </v-footer>
</template>

<script setup>
import {onMounted, ref} from 'vue'

const dateFormat = (dt) => {
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr)
  return `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(
    dt.getSeconds()
  )}`
}

function getNow() {
  const today = new Date()
  timestamp.value = dateFormat(today)
}

onMounted(() => {
  // setInterval(getNow, 1000)
})

const timestamp = ref(dateFormat(new Date()))
</script>
