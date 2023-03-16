<template>
  <v-autocomplete
    placeholder="`路由搜索`"
    prepend-inner-icon="mdi-magnify"
    hide-details
    :items="searchMenus"
    item-title="title"
    item-value="path"
    clearable
    variant="filled"
    density="comfortable"
    class="v-text-field-rounded rounded-pill"
    single-line
    @update:modelValue="searchSelect"
  >
    <template #item="{ props, item }">
      <v-list-item v-bind="props" :to="item.path" prepend-icon="mdi-arrow-forward" :title="item.title" :subtitle="item.name"></v-list-item>
      <v-divider thickness="6" inset></v-divider>
    </template>
  </v-autocomplete>
</template>

<script setup>
import { computed, defineProps, ref } from "vue"
import router from "@/router"
import { menuModule } from "@/router/menuRouters"
import { flatten } from "@/utils"

const props = defineProps({
  book: Object,
})

const searchMenus = computed(() => getRoutes())

function getRoutes() {
  const flatRoutes = flatten(menuModule)
  const mapRoutes = flatRoutes.map((item) => {
    return {
      name: item.name,
      title: item?.meta.title,
      path: item.path,
    }
  })
  const homeIndex = mapRoutes.findIndex((i) => i.path === "/")
  mapRoutes.splice(homeIndex, 1)
  return mapRoutes
}

// const emit = defineEmits(['update'])

const searchSelect = (item) => {
  if (item) router.push({ path: item })
}
</script>

<style scoped>
.v-text-field-rounded .v-text-field__slot input {
  /*color: #00f !important;*/
  border-radius: 9999px !important;
  /*border: ;*/
}
</style>
