<template>
  <v-container class="fill-height" fluid>
    <iframe class="fill-height w-100" :src="src"></iframe>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue"

const src = ref("https://cn.vitejs.dev/")
</script>

<style scoped></style>
