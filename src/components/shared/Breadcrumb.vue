<template>
  <v-breadcrumbs :items="items" active-color="primary">
    <template #divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
    <template #prepend>
      <v-icon size="small" color="primary" icon="mdi-home"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup>
import { defineProps } from "vue"

const props = defineProps({
  items: {
    type: Array,
  },
})
</script>

<style scoped></style>
