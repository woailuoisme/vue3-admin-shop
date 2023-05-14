<template>
  <v-app class="exception">
    <v-container fluid class="fill-height">
      <v-layout class="align-center justify-center">
        <div class="mr-3 hidden-sm-and-down">
          <img :src="auth500" />
        </div>
        <div class="text-md-center">
          <h1>500</h1>
          <h2 class="my-3 headline">{{ $t("error.server_down") }}</h2>
          <div>
            <v-btn color="primary" @click="goHome">{{ $t("go_home") }}</v-btn>
          </div>
        </div>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script setup>
import router from "@/router"
import { auth500 } from "@/assets"

function goHome() {
  router.push({ path: "/" })
}
</script>

<style lang="sass" scoped>
h1
  font-size: 150px
  line-height: 150px
  font-weight: 700
  color: #252932
  text-shadow: rgba(61, 61, 61, 0.3) 1px 1px, rgba(61, 61, 61, 0.2) 2px 2px, rgba(61, 61, 61, 0.3) 3px 3px
</style>
