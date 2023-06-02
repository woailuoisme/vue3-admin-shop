<template>
  <div style="display: flex; flex-direction: row; align-items: center">
    <otp-input
      ref="otpInput"
      should-auto-focus
      is-input-num
      input-classes="otp-input"
      separator="-"
      :num-inputs="6"
      :conditional-class="['one', 'two', 'three', 'four']"
      @on-change="handleOnChange"
      @on-complete="handleOnComplete"
    />
    <!--      :placeholder="['*', '*', '*', '*']" -->
    <v-btn @click="clearInput">Clear Input</v-btn>
  </div>
</template>

<script setup>
const otpInput = ref(null)

function handleOnChange(value) {
  console.log("OTP changed: ", value)
}

function handleOnComplete(value) {
  console.log("OTP completed: ", value)
}

function clearInput() {
  otpInput.value.clearInput()
}
</script>

<style scoped></style>
