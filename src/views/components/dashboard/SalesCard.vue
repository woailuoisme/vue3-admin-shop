<template>
  <v-card class="d-flex flex-grow-1">
    <!-- loading spinner -->
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <!-- information -->
    <div v-else class="d-flex flex-column flex-grow-1">
      <v-card-title class="d-flex">
        <div>{{ $t(label) }}</div>
        <v-spacer></v-spacer>
        <v-btn variant="text" color="primary" @click="$emit('actionClicked')">{{ actionLabel }}</v-btn>
      </v-card-title>

      <div class="d-flex flex-column flex-grow-1">
        <div class="pa-2">
          <div class="text-h4">
            {{ formatCurrency(26358.49) }}
          </div>
          <div class="text-primary-lighten-1 mt-1">{{ formatCurrency(7123.21) }} {{ $t("dashboard.lastweek") }}</div>
        </div>
        <v-spacer></v-spacer>
        <div class="px-2 pb-2">
          <div class="title mb-1">{{ $t("dashboard.weeklySales") }}</div>
          <div class="d-flex align-center">
            <div class="text-h4">
              {{ formatCurrency(value) }}
            </div>
            <v-spacer></v-spacer>
            <div class="d-flex flex-column text-right">
              <div class="font-weight-bold">
                <trend-percent :value="percentage"/>
              </div>
              <div class="text-caption">{{ percentageLabel }}</div>
            </div>
          </div>
        </div>
      </div>

      <apexchart type="area" height="120" :options="chartOptions" :series="series"></apexchart>
    </div>
  </v-card>
</template>

<script setup>
import {useTheme} from "vuetify"
import {formatCurrency} from "@/filters"
import dayjs from "dayjs"

const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  percentageLabel: {
    type: String,
    default: "vs. last week",
  },
  series: {
    type: Array,
    default: () => [
      {
        name: "Sales",
        data: [11, 32, 45, 13],
      },
    ],
  },
  xaxis: {
    type: Object,
    default: () => ({
      type: "category",
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-20T00:00:00.000Z", "2018-09-22T00:00:00.000Z", "2018-09-23T00:00:00.000Z"],
      // tickAmount: 3
    }),
  },
  label: {
    type: String,
    default: "dashboard.sales",
  },
  actionLabel: {
    type: String,
    default: "View Report",
  },
  options: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["actionClicked"])
const formatDate = (date) => {
  return date ? dayjs(date).format("DD MM") : ""
}
const {themes, current} = useTheme()

const chartOptions = computed(() => {
  const primaryColor = current.value.dark ? themes.value["dark"].colors.primary : themes.value["light"].colors.primary
  return {
    chart: {
      height: 120,
      type: "area",
      sparkline: {
        enabled: true,
      },
      animations: {
        speed: 400,
      },
    },
    series: props.series,
    colors: [primaryColor],
    fill: {
      type: "solid",
      colors: [primaryColor],
      opacity: 0.15,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: props.xaxis,
    tooltip: {
      followCursor: true,
      theme: "dark",
      custom: function ({ctx, series, seriesIndex, dataPointIndex, w}) {
        const seriesName = w.config.series[seriesIndex].name
        return `<div class="rounded-lg pa-1 text-caption">
              <div class="font-weight-bold">${formatDate(w.globals.categoryLabels[dataPointIndex])}</div>
              <div>${series[seriesIndex][dataPointIndex]} ${seriesName}</div>
            </div>`
      },
    },
    ...props.options,
  }
})
</script>
