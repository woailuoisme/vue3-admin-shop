<template>
  <div class="h-full">
    <v-card title="文本复制" class="h-full elevation-2 rounded-sm">
      <v-row class="d-flex align-center">
        <v-input v-model:value="source" placeholder="请输入要复制的内容吧" />
        <v-btn type="primary" @click="handleCopy">复制</v-btn>
      </v-row>
    </v-card>
  </div>
</template>

<script setup>
const source = ref("")
const { copy, isSupported, copied } = useClipboard()
const toast = useToast()

async function handleCopy() {
  if (!isSupported) {
    toast.error("您的浏览器不支持Clipboard API")
    return
  }
  if (!source.value) {
    toast.error("请输入要复制的内容")
    return
  }
  await copy(source.value)
  toast.success(`复制成功：${source.value}`)
}
</script>

<style scoped></style>
