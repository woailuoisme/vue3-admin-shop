<template>
  <div class="h-full">
    <v-container fluid>
      <v-card title="markdown插件" class="elevation-2 rounded-sm">
        <div ref="domRef"></div>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue"
import Vditor from "vditor"
import "vditor/dist/index.css"
import { useTheme } from "vuetify"

const { global } = useTheme()

const vditor = ref()
const domRef = ref()

function renderVditor() {
  if (!domRef.value) return
  vditor.value = new Vditor(domRef.value, {
    minHeight: 400,
    theme: global.name.value === "dark" ? "dark" : "classic",
    icon: "material",
    cache: { enable: false },
  })
}

const stopHandle = watch(
  () => global.name,
  (newValue) => {
    const themeMode = newValue ? "dark" : "classic"
    vditor.value?.setTheme(themeMode)
  },
)

onMounted(() => {
  renderVditor()
})

onUnmounted(() => {
  stopHandle()
})
</script>

<style scoped></style>
