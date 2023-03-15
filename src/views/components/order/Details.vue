<template>
  <v-card>
    <v-card-title class="headline grey lighten-2 text-center" primary-title>订单详情</v-card-title>
    <v-divider thickness="2" />
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th class="text-center">属性</th>
            <th class="text-center">值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key, index) in category" :key="index">
            <td class="text-center w-25">{{ value.label }}</td>
            <td v-if="value.key === 'user'" class="text-center" style="width: 80%">
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <span>{{ value.value.name }}</span>
                </v-col>
              </v-row>
            </td>
            <td v-else-if="value.key === 'order_status'" class="text-center" style="width: 80%">
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <span>{{ $filter.orderStatusLabel(value.value) }}</span>
                </v-col>
              </v-row>
            </td>
            <td v-else class="text-center" style="width: 80%">{{ value.value }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn variant="flat" color="primary" class="px-10" @click="close">确定</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue"

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(["update:modelValue", "close"])

function close() {
  emit("close")
}
</script>

<style scoped></style>
