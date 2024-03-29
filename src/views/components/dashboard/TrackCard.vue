<template>
  <v-card class="d-flex flex-column flex-grow-1">
    <div v-if="loading" class="d-flex flex-grow-1 align-center justify-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <div v-else class="d-flex flex-column flex-grow-1">
      <v-card-title>
        {{ label }}
      </v-card-title>

      <div class="d-flex flex-column flex-grow-1">
        <div class="px-2 pb-2">
          <div class="d-flex align-center">
            <div class="text-h4">{{ value }}</div>
            <v-spacer></v-spacer>
            <div class="d-flex flex-column text-right">
              <div class="font-weight-bold">
                <trend-percent :value="percentage"/>
              </div>
              <div class="text-caption">{{ percentageLabel }}</div>
            </div>
          </div>
        </div>
        <v-spacer></v-spacer>
        <apexchart type="area" height="60" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import {computed} from "vue"
import dayjs from "dayjs"

const props = defineProps({
  series: {
    type: Array,
    default: () => [],
  },
  label: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: "#333333",
  },
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
  options: {
    type: Object,
    default: () => ({}),
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

const formatDate = (date) => {
  // return date ? format(date, "dd MM") : ""
  return date ? dayjs(date).format("DD MM") : ""
}

const chartOptions = computed(() => {
  return {
    chart: {
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false,
        },
      },
      width: "100%",
      height: 60,
      type: "area",
      sparkline: {
        enabled: true,
      },
    },
    colors: [props.color],
    fill: {
      type: "solid",
      colors: [props.color],
      opacity: 0.15,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      followCursor: true,
      theme: "dark", //this.$vuetify.theme.isDark ? 'light' : 'dark',
      custom: function ({ctx, series, seriesIndex, dataPointIndex, w}) {
        const seriesName = w.config.series[seriesIndex].name
        const dataPoint = w.config.series[seriesIndex].data[dataPointIndex]

        return `<div class="rounded-lg pa-1 text-caption">
              <div class="font-weight-bold">${formatDate(dataPoint[0])}</div>
              <div>${dataPoint[1]} ${seriesName}</div>
            </div>`
      },
    },
    ...props.options,
  }
})
</script>
