<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>用户详情</v-card-title>
    <v-card-text>
      <v-table>
        <template #default>
          <thead>
            <tr>
              <th class="text-center">关键字</th>
              <th class="text-center">值</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(value, key, index) in order" :key="index">
              <td class="text-center">{{ key }}</td>
              <td class="text-center">{{ value }}</td>
            </tr>
          </tbody>
        </template>
      </v-table>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" text @click="detailsDialog = false">确定</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  book: Object,
})

const emit = defineEmits(['update'])
</script>
<style scoped></style>
