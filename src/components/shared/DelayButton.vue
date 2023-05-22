<template>
  <v-btn variant="flat" size="large" color="primary" :disabled="counting" @click="click">
    <vue-countdown v-if="counting" v-slot="{ totalSeconds }" :time="10000" @end="counting = false">
      重新获取请在{{ totalSeconds }}秒后
    </vue-countdown>
    <span v-else>获取验证码</span>
  </v-btn>
</template>

<script setup>
const props = defineProps({
  book: Object,
})
const emit = defineEmits(["click"])
const counting = ref(false)

function click() {
  counting.value = true
  emit("click")
}
</script>

<style scoped></style>
