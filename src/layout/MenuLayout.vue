<template>
  <app-header />
  <v-main id="main-content" class="light-blue lighten-5">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title>
              <breadcrumb :items="breadcrumbs" active-color="primary" class="pa-0 py-2" />
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
      <slot />
    </v-container>
    <back-to-top />
  </v-main>
</template>

<script setup>
import AppHeader from "@/layout/application/AppHeader.vue"
import BackToTop from "@/components/shared/BackToTop.vue"
import globalRouter from "@/router"
// import AppFab from "@/layout/application/AppFab"

defineOptions({
  name: "MenuLayout",
})

const breadcrumbs = computed(() => globalRouter.currentRoute.value.meta?.breads ?? [])
</script>

<style scoped></style>
