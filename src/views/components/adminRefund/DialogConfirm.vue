<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">退款处理</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-switch
              v-model="editedItem.confirmed"
              inset
              open-name="通过"
              close-name="拒绝"
              :label="`${editedItem.confirmed ? '通过' : '拒绝'}`"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea v-model="editedItem.remark" label="备注" solo />
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn color="blue darken-1" text @click="close">关闭</v-btn>
      <v-btn color="primary" @click="save">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import { defineEmits, defineProps, reactive, ref } from 'vue'

const valid = ref(false)

const props = defineProps({
  refund: {
    type: Object,
    required: true,
    default: {
      confirmed: false,
      remark: '',
    },
  },
})

let editedItem = reactive(props.refund)

const emit = defineEmits(['save', 'close'])

function save(value) {
  emit('save', value)
}

function close() {
  emit('close')
}
</script>
<style scoped></style>
