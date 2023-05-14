<template>
  <v-select
    v-model="operation"
    :items="items"
    item-title="title"
    item-value="value"
    density="compact"
    variant="solo"
    style="max-width: 140px"
    @change="batch"
  ></v-select>
</template>

<script setup>
const emit = defineEmits(["change"])

const items = [
  {
    title: "全部删除",
    value: 1,
  },
  {
    title: "全部上架",
    value: 2,
  },
  {
    title: "全部下架",
    value: 3,
  },
]

const operation = ref(1)

function batch(value) {
  emit("change", operation, value)
}
</script>

<style scoped></style>
