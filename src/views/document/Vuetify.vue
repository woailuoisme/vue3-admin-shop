<template>
  <v-container class="fill-height" fluid>
    <iframe class="fill-height w-100" :src="src"></iframe>
  </v-container>
</template>

<script setup>

const src = ref("https://www.naiveui.com/zh-CN/os-theme/docs/introduction")
</script>

<style scoped></style>
