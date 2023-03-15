<template>
  <span>
    <span v-if="value === 0">{{ value }}%</span>
    <span v-else-if="value > 0" class="text-success">
      <v-icon small color="success">mdi-arrow-top-right</v-icon>
      {{ value }}%
    </span>
    <span v-else class="text-error">
      <v-icon small color="error">mdi-arrow-bottom-right</v-icon>
      {{ Math.abs(value) }}%
    </span>
  </span>
</template>

<script setup>
defineProps({
  value: {
    type: Number,
    default: 0,
  },
})
</script>
