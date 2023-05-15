<script setup>
// interface Props {
//   title: string
//   color?: string
//   icon: string
//   stats: string
//   change: number
//   subtitle: string
// }
import { controlledComputed } from "@vueuse/core"

const props = defineProps({
  color: String,
  default: () => "primary",
})

const isPositive = controlledComputed(
  () => props.change,
  () => Math.sign(props.change) === 1,
)
</script>

<template>
  <v-card>
    <v-card-text class="d-flex align-center">
      <v-avatar v-if="props.icon" size="40" :color="props.color" class="elevation-2">
        <v-icon :icon="props.icon" size="24" />
      </v-avatar>

      <v-spacer />

      <v-btn size="x-small" variant="text" color="default" class="me-n3 mt-n1" icon>
        <v-icon size="24" icon="mdi-dots-vertical" />
      </v-btn>
    </v-card-text>

    <v-card-text>
      <h6 class="text-sm font-weight-semibold mb-2">
        {{ props.title }}
      </h6>
      <div v-if="props.change" class="d-flex align-center mb-2">
        <span class="font-weight-semibold text-h6 me-2">{{ props.stats }}</span>
        <span :class="isPositive ? 'text-success' : 'text-error'" class="text-caption">
          {{ isPositive ? `+${props.change}` : props.change }}%
        </span>
      </div>
      <span class="text-caption">{{ props.subtitle }}</span>
    </v-card-text>
  </v-card>
</template>
