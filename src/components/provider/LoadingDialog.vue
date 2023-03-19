<template>
  <v-dialog v-model="dialog" scrim persistent width="auto">
    <v-card color="primary">
      <v-card-text>
        <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from "vue"

const dialog = ref(false)

watch(dialog, () => {
  setTimeout(() => {
    dialog.value = false
  }, 3000)
})
</script>

<style scoped></style>
