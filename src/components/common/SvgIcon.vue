<template>
  <svg aria-hidden="true" v-bind="bindAttrs" class="d-flex flex-column justify-end">
    <use :href="symbolId" fill="currentColor" />
  </svg>
</template>

<script setup>
import { computed } from "vue"
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})
// const attrs = useAttrs()
const attrs = []
const bindAttrs = computed(() => ({
  class: attrs.class || "",
  style: attrs.style || "",
}))

const symbolId = computed(() => {
  const { VITE_ICON_PREFIX } = import.meta.env

  return `#${VITE_ICON_PREFIX}-${props.name}`
})
</script>
