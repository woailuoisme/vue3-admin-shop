<template>
  <v-layout-item model-value position="bottom" class="text-end" size="88">
    <div class="ma-4">
      <v-btn icon="mdi-plus" size="large" color="primary" elevation="8" />
    </div>
  </v-layout-item>
</template>

<script setup>
// import { VSpeedDial } from 'vuetify/lib/components/VSpeedDial'
const props = defineProps({
  book: Object,
})

const emit = defineEmits(["update"])
</script>

<style scoped></style>
