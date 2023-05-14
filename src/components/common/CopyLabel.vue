<template>
  <div ref="copyLabel" class="copy—label animate__faster" @click.stop.prevent="copy">
    {{ text }}
    <v-tooltip location="top" activator="parent">
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from "vue"
import { clipboard } from "@/plugins/clipboard"
import { animate } from "@/plugins/animate"
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
  animation: {
    type: String,
    default: "heartBeat",
  },
})
const tooltip = ref("Copy")
const copyLabel = ref()
let timeout
onBeforeUnmount(() => {
  if (timeout) clearTimeout(timeout)
})
const copy = () => {
  if (copyLabel.value) {
    animate(copyLabel.value, props.animation)
  }
  clipboard(props.text, props.toastText)

  tooltip.value = "Copied!"
  timeout = setTimeout(() => {
    tooltip.value = "Copy"
  }, 2000)
}
</script>

<style scoped>
.copy—label {
  cursor: pointer;
  display: inline-block;
  border-bottom: 1px dashed;
}
</style>
