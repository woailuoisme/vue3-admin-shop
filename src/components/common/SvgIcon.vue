<template>
  <svg aria-hidden="true" class="icon">
    <use :fill="color" :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
  size: {
    type: String,
    default: "24px",
  },
})

const size = ref(props?.size ?? "24px")

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<style lang="scss" scoped>
.icon {
  height: v-bind(size);
  width: v-bind(size);

  &.icon-round {
    background-size: cover;
    border-radius: 100%;
    height: 26px;
    width: 26px;
  }
}
</style>
