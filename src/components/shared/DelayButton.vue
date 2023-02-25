<template>
  <v-btn variant="flat" size="large" color="primary" :disabled="counting" @click="click">
    <vue-countdown v-if="counting" :time="10000" @end="counting = false" v-slot="{ totalSeconds }">
      重新获取请在{{ totalSeconds }}秒后
    </vue-countdown>
    <span v-else>获取验证码</span>
  </v-btn>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  book: Object,
})
const counting = ref(false)
const emit = defineEmits(['click'])
function click() {
  counting.value = true
  emit('click')
}
</script>
<style scoped></style>
