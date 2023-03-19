<template>
  <v-btn color="default" icon size="small" variant="text" @click="change">
    <v-icon :icon="iconName" size="30" />
  </v-btn>
</template>

<script setup>
import { useFullscreen } from "@vueuse/core"

const { isSupported, toggle, isFullscreen } = useFullscreen()

const iconName = computed(() => (isFullscreen.value ? "mdi-fullscreen-exit" : "mdi-fullscreen"))
console.log(isFullscreen.value)

function change() {
  if (isSupported) {
    toggle()
  }
}
</script>

<style scoped></style>
