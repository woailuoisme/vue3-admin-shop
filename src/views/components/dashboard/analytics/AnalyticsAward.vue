<script setup>
import { useTheme } from "vuetify"
import { computed } from "vue"
import triangleDark from "@/assets/images/misc/triangle-dark.png"
import triangleLight from "@/assets/images/misc/triangle-light.png"
import trophy from "@/assets/images/misc/trophy.png"

const vuetifyTheme = useTheme()
const triangleBg = computed(() => {
  return vuetifyTheme.global.name.value === "light" ? triangleLight : triangleDark
})
</script>

<template>
  <v-card title="Congratulations John! 🎉" subtitle="Best seller of the month" class="position-relative">
    <v-card-text>
      <h5 class="text-2xl font-weight-medium text-primary">$42.8k</h5>
      <p>78% of target 🚀</p>
      <v-btn size="small">View Sales</v-btn>
    </v-card-text>

    <!-- Triangle Background -->
    <v-img :src="triangleBg" class="triangle-bg flip-in-rtl" />

    <!-- Trophy -->
    <v-img :src="trophy" class="trophy" />
  </v-card>
</template>

<style lang="scss">
.triangle-bg {
  position: absolute;
  inline-size: 10.375rem;
  inset-block-end: 0;
  inset-inline-end: 0;
}

.trophy {
  position: absolute;
  inline-size: 4.9375rem;
  inset-block-end: 2rem;
  inset-inline-end: 2rem;
}
</style>
