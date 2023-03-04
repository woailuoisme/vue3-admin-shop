<script setup>
const statistics = [
  {
    title: 'Sales',
    stats: '245k',
    icon: 'mdi-trending-up',
    color: 'primary',
  },
  {
    title: 'Customers',
    stats: '12.5k',
    icon: 'mdi-account-outline',
    color: 'success',
  },
  {
    title: 'Product',
    stats: '1.54k',
    icon: 'mdi-cellphone-link',
    color: 'warning',
  },
  {
    title: 'Revenue',
    stats: '$88k',
    icon: 'mdi-currency-usd',
    color: 'info',
  },
]
</script>

<template>
  <v-card>
    <v-card-item>
      <v-card-title>Transactions</v-card-title>

      <template #append>
        <div class="me-n3">
          <v-btn icon color="default" size="x-small" variant="text">
            <v-icon size="24" icon="mdi-dots-vertical" />
          </v-btn>
        </div>
      </template>
    </v-card-item>

    <v-card-text>
      <h6 class="text-sm mb-12">
        <span>Total 48.5% Growth 😎</span>
        <span class="font-weight-regular">this month</span>
      </h6>

      <v-row>
        <v-col v-for="item in statistics" :key="item.title" cols="6" sm="3">
          <div class="d-flex align-center">
            <div class="me-3">
              <v-avatar :color="item.color" rounded size="42" class="elevation-1">
                <v-icon size="24" :icon="item.icon" />
              </v-avatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span class="text-h6 font-weight-medium">{{ item.stats }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
