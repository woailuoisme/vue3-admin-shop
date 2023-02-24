<template>
  <!--  <v-dialog v-model="dialog" max-width="1300px">-->
  <v-card>
    <v-card-title class="headline grey lighten-2 text-center" primary-title>产品详情</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th class="text-center">属性</th>
            <th class="text-center">内容</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(value, key, index) in product" :key="index">
            <td class="text-center" style="width: 20%">{{ value.label }}</td>
            <td v-if="value.key === 'category'" class="text-center" style="width: 80%">
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <v-chip color="info" small>
                    {{ value.value.second_name }}
                  </v-chip>
                </v-col>
              </v-row>
            </td>
            <td v-else-if="value.key === 'is_sale'" class="text-center" style="width: 80%">
              <v-row align="center" justify="center">
                <v-col cols="12">
                  <v-col cols="12">
                    <v-chip color="info" small>
                      {{ isActivityLabel(value.value) }}
                    </v-chip>
                  </v-col>
                </v-col>
              </v-row>
            </td>
            <td v-else-if="value.key === 'thumbnail'" class="text-center" style="width: 80%">
              <v-row align="center" justify="center" class="my-4">
                <v-col cols="3">
                  <v-row align="center" justify="center">
                    <table-image :src="value.value" :max-width="60" :max-height="60"></table-image>
                  </v-row>
                </v-col>
              </v-row>
            </td>
            <td v-else-if="value.key === 'images'" class="text-center" style="width: 80%">
              <v-carousel class="my-4">
                <v-carousel-item
                  cycle
                  :interval="1000"
                  v-for="(item, key, index) in value.value"
                  :key="index"
                  :src="item.image"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                />
              </v-carousel>
            </td>
            <td v-else class="text-center" style="width: 80%">{{ value.value }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-spacer />
      <v-btn variant="flat" size="x-large" color="primary" @click="close">确 定</v-btn>
      <v-spacer />
    </v-card-actions>
  </v-card>
  <!--  </v-dialog>-->
</template>
<script setup>
import tableImage from '@/components/table/tableImage'
import { defineProps, defineEmits, ref, watch } from 'vue'
import TableImage from '@/components/table/TableImage'
import { isActivityLabel } from '@/utils/table'

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: {},
  },
})

const emit = defineEmits(['update:modelValue', 'close'])

function close() {
  emit('close')
}
</script>
<style scoped></style>
