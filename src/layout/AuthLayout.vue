<template>
  <app-header />
  <v-main id="main-content" class="light-blue lighten-5">
    <slot />
    <back-to-top />
  </v-main>
</template>

<script setup name="AuthLayout">
import AppHeader from '@/layout/application/AppHeader.vue'
import BackToTop from '@/components/shared/BackToTop.vue'
</script>

<style scoped></style>
