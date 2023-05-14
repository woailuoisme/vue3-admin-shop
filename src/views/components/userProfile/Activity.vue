<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <div class="ml-3">{{ $t("dashboard.activity") }}</div>
      <v-spacer></v-spacer>
      <v-menu left offset-y transition="slide-y-transition">
        <template #activator="{ props }">
          <v-btn flat icon v-bind="props">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list density="comfortable">
          <v-list-item
            v-for="(item, index) in menuItems"
            :key="index"
            :disabled="item?.disabled"
            :prepend-icon="item.icon"
            :title="item.text"
            :to="item?.link"
            link
          ></v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-divider inset thickness="2"></v-divider>
    <v-card-text>
      <perfect-scrollbar>
        <v-timeline density="comfortable" side="end">
          <v-timeline-item v-for="(item, index) in activity" :key="index" :dot-color="item.color" size="small">
            <!--            <template v-slot:icon> -->
            <!--              <v-avatar image="https://i.pravatar.cc/64"></v-avatar> -->
            <!--            </template> -->
            <template #opposite>
              <span>{{ item.when }}</span>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="text-h6">
                {{ item.where }}
              </v-card-title>
              <v-card-text>{{ item.what }}</v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </perfect-scrollbar>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { reactive } from "vue"

const menuItems = reactive([
  { icon: "mdi-refresh", text: "Refresh" },
  { icon: "mdi-delete-outline", text: "Clear" },
])

const activity = reactive([
  {
    what: "New Emoji",
    where: "Chat App",
    when: "4pm",
    color: "primary",
  },
  {
    what: "Design Stand Up",
    where: "Chat App",
    when: "2pm",
    color: "secondary",
  },
  {
    what: "Lunch Break",
    where: "",
    when: "11am",
    color: "info",
  },
  {
    what: "Answer Emails",
    where: "Work work",
    when: "9pm",
    color: "success",
  },
  {
    what: "Answer Emails",
    where: "Work work",
    when: "9pm",
    color: "warning",
  },
])
</script>
