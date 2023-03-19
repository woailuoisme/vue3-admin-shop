<template>
  <v-icon icon="mdi-wifi" size="large">
    <v-tooltip location="top" activator="parent">
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </v-icon>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue"
import { clipboard } from "@/plugins/clipboard"
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  // Text to show on toast
  toastText: {
    type: String,
    default: "Copied to clipboard!",
  },
})

const tooltip = ref("Copy")
let timeout
onBeforeUnmount(() => {
  if (timeout) clearTimeout(timeout)
})
const copy = () => {
  clipboard(props.text, props.toastText)
  tooltip.value = "Copied!"
  timeout = setTimeout(() => {
    tooltip.value = "Copy"
  }, 1000)
}
</script>

<style scoped></style>
