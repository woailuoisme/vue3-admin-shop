<script setup>
import americanBank from '@/assets/images/logos/american-bank.png'
import aws from '@/assets/images/logos/aws.png'
import citiBank from '@/assets/images/logos/citi-bank.png'
import digitalOcean from '@/assets/images/logos/digital-ocean.png'
import github from '@/assets/images/logos/github.png'
import google from '@/assets/images/logos/google.png'
import gumroad from '@/assets/images/logos/gumroad.png'
import mastercardLabel from '@/assets/images/logos/mastercard-label.png'
import slack from '@/assets/images/logos/slack.png'
import stripe from '@/assets/images/logos/stripe.png'

const deposits = [
  {
    title: 'Gumroad Account',
    subtitle: 'Sell UI Kit',
    amount: '+$4,650',
    logo: gumroad,
  },
  {
    title: 'Mastercard',
    subtitle: 'Wallet deposit',
    amount: '+$92,705',
    logo: mastercardLabel,
  },
  {
    title: 'Stripe Account',
    subtitle: 'iOS Application',
    amount: '+$957',
    logo: stripe,
  },
  {
    title: 'American Bank',
    subtitle: 'American Bank',
    amount: '+$6,837',
    logo: americanBank,
  },
  {
    title: 'Bank Account',
    subtitle: 'Wallet deposit',
    amount: '+$8,934',
    logo: citiBank,
  },
]
const withdraws = [
  {
    title: 'Google Adsense',
    subtitle: 'Paypal deposit',
    amount: '-$145',
    logo: google,
  },
  {
    title: 'Github Enterprise',
    subtitle: 'Security & compliance',
    amount: '-$1870',
    logo: github,
  },
  {
    title: 'Upgrade Slack Plan',
    subtitle: 'Debit card deposit',
    amount: '-$450',
    logo: slack,
  },
  {
    title: 'Digital Ocean',
    subtitle: 'Cloud Hosting',
    amount: '-$540',
    logo: digitalOcean,
  },
  {
    title: 'AWS Account',
    subtitle: 'Choosing a Cloud Platform',
    amount: '-$21',
    logo: aws,
  },
]
</script>

<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-card-item>
          <v-card-title>Deposit</v-card-title>

          <template #append>
            <a href="javascript:void(0)" class="text-sm font-weight-medium">View All</a>
          </template>
        </v-card-item>

        <v-card-text>
          <v-list class="card-list">
            <v-list-item v-for="deposit in deposits" :key="deposit.logo">
              <template #prepend>
                <v-avatar start rounded>
                  <v-img :height="29" :width="28" :src="deposit.logo" />
                </v-avatar>
              </template>

              <v-list-item-title class="text-sm font-weight-semibold mb-1">
                {{ deposit.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-xs">
                {{ deposit.subtitle }}
              </v-list-item-subtitle>

              <template #append>
                <v-list-item-action class="text-success font-weight-semibold">
                  {{ deposit.amount }}
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-col>

      <v-divider :vertical="$vuetify.display.mdAndUp" :inset="$vuetify.display.mdAndUp" />

      <v-col cols="12" md="6">
        <v-card-item>
          <v-card-title>Withdraw</v-card-title>

          <template #append>
            <a href="javascript:void(0)" class="text-sm font-weight-medium">View All</a>
          </template>
        </v-card-item>

        <v-card-text>
          <v-list class="card-list">
            <v-list-item v-for="withdraw in withdraws" :key="withdraw.logo">
              <template #prepend>
                <v-avatar start rounded>
                  <v-img :height="29" :width="28" :src="withdraw.logo" />
                </v-avatar>
              </template>

              <v-list-item-title class="text-sm font-weight-semibold mb-1">
                {{ withdraw.title }}
              </v-list-item-title>
              <v-list-item-subtitle class="text-xs">
                {{ withdraw.subtitle }}
              </v-list-item-subtitle>

              <template #append>
                <v-list-item-action class="text-error font-weight-semibold">
                  {{ withdraw.amount }}
                </v-list-item-action>
              </template>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-col>
    </v-row>
  </v-card>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
