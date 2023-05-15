<template>
  <v-row>
    <v-col col="12">
      <v-toolbar>
        <v-toolbar-title>{{ $t("user.profile.title") }}</v-toolbar-title>
      </v-toolbar>

      <v-divider thickness="4" />

      <v-card class="my-2">
        <v-tabs v-model="tab" color="primary" align-tabs="start" grow>
          <v-tab value="one">
            <v-icon start>mdi-account</v-icon>
            Account
          </v-tab>
          <v-divider vertical thickness="1" />
          <v-tab value="two">
            <v-icon start>mdi-lock</v-icon>
            Security
          </v-tab>
          <v-divider vertical thickness="1" />
          <v-tab value="three">
            <v-icon start>mdi-access-point</v-icon>
            Notifications
          </v-tab>
          <v-tab value="four">
            <v-icon start>mdi-access-point</v-icon>
            Activity
          </v-tab>
        </v-tabs>
      </v-card>
      <v-card>
        <v-window v-model="tab">
          <v-window-item value="one">
            <account></account>
          </v-window-item>
          <v-window-item value="two">
            <security />
          </v-window-item>
          <v-window-item value="three">
            <notification />
          </v-window-item>
          <v-window-item value="four">
            <activity />
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue"

const tab = ref("one")
import Account from "./components/userProfile/Account"
import Notification from "./components/userProfile/Notification"
import Security from "./components/userProfile/Security"
import Activity from "@/views/components/userProfile/Activity"
</script>

<style scoped></style>
