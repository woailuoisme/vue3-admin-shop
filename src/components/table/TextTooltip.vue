<template>
  <v-tooltip :text="text" location="top">
    <template #activator="{ props }">
      <div class="d-inline-block text-truncate" style="max-width: 300px" v-bind="props">{{ text }}</div>
    </template>
  </v-tooltip>
</template>

<script setup>
import { defineProps, ref } from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.text-ellipsis {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
