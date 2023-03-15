<template>
  <div class="h-full">
    <v-container fluid>
      <div ref="domRef" class="bg-white dark:bg-dark"></div>
    </v-container>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import WangEditor from "wangeditor"

const editor = ref()
const domRef = ref()

function renderWangEditor() {
  editor.value = new WangEditor(domRef.value)
  setEditorConfig()
  editor.value.create()
}

function setEditorConfig() {
  if (editor.value?.config?.zIndex) {
    editor.value.config.zIndex = 10
  }
}

onMounted(() => {
  renderWangEditor()
})
</script>

<style scoped>
:deep(.w-e-toolbar) {
  background: inherit !important;
  border-color: #999 !important;
}
:deep(.w-e-text-container) {
  background: inherit;
  border-color: #999 !important;
}
</style>
