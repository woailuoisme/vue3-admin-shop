<template>
  <v-fade-transition hide-on-leave>
    <v-dialog v-model="dialog" width="auto">
      <template #activator="{ props }">
        <v-btn color="primary" size="large" icon="mdi-eye" v-bind="props"></v-btn>
      </template>
      <v-card v-if="dialog" append-icon="mdi-close" class="mx-auto" elevation="16" max-width="500">
        <template #append>
          <v-btn icon="mdi-close" variant="text" @click="dialog = false"></v-btn>
        </template>
        <v-divider></v-divider>

        <v-img aspect-ratio="16/9" cover src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"></v-img>

        <v-divider></v-divider>

        <div class="pa-4 text-end">
          <v-btn class="text-none" color="medium-emphasis" min-width="92" rounded variant="outlined" @click="dialog = false">Close</v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-fade-transition>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(["update"])

const dialog = ref(false)
</script>

<style scoped></style>
