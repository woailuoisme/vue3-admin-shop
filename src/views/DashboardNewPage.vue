<script setup>
import AnalyticsAward from "@/views/components/dashboard/analytics/AnalyticsAward.vue"
import AnalyticsBarCharts from "@/views/components/dashboard/analytics/AnalyticsBarCharts.vue"
import AnalyticsDatatable from "@/views/components/dashboard/analytics/AnalyticsDatatable.vue"
import AnalyticsDepositWithdraw from "@/views/components/dashboard/analytics/AnalyticsDepositWithdraw.vue"
import AnalyticsSalesByCountries from "@/views/components/dashboard/analytics/AnalyticsSalesByCountries.vue"
import AnalyticsTotalEarning from "@/views/components/dashboard/analytics/AnalyticsTotalEarning.vue"
import AnalyticsTotalProfitLineCharts from "@/views/components/dashboard/analytics/AnalyticsTotalProfitLineCharts.vue"
import AnalyticsTransactions from "@/views/components/dashboard/analytics/AnalyticsTransactions.vue"
import AnalyticsWeeklyOverview from "@/views/components/dashboard/analytics/AnalyticsWeeklyOverview.vue"
import CardStatisticsVertical from "@/components/common/CardStatisticsVertical.vue"
import SalesCard from "@/views/components/dashboard/SalesCard.vue";

const totalProfit = {
  title: "Total Profit",
  color: "secondary",
  icon: "mdi-poll",
  stats: "$25.6k",
  change: 42,
  subtitle: "Weekly Project",
}
const newProject = {
  title: "New Project",
  color: "primary",
  icon: "mdi-briefcase-variant-outline",
  stats: "862",
  change: -18,
  subtitle: "Yearly Project",
}
</script>

<template>
  <v-row class="match-height">
    <v-col cols="12" md="4">
      <analytics-award/>
    </v-col>

    <v-col cols="12" md="8">
      <analytics-transactions/>
    </v-col>

    <v-col cols="12" md="4">
      <analytics-weekly-overview/>
    </v-col>

    <v-col cols="12" md="4">
      <analytics-total-earning/>
    </v-col>

    <v-col cols="12" md="4">
      <v-row class="match-height">
        <v-col cols="12" sm="6">
          <card-statistics-vertical v-bind="totalProfit"/>
        </v-col>

        <v-col cols="12" sm="6">
          <card-statistics-vertical v-bind="newProject"/>
        </v-col>

        <v-col cols="12" sm="6">
          <analytics-total-profit-line-charts/>
        </v-col>

        <v-col cols="12" sm="6">
          <analytics-bar-charts/>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="4">
      <analytics-sales-by-countries/>
    </v-col>

    <v-col cols="12" md="8">
      <analytics-deposit-withdraw/>
    </v-col>

    <v-col cols="12">
      <sales-card></sales-card>
    </v-col>

    <v-col cols="12">
      <analytics-datatable/>
    </v-col>
  </v-row>
</template>
