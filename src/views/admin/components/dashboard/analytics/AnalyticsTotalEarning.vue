<script setup>
import aviato from '@/assets/images/logos/aviato.png'
import bitbank from '@/assets/images/logos/bitbank.png'
import zipcar from '@/assets/images/logos/zipcar.png'

const earnings = [
  {
    avatar: zipcar,
    title: 'Zipcar',
    subtitle: 'Vuejs, React & HTML',
    amount: '$24,895.65',
    progress: 'primary',
  },
  {
    avatar: bitbank,
    title: 'Bitbank',
    subtitle: 'Sketch, Figma & XD',
    amount: '$8,6500.20',
    progress: 'info',
  },
  {
    avatar: aviato,
    title: 'Aviato',
    subtitle: 'HTML & Anguler',
    amount: '$1,2450.80',
    progress: 'secondary',
  },
]
</script>

<template>
  <v-card>
    <v-card-item>
      <v-card-title>Total Earning</v-card-title>

      <template #append>
        <div class="me-n3">
          <v-btn icon size="x-small" variant="text" color="default">
            <v-icon size="24" icon="mdi-dots-vertical" />
          </v-btn>
        </div>
      </template>
    </v-card-item>

    <v-card-text class="pt-4">
      <div class="d-flex align-center">
        <h4 class="text-h4 me-2">$24,895</h4>

        <span class="text-success">
          <v-icon size="30" icon="mdi-menu-up" />
          <span>10%</span>
        </span>
      </div>
      <span class="text-xs">Compared to $84,325 last year</span>

      <v-list class="card-list mt-9">
        <v-list-item v-for="earning in earnings" :key="earning.title">
          <template #prepend>
            <v-avatar rounded :image="earning.avatar" />
          </template>

          <v-list-item-title class="text-sm font-weight-semibold mb-1">
            {{ earning.title }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-xs">
            {{ earning.subtitle }}
          </v-list-item-subtitle>

          <template #append>
            <div>
              <h6 class="text-sm mb-2">
                {{ earning.amount }}
              </h6>
              <v-progress-linear :color="earning.progress" model-value="80" />
            </div>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 2.625rem;
}
</style>
