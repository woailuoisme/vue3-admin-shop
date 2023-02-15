<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ isNew ? '新增' : '编辑' }}</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedItem.integral" label="积分"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="editedItem.amount" label="金额"/>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="blue darken-1" text @click="close">取消</v-btn>
      <v-btn color="blue darken-1" text @click="save">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script setup>
import {defineEmits, defineProps, onMounted, reactive, ref, watch} from 'vue'

const valid = ref(false)
let entity = reactive({
  integral: 0,
  amount: 0,
})

const props = defineProps({
  isNew: {
    type: Boolean,
    required: true
  },
  item: {
    type: Object,
    required: true,
    default: {
      integral: 0,
      amount: 0,
    }
  }
})
const editedItem = reactive(props.item)

const emit = defineEmits(['save', 'close'])

function save(value) {
  emit('save', value)
}

function close() {
  emit('close')
}

</script>
<style scoped>
</style>
