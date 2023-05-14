<template>
  <v-progress-linear
    v-if="show"
    ref="root"
    :style="{ position: 'fixed', top: `${top}px`, left: `${left}px`, zIndex: 1000 }"
    :value="scrollPercentage"
    color="primary"
    height="5"
    rounded
  />
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  top: {
    type: Number,
    default: 24,
  },
  left: {
    type: Number,
    default: 24,
  },
})
const root = ref()
const scroll = useScroll(root.value)
const scrollPercentage = ref(0)

watch(scroll, () => {
  const totalHeight = document.body.clientHeight - window.innerHeight
  const currentScroll = scroll.value.y
  scrollPercentage.value = (currentScroll / totalHeight) * 100
})
</script>
