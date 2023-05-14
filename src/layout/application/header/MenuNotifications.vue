<template>
  <v-menu left offset-y transition="slide-y-transition">
    <template #activator="{ props }">
      <!--      <v-btn class="text-none" icon v-bind="props"> -->
      <!--        <v-badge bordered color="primary" content="6"> -->
      <!--          <v-icon>mdi-bell-outline</v-icon> -->
      <!--        </v-badge> -->
      <!--      </v-btn> -->
      <v-btn class="text-none" icon v-bind="props">
        <v-badge content="2" color="error">
          <v-icon>mdi-bell-outline</v-icon>
        </v-badge>
      </v-btn>
    </template>

    <!-- dropdown card -->
    <v-card>
      <v-list dense max-height="400" max-width="400" three-line>
        <v-list-subheader class="pa-2 font-weight-bold">Notifications</v-list-subheader>
        <perfect-scrollbar>
          <div v-for="(item, index) in items" :key="index">
            <v-list-item :subtitle="item.subtitle" :title="item.title">
              <template #prepend>
                <v-avatar :color="item.color" :icon="item.icon" size="32"></v-avatar>
              </template>
              <v-list-item-action class="align-self-center">{{ item.time }}</v-list-item-action>
            </v-list-item>
            <v-divider thickness="2" color="primary" class="opacity-90"></v-divider>
          </div>
        </perfect-scrollbar>
      </v-list>

      <div class="text-center py-2">
        <v-btn block>See all</v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup>
import { ref } from "vue"

const items = ref([
  {
    title: "Brunch this weekend?",
    color: "primary",
    icon: "mdi-account-circle",
    subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "3 min",
  },
  {
    title: "Summer BBQ",
    color: "success",
    icon: "mdi-email-outline",
    subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "3 min",
  },
  {
    title: "Oui oui",
    color: "teal lighten-1",
    icon: "mdi-airplane-landing",
    subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "4 min",
  },
  {
    title: "Disk capacity is at maximum",
    color: "teal accent-3",
    icon: "mdi-server",
    subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "3 hr",
  },
  {
    title: "Recipe to try",
    color: "blue-grey lighten-2",
    icon: "mdi-noodles",
    subtitle: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?",
    time: "8 hr",
  },
])
</script>
