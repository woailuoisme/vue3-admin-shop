<template>
  <v-autocomplete
    ref="auto"
    placeholder="`路由搜索(ctrl+/)`"
    prepend-inner-icon="mdi-magnify"
    hide-details
    :items="searchMenus"
    item-title="title"
    item-value="path"
    clearable
    variant="outlined"
    density="comfortable"
    single-line
    open-on-clear
    :custom-filter="customFilter"
    :search="search"
    active
  >
    <template #item="{ props, item }">
      <v-list-item :to="item.raw.path">
        <!--        <v-list-item-title v-html="highlight(item.raw.title)"></v-list-item-title> -->
        <!--        <v-list-item-subtitle v-html="highlight(item.raw.path)"></v-list-item-subtitle> -->
        <v-list-item-title>{{ item.raw.title }}</v-list-item-title>
        <v-list-item-subtitle>{{ item.raw.path }}</v-list-item-subtitle>
      </v-list-item>
      <v-divider color="primary" :thickness="2"></v-divider>
    </template>
  </v-autocomplete>
</template>

<script setup>
import { menuModule } from "@/router/menuRouters"
import { flatten } from "@/utils"

const props = defineProps({
  book: Object,
})

const auto = ref(null)
const search = ref("")

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

const customFilter = (value, query, item) => {
  if (value == null || query == null) return -1
  return item.raw.title.toLowerCase().includes(query.toLowerCase()) || item.raw.path.toLowerCase().includes(query.toLowerCase())
}

const searchMenus = getRoutes()

function onKeyDown(event) {
  if (event.ctrlKey && event.key === "/") {
    event.preventDefault()
    auto.value.$el.querySelector("input").focus()
    auto.value.menu = !auto.value.menu
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeyDown)
})
onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown)
})

function highlight(text) {
  if (!search.value) {
    return text
  }
  const regex = new RegExp(search.value, "ig")
  const match = text.match(regex)
  if (!match) {
    return text
  }
  // return text.replace(regex, `<span class="v-autocomplete__highlight">${match[0]}</span>`);
  return text.replace(regex, (match) => `<strong>${match}</strong>`)
}
</script>

<style scoped>
.v-autocomplete__highlight {
  color: #1976d2;
}
</style>
