<template>
  <v-app>
    <AppHeader/>
    <v-main id="main-content" class="light-blue lighten-5">
      <router-view/>
      <BackToTop/>
    </v-main>
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/application/AppHeader.vue'
import BackToTop from '@/components/shared/BackToTop.vue'</script>
