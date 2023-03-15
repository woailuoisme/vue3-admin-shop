<template>
  <v-row>
    <v-col xl="12" sm="6" md="3" class="pa-2">
      <v-card class="elevation-2">
        <v-card-title>
          <v-row class="justify-center align-center">
            <v-col cols="6">
              <v-icon color="green-darken-1" size="72">mdi-account</v-icon>
            </v-col>
            <v-col cols="6">
              <h3 class="display-2 text-green-darken-1 grey--text">72K</h3>
              <h6 class="caption grey--text text--lighten-1">Customers</h6>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider />
        <v-card-actions>
          <v-row class="justify-center align-center">
            <v-col cols="12" class="text-center">
              <span class="body-1 grey--text text--lighten-1">THIS YEAR</span>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col xl="12" sm="6" md="3" class="pa-2">
      <v-card class="elevation-2">
        <v-card-title>
          <v-row class="justify-center align-center">
            <v-col cols="6">
              <v-icon color="amber-darken-1" size="72">mdi-cart-outline</v-icon>
            </v-col>
            <v-col cols="6">
              <h3 class="display-2 grey--text">31K</h3>
              <h6 class="caption grey--text text--lighten-1">SALES</h6>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider />
        <v-card-actions>
          <v-row align="center" justify="center">
            <v-col cols="12" class="text-center">
              <span class="body-1 grey--text text--lighten-1">THIS MONTH</span>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>

    <v-col xl="12" sm="6" md="3" class="pa-2">
      <v-card class="elevation-2">
        <v-card-title>
          <v-row class="justify-center align-center">
            <v-col cols="6">
              <v-icon color="deep-orange-darken-1" size="72">mdi-currency-usd</v-icon>
            </v-col>
            <v-col cols="6">
              <h3 class="display-2 grey--text">95K</h3>
              <h6 class="caption grey--text text--lighten-1">Revenue</h6>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider />
        <v-card-actions>
          <v-row align="center" justify="center">
            <v-col cols="12" class="text-center">
              <span class="body-1 grey--text text--lighten-1">THIS MONTH</span>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col xl="12" sm="6" md="3" class="pa-2">
      <v-card class="elevation-2">
        <v-card-title>
          <v-row align="center" justify="center">
            <v-col cols="6">
              <v-icon color="pink-darken-1" size="72">mdi-briefcase-outline</v-icon>
            </v-col>
            <v-col cols="6">
              <h3 class="display-2 grey--text">4K</h3>
              <h6 class="caption grey--text text--lighten-1">Bookings</h6>
            </v-col>
          </v-row>
        </v-card-title>
        <v-divider />
        <v-card-actions>
          <v-row align="center" justify="center">
            <v-col cols="12" class="text-center">
              <span class="body-1 grey--text text--lighten-1">THIS WEEK</span>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" sm="12" md="6" xl="4">
      <v-card>
        <v-card-text>
          <apexchart type="line" :options="data.options" :series="data.series" />
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12" md="6" xl="4">
      <v-card>
        <v-card-text>
          <apexchart type="bar" :options="data.options" :series="data.series" />
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="12" md="6" xl="4">
      <v-card>
        <v-card-text>
          <apexchart type="pie" :options="data.donut.options" :series="data.donut.series" />
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="6" xl="4">
      <v-card>
        <v-card-text>
          <apexchart type="donut" :options="data.donutOptions" :series="data.donutOptions.series" />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import Breadcrumb from "@/Components/shared/breadcrumb.vue"
import { computed, onMounted, reactive } from "vue"

import { useBreadcrumb } from "@/stores"

const breadcrumbStore = useBreadcrumb()
const data = reactive({
  statistics: [
    { label: "当日交易量", value: 75.521, updatedTime: "1小时前" },
    { label: "总交易量", value: 75.521, updatedTime: "1分钟前" },
    { label: "当日注册量", value: 75.521, updatedTime: "3小时前" },
    { label: "总注册量", value: 75.521, updatedTime: "1天前" },
  ],

  donut: {
    options: {},
    series: [44, 55, 41, 17, 15],
  },

  newOptions: {
    chart: {
      id: "_bar",
    },
    series: [
      {
        name: "sales",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  },

  options: {
    chart: {
      id: "vue_chart",
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  },
  series: [
    {
      name: "series-1",
      data: [55, 62, 89, 66, 98, 72, 101, 75, 94, 120, 117, 139],
    },
    {
      name: "series-2",
      data: [57, 72, 99, 33, 66, 77, 108, 99, 100, 120, 117, 77],
    },
  ],
  donutOptions: {
    series: [44, 55, 41, 17, 15, 10, 33, 90, 10, 12, 40, 6],
    labels: ["Create", "Explore", "Play", "Evolve", "Learn", "Arouse", "SHHHHHH", "Nest", "Revitalize", "Fund", "Lead", "Sleep"],
  },
})

const breadcrumbs = computed(() => {
  return breadcrumbStore.dashboard
})

onMounted(() => {
  // window.Echo.channel('channel-hello').listen('Hello', (e) => {
  //   console.log(e)
  // })
  // window.Echo.channel('import-progress').listen('ImportExcelProgress', (e) => {
  //   console.log(e)
  // })
})
</script>

<style scoped>
div.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
