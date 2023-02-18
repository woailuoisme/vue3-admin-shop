<template>
  <v-card>
    <v-card-title class=" text-center headline grey lighten-2" primary-title>反馈详情</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-table>
        <thead>
        <tr>
          <th class="text-center">关键字</th>
          <th class="text-center">值</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(value, key, index) in feedback" :key="index">
          <td class="text-center" style="min-width: 60px !important">{{ value.label }}</td>
          <td v-if="value.key === 'user'" class="text-center">
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-avatar>
                  <v-img :src="value.value.avatar" class="d-flex" @error="value.value.avatar = img">
                    <template #placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center">
                        <v-progress-circular indeterminate color="primary"/>
                      </v-row>
                    </template>
                  </v-img>
                </v-avatar>
                <span class="ml-4">{{ value.value.nickname ?? '' }}</span>
              </v-col>
            </v-row>
          </td>
          <td v-else-if="value.key === 'images'" class="text-center">
            <v-row align="center" justify="center">
              <v-col cols="12">
                <v-carousel height="400" cycle hide-delimiter-background show-arrows="hover">
                  <v-carousel-item v-for="(item, key) in value.value" :key="key">
                    <v-img :src="item.image_url" :aspect-ratio="6 / 5" @error="item.image_url = img">
                      <template v-slot:placeholder>
                        <v-row class="fill-height ma-0" align="center" justify="center">
                          <v-progress-circular indeterminate color="grey lighten-5"/>
                        </v-row>
                      </template>
                    </v-img>
                  </v-carousel-item>
                </v-carousel>
              </v-col>
            </v-row>
          </td>
          <td v-else class="text-center">{{ value.value }}</td>
        </tr>
        </tbody>
      </v-table>
    </v-card-text>
    <v-divider/>
    <v-card-actions>
      <v-spacer/>
      <v-btn variant="flat" size="large" color="primary" text @click="close">确 定</v-btn>
      <v-spacer/>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import img from '@/assets/image/default_image_1.png'
import {defineEmits, defineProps} from 'vue'

const props = defineProps({
  feedback: {
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
