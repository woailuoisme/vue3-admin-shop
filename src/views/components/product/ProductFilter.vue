<template>
  <v-row>
    <v-col cols="12">
      <v-expansion-panels>
        <v-expansion-panel class="ma-0 pa-0">
          <v-expansion-panel-title class="bg-success text-h6">添加查询规则</v-expansion-panel-title>
          <v-expansion-panel-text class="ma-0 pa-0">
            <v-container fluid>
              <v-row class="align-center">
                <v-col cols="3" class="d-flex align-center">
                  <div class="text-body-1 mr-4">销售价格:</div>
                  <v-select
                    variant="outlined"
                    :items="mapOperators"
                    item-title="title"
                    item-value="value"
                    label="操作符"
                    density="compact"
                    single-line
                    hide-details
                  />
                </v-col>
                <v-col cols="3">
                  <v-text-field density="compact" single-line hide-details label="值"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" sm="12" md="6" class="d-flex align-center">
                  <div class="text-body-1 mr-4">订单状态:</div>
                  <v-chip-group v-model="filters.selectedStatus" selected-class="bg-primary" mandatory>
                    <v-chip v-for="(value, key) in status" :key="key" :value="value.value">
                      {{ value.title }}
                    </v-chip>
                  </v-chip-group>
                </v-col>
                <v-col cols="12" sm="12" md="6" class="d-flex align-center">
                  <div class="text-body-1 mr-4">线上状态:</div>
                  <v-switch
                    v-model="filters.isSale"
                    hide-details
                    inset
                    true-value="是"
                    false-value="否"
                    :label="`${filters.isSale}`"
                  ></v-switch>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="filters.categories"
                    label="产品分类"
                    clearable
                    multiple
                    :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming', 'Georgia', 'Texas', 'Wyoming']"
                    variant="outlined"
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script setup>
import { defineEmits, reactive, toRaw, watch } from "vue"
const emit = defineEmits(["change"])

const sales = [
  { title: "是", value: 1 },
  { title: "否", value: 0 },
]

const status = [
  { title: "待处理", value: "pending" },
  { title: "已完成", value: "finished" },
  { title: "已付款", value: "paid" },
]

const operators = [
  { title: "大于", short: "gt", value: ">" },
  { title: "大于等于", short: "gta", value: ">=" },
  { title: "等于", short: "eq", value: "=" },
  { title: "小于", short: "lt", value: "<" },
  { title: "大于", short: "lta", value: "<=" },
  { title: "不等于", short: "ne", value: "<>" },
]
const mapOperators = operators.map((o) => ({ title: `${o.title}(${o.value})`, value: o.value }))

const filters = reactive({
  selectedStatus: "",
  isSale: "是",
  categories: [],
})

watch(
  filters,
  (value) => {
    let item = toRaw(value)
    emit("change", {
      selectedStatus: item.selectedStatus,
      isSale: item.isSale === "是" ? 1 : 0,
      categories: item.categories,
    })
  },
  { deep: true },
)
</script>

<style scoped></style>
