<template>
  <v-tooltip :text="text" location="top">
    <template v-slot:activator="{ props }">
      <div class="primary--text text-ellipsis" v-bind="props">{{ text }}</div>
    </template>
  </v-tooltip>
</template>

<script setup>
import {defineProps, ref} from 'vue'

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.text-ellipsis {
  max-width: 110px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
