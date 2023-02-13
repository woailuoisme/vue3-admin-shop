<template>
  <v-stepper :value="position">
    <v-stepper-header>
      <v-stepper-step step="1">确认订单信息</v-stepper-step>
      <v-divider />
      <v-stepper-step step="2">付款</v-stepper-step>
      <v-divider />
      <v-stepper-step step="3">确认收货</v-stepper-step>
      <v-divider />
      <v-stepper-step step="4">评价</v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  props: {
    position: {
      type: Number,
      default: 1,
    },
  },
}
</script>

<style scoped></style>
