<template>
  <v-container class="fill-height" fruid>
    <v-row align="center" justify="center">
      <v-col cols="12" lg="4" md="6" sm="8" xm="12">
        <slot />
      </v-col>
    </v-row>
  </v-container>
  <!--  <app-footer></app-footer> -->
</template>

<script setup>
import AppFooter from "@/layout/application/AppFooter"

defineOptions({
  name: "AuthLayout",
})
</script>

<style scoped></style>
