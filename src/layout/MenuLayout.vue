<template>
  <app-header />
  <v-main id="main-content" class="light-blue lighten-5">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <breadcrumb :items="breadcrumbs" />
          </v-card>
        </v-col>
      </v-row>
      <slot />
    </v-container>
    <back-to-top />
  </v-main>
</template>

<script setup name="MenuLayout">
import AppHeader from '@/layout/application/AppHeader.vue'
import BackToTop from '@/components/shared/BackToTop.vue'
import globalRouter from '@/router'
import { computed } from 'vue'

const breadcrumbs = computed(() => globalRouter.currentRoute.value.meta?.breads ?? [])
</script>

<style scoped></style>
