<script setup>
import VueApexCharts from "vue3-apexcharts"
import { useTheme } from "vuetify"
import { hexToRgb } from "@/utils/util"
import { ref, computed } from "vue"

const vuetifyTheme = useTheme()
const options = computed(() => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)
  const disabledColor = `rgba(${hexToRgb(currentTheme.value["on-surface"])},${variableTheme.value["disabled-opacity"]})`
  const borderColor = `rgba(${hexToRgb(String(variableTheme.value["border-color"]))},${variableTheme.value["border-opacity"]})`

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: "40%",
        endingShape: "rounded",
        startingShape: "rounded",
      },
    },
    stroke: {
      width: 2,
      colors: [currentTheme.value.surface],
    },
    legend: { show: false },
    grid: {
      borderColor,
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5,
      },
    },
    dataLabels: { enabled: false },
    colors: [
      currentTheme.value.background,
      currentTheme.value.background,
      currentTheme.value.background,
      currentTheme.value.primary,
      currentTheme.value.background,
      currentTheme.value.background,
    ],
    states: {
      hover: { filter: { type: "none" } },
      active: { filter: { type: "none" } },
    },
    xaxis: {
      categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      tickPlacement: "on",
      labels: { show: false },
      crosshairs: { opacity: 0 },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -17,
        style: {
          colors: disabledColor,
          fontSize: "12px",
        },
        formatter: (value) => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`,
      },
    },
  }
})
const series = [
  {
    data: [37, 57, 45, 75, 57, 40, 65],
  },
]
</script>

<template>
  <v-card>
    <v-card-item>
      <v-card-title>Weekly Overview</v-card-title>
      <template #append>
        <div class="me-n3">
          <v-btn icon size="x-small" color="default" variant="text">
            <v-icon size="24" icon="mdi-dots-vertical" />
          </v-btn>
        </div>
      </template>
    </v-card-item>

    <v-card-text>
      <vue-apex-charts type="bar" :options="options" :series="series" :height="220" />

      <div class="d-flex align-center mb-3">
        <h5 class="text-h5 me-4">45%</h5>
        <p>Your sales performance is 45% 😎 better compared to last month</p>
      </div>

      <v-btn block>Details</v-btn>
    </v-card-text>
  </v-card>
</template>
