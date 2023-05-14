<template>
  <div>
    <v-file-input v-model="file" show-size accept="image/*" label="选择文件" outlined dense @change="onFileSelected"></v-file-input>

    <v-progress-linear v-if="uploading" :value="progress" color="primary"></v-progress-linear>

    <v-img v-if="imageUrl" :src="imageUrl" contain></v-img>
  </div>
</template>

<script setup>
import { ref } from "vue"

const file = ref(null)
const uploading = ref(false)
const progress = ref(0)
const imageUrl = ref(null)

const onFileSelected = async (event) => {
  file.value = event.target.files[0]
  await uploadFile()
}

const uploadFile = async () => {
  const formData = new FormData()
  formData.append("file", file.value)

  try {
    uploading.value = true
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      onUploadProgress: (progressEvent) => {
        progress.value = Math.round((progressEvent.loaded / progressEvent.total) * 100)
      },
    })
    const responseData = await response.json()
    imageUrl.value = responseData.url
    // snackbar.success("文件上传成功！")
  } catch (error) {
    // snackbar.error("文件上传失败！")
  } finally {
    uploading.value = false
  }
}
</script>
