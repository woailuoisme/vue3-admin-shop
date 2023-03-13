<template>
  <v-text-field
    append-outer-icon="add"
    :label="label"
    :mask="mask"
    :outline="outline"
    prepend-icon="remove"
    :rules="rules"
    single-line
    :value="value"
    @click:append-outer.stop="increase"
    @click:prepend.stop="decrease"
    @change="$emit('input', $event)"
  ></v-text-field>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref, watch, onMounted } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  min: {
    type: Number,
    default: 0,
  },

  max: {
    type: Number,
    default: 9999,
  },

  maxLength: {
    type: Number,
    default: 4,
  },

  outline: {
    type: Boolean,
    default: true,
  },

  rules: {
    type: Array,
    default: () => [],
  },

  step: {
    type: Number,
    default: 1,
  },

  value: [String, Number],
})
const emit = defineEmits(['input'])

function increase() {
  if (isNaN(parseInt(props.value))) return emit('input', props.step)
  if (props.value === props.max) return
  emit('input', parseInt(props.value) + props.step)
}

function decrease() {
  if (isNaN(parseInt(props.value))) return emit('input', props.min)
  if (props.value === props.min) return
  emit('input', parseInt(props.value) - props.step)
}

const mask = computed(() => {
  let mask = ''
  for (let i = 0; i < props.maxLength; i++) mask = `${mask}#`
  return mask
})
</script>
