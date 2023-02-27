<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">更新物流信息</span>
    </v-card-title>
    <v-form v-model="valid">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedItem.company" label="物流公司" :rules="[rule.required('物流公司')]" solo />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedItem.no" label="物流编号" :rules="[rule.required('物流编号')]" solo />
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="close">关闭</v-btn>
        <v-btn :disabled="!valid" color="primary" @click="save">保存</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup>
import { defineProps, defineEmits, ref, reactive } from 'vue'
import validators from '@/utils/validators'

const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {
        no: '',
        company: '',
      }
    },
  },
})

const emit = defineEmits(['update'])

const editedItem = ref(props.item)

const rule = reactive([...validators])
</script>

<style scoped></style>
