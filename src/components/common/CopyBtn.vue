<template>
  <div class="animate__faster">
    <v-icon v-if="copied" icon="mdi-check-circle" color="success" size="large" />
    <v-icon v-else icon="mdi-content-copy" size="large" @click.stop="copyText" />
    <v-tooltip location="top" activator="parent">
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script setup>
import { useClipboard } from "@vueuse/core"

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  toastText: {
    type: String,
    default: "Copied to clipboard!",
  },
})
let timeout
const tooltip = ref("Copy")
const { text, copy, copied, isSupported } = useClipboard()
const copyText = () => {
  if (isSupported) copy(props.text)
  tooltip.value = "Copied!"
  timeout = setTimeout(() => {
    tooltip.value = "Copy"
    copied.value = false
  }, 1000)
}

onBeforeUnmount(() => {
  if (timeout) clearTimeout(timeout)
})
</script>

<style scoped></style>
