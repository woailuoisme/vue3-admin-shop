<template>
  <v-expansion-panels>
    <v-expansion-panel title="添加查询规则">
      <v-card>
        <v-card-title>
          <v-row class="align-center">
            <v-col cols="3">
              <v-select
                v-model="fieldModel"
                variant="outlined"
                item-title="label"
                item-value="value"
                :items="fields"
                hide-details
                label="选择字段"
              />
            </v-col>
            <v-col cols="4">
              <v-btn @click="addRule">添加查询规则</v-btn>
            </v-col>
          </v-row>
          <v-row v-for="(rule, index) in rules" :key="index" class="align-center">
            <v-col cols="3">
              <v-text-field disabled>{{ rule?.field }}</v-text-field>
            </v-col>
            <v-col cols="3">
              <v-select
                variant="outlined"
                :items="rule.operators"
                @update:modelValue="updateRuleOperator($event, index)"
                :value="rule.operatorValue"
                label="操作符"
              />
            </v-col>
            <v-col cols="3">
              <v-text-field @update:modelValue="updateRuleValue($event, index)" label="值"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-btn color="error" @click="deleteRule(rule, index)">删除规则</v-btn>
            </v-col>
          </v-row>
        </v-card-title>
      </v-card>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  book: Object,
})
const emit = defineEmits(['update'])
const fields = ref([
  {
    label: '是否在售',
    value: 'sale',
    type: 'choice',
    choices: [
      { title: '是', value: 1 },
      { title: '否', value: 0 },
    ],
  },
  {
    label: '价格',
    value: 'amount',
    type: 'number',
  },
  {
    label: '状态',
    value: 'status',
    type: 'choice',
    choices: [
      { title: '待处理', value: 'pending' },
      { title: '已完成', value: 'finished' },
      { title: '已付款', value: 'paid' },
    ],
  },
])

const fieldModel = ref(fields.value[1])

const rules = ref([])
// const rule = reactive({
//
// })

const addRule = () => {
  const field = fields.value.find(f => f.value === fieldModel.value)
  console.log(field)
  const rule = { label: field.label }
  rule.field = field.value
  rule.operators = ['=', '>=', '>', '!=', '<', '<=']
  rule.operatorValue = ['=']
  rule.choices = field.choices
  rule.choiceValue = field.choices[0]
  rules.value.unshift(rule)
}

const updateRuleValue = (value, rule) => {
  console.log(value, rule)
}

const updateRuleOperator = (value, rule) => {
  console.log(value, rule)
}

const deleteRule = (value, index) => {
  console.log(value, index)
  rules.value.splice(index, 1)
}
</script>
<style scoped></style>
