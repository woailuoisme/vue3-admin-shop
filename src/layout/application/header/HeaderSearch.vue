<template>
  <v-autocomplete
    ref="auto"
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
      <v-list-item v-bind="props" :to="item.raw.path" :title="item.raw.title" :subtitle="item.raw.path"></v-list-item>
    </template>
  </v-autocomplete>
</template>

<script setup>
import { computed, defineProps, ref, onMounted } from "vue"
import router from "@/router"
import { menuModule } from "@/router/menuRouters"
import { flatten } from "@/utils"

const props = defineProps({
  book: Object,
})

const auto = ref()

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

const searchMenus = getRoutes()

const searchSelect = (item) => {
  if (item) router.push({ path: item })
}
function keyUp(e) {
  let evt = window.event || e
  if (evt.keyCode === 80 && evt.altKey) {
    alert("Keyboard shortcut working!")
    return false
  }
}

onMounted(() => {
  document.onkeyup = keyUp
})
</script>

<style scoped></style>
