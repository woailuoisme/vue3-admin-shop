<template>
  <v-app>
    <component :is="layout">
      <router-view />
    </component>
  </v-app>
</template>

<script setup>
import { computed } from "vue"
import router from "@/router"
import { pascale } from "@/utils"

const layout = computed(() => {
  console.log("Layout=====" + router.currentRoute.value.meta?.layout)
  const metaLayout = router.currentRoute.value.meta?.layout
  if (metaLayout) {
    return pascale(metaLayout) + "Layout"
  }
  return "DefaultLayout"
})
</script>

<style></style>
