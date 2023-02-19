<template>
  <VueDatePicker :format="dateFormat" v-model="date" locale="zh-CN" @update:model-value="handleDate">
    <template #action-row="{ internalModelValue, selectDate }">
      <div class="action-row">
        <p class="current-selection">{{ formatDate(internalModelValue) }}</p>
        <v-btn class="my-4" variant="outlined" color="primary" @click="selectDate">选择日期</v-btn>
      </div>
    </template>
  </VueDatePicker>
</template>

<script setup>
import {defineEmits, defineProps, ref} from 'vue'
import {format} from 'date-fns'
// import {zhCN} from 'date-fns/locale'
const props = defineProps({
  modelValue: {
    type: Date,
    required: false,
    default: () => new Date(),
  },
})

const emit = defineEmits(['update:modelValue'])

const date = ref(props.modelValue)

const handleDate = (modelData) => {
  date.value = modelData
  // do something else with the data
  console.log(modelData)
  emit('update:modelValue', modelData)
}

const dateFormat = (date) => {
  const dt = date
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr)
  return `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())}`
}

const formatDate = (date) => {
  return date ? format(date, 'yyyy-MM-dd HH:mm:ss') : ''
}
</script>

<style lang="scss" scoped>
.action-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
