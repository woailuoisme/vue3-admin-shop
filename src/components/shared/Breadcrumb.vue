<template>
  <v-breadcrumbs :items="items">
    <template #divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup>

import {defineProps} from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: [],
  },
})

</script>

<style scoped></style>
