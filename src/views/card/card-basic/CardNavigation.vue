<script setup>
const navigationTab = ref("ITEM ONE")
const navigationTab2 = ref("ITEM ONE")
const tabItems = ["ITEM ONE", "ITEM TWO", "ITEM THREE"]
const tabContent =
  "Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards..."
</script>

<template>
  <v-row>
    <v-col md="6" cols="12">
      <v-card>
        <v-tabs v-model="navigationTab">
          <v-tab v-for="item in tabItems" :key="item" :value="item">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-divider />

        <!-- tabs content -->
        <v-window v-model="navigationTab">
          <v-window-item v-for="item in tabItems" :key="item" :value="item">
            <v-card-item>
              <v-card-title>Navigation Card</v-card-title>
            </v-card-item>

            <v-card-text>
              {{ tabContent }}
            </v-card-text>

            <v-card-text>
              <v-btn>Learn More</v-btn>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>

    <v-col md="6" cols="12">
      <v-card>
        <v-tabs v-model="navigationTab2" align-tabs="center">
          <v-tab v-for="item in tabItems" :key="item" :value="item">
            {{ item }}
          </v-tab>
        </v-tabs>

        <v-divider />

        <!-- tabs content -->
        <v-window v-model="navigationTab2">
          <v-window-item v-for="item in tabItems" :key="item" :value="item" class="text-center">
            <v-card-item>
              <v-card-title>Navigation Card</v-card-title>
            </v-card-item>

            <v-card-text>{{ tabContent }}</v-card-text>

            <v-card-text>
              <v-btn>Learn More</v-btn>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-col>
  </v-row>
</template>
