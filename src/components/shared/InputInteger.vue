<template>
  <div class="input-integer">
    <v-icon size="x-large" :color="isDecrement ? 'success' : 'gray'" :disabled="!isDecrement" @click="decrement">mdi-minus</v-icon>
    <input
      ref="input"
      v-model="quantity"
      :readonly="readonly"
      class="mx-1"
      style="text-align: center; width: 50px; height: 40px; border: 1px solid #378888"
      type="text"
      @change="change"
      @keypress="onlyNumber($event)"
      @paste="paste"
    />
    <v-icon size="x-large" :color="isIncrement ? 'success' : 'gray'" :disabled="!isIncrement" @click="increment">mdi-plus</v-icon>
  </div>
</template>

<script setup>
import { computed, defineEmits, defineProps, ref, watch, onMounted } from "vue"
const props = defineProps({
  modelValue: {
    type: Number,
    default: 1,
  },
  initQuantity: {
    type: Number,
    default: 1,
  },
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 10,
  },
  step: {
    type: Number,
    default: 1,
  },
  readonly: Boolean,
  disabled: Boolean,
  inputTable: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(["input", "increment", "decrement", "changeValue", "changeQuantity", "update:modelValue"])
const isNaN = Number.isNaN || window.isNaN
const REGEXP_DECIMALS = /\.\d*(?:0|9){10}\d*$/
const REGEXP_NUMBER = /^-?(?:\d+|\d+\.\d+|\.\d+)(?:[eE][-+]?\d+)?$/
const quantity = ref(1)
const isDecrement = computed(() => quantity.value > props.min)
const isIncrement = computed(() => quantity.value < props.max)

function setValue(newValue) {
  const oldValue = quantity.value
  if (props.min <= props.max) {
    newValue = Math.min(props.max, Math.max(props.min, newValue))
  }
  quantity.value = newValue
  emit("changeValue", newValue, oldValue)
}

onMounted(() => {
  setValue(Math.min(props.max, Math.max(props.min, props.initQuantity)))
})

watch(quantity, (value, oldValue) => {
  emit("update:modelValue", value)
})

function increment() {
  setValue(Math.min(props.max, Math.max(props.min, quantity.value + props.step)))
  emit("increment", quantity.value)
  emit("update:modelValue", quantity.value)
}
function decrement() {
  setValue(Math.min(props.max, Math.max(props.min, quantity.value - props.step)))
  emit("decrement", quantity.value)
  emit("update:modelValue", quantity.value)
}

function change(event) {
  setValue(Math.min(props.max, Math.max(props.min, event.target.value)))
  emit("changeQuantity", quantity.value)
  emit("update:modelValue", quantity.value)
}

/**
 * Paste event handler.
 * @param {Event} event - Event object.
 */
function paste(event) {
  const clipboardData = event.clipboardData || window.clipboardData
  if (clipboardData && !REGEXP_NUMBER.test(clipboardData.getData("text"))) {
    event.preventDefault()
  }
}

function onlyNumber(event) {
  let keyCode = event.keyCode ? event.keyCode : event.which
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    // 46 is dot
    event.preventDefault()
  }
}
</script>

<style scoped>
.input-integer {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
