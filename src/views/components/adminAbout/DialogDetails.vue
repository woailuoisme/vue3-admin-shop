<template>
  <v-card>
    <v-card-title class=" text-center headline lighten-2">详情</v-card-title>
    <v-card-text>
      <v-table>
        <thead>
        <tr>
          <th class="text-center">关键字</th>
          <th class="text-center">值</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, key, index) in item" :key="index">
          <td class="text-center">{{ key }}</td>
          <td class="text-center">{{ value }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="primary" text @click="close">确定</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import {defineProps, defineEmits, ref, watch} from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    default: {}
  }
})
const emit = defineEmits(['update:modelValue', 'close'])

function close() {
  emit('close')
}
</script>
<style scoped>
</style>
