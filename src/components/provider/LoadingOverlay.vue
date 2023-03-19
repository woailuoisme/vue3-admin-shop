<template>
  <v-overlay :model-value="overlay" class="align-center justify-center">
    <v-progress-circular color="primary" indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script setup>
import { ref, watch } from "vue"

const overlay = ref(false)

watch(overlay, () => {
  setTimeout(() => {
    overlay.value = false
  }, 3000)
})
</script>

<style scoped></style>
