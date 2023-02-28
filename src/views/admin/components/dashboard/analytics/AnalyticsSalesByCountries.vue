<script setup>
const salesByCountries = [
  {
    abbr: 'US',
    amount: '$8,656k',
    country: 'United states of america',
    change: '+25.8%',
    sales: '894k',
    color: 'success',
  },
  {
    abbr: 'UK',
    amount: '$2,415k',
    country: 'United kingdom',
    change: '-6.2%',
    sales: '645k',
    color: 'error',
  },
  {
    abbr: 'IN',
    amount: '$865k',
    country: 'India',
    change: '+12.4%',
    sales: '148k',
    color: 'warning',
  },
  {
    abbr: 'JA',
    amount: '$745k',
    country: 'Japan',
    change: '-11.9%',
    sales: '86k',
    color: 'secondary',
  },
  {
    abbr: 'KO',
    amount: '$45k',
    country: 'Korea',
    change: '+16.2%',
    sales: '42k',
    color: 'error',
  },
]
</script>

<template>
  <v-card>
    <v-card-item>
      <v-card-title>Sales by Countries</v-card-title>

      <template #append>
        <div class="me-n3">
          <v-btn icon size="x-small" variant="text" color="default">
            <v-icon size="24" icon="mdi-dots-vertical" />
          </v-btn>
        </div>
      </template>
    </v-card-item>

    <v-card-text>
      <v-list class="card-list">
        <v-list-item v-for="data in salesByCountries" :key="data.country">
          <template #prepend>
            <v-avatar size="40" variant="tonal" :color="data.color" class="me-3">
              {{ data.abbr }}
            </v-avatar>
          </template>

          <v-list-item-title class="mb-1">
            <span class="text-sm font-weight-semibold">{{ data.amount }}</span>
            <v-icon size="22" :color="data.change.charAt(0) === '+' ? 'success' : 'error'" class="mx-1">
              {{ data.change.charAt(0) === '+' ? 'mdi-chevron-up' : 'mdi-chevron-down' }}
            </v-icon>
            <span :class="`text-xs ${data.change.charAt(0) === '+' ? 'text-success' : 'text-error'}`">
              {{ data.change.slice(1) }}
            </span>
          </v-list-item-title>

          <v-list-item-subtitle class="text-xs">
            {{ data.country }}
          </v-list-item-subtitle>

          <template #append>
            <div>
              <h4 class="font-weight-semibold">
                {{ data.sales }}
              </h4>
              <span class="text-xs text-medium-emphasis">Sales</span>
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
