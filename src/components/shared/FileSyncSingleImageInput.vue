<template>
  <v-file-input v-model="upload.selectedFile" label="Select a file" @change="uploadFile" />
  <v-progress-linear
    v-if="upload.uploading"
    :value="upload.uploadProgress"
    height="10"
    color="primary"
    background-color="grey lighten-1"
    class="mb-4"
  >
    {{ upload.uploadProgress }}%
  </v-progress-linear>
  <div v-if="upload.uploading">Uploading file {{ upload.selectedFile.name }} ({{ bytesToSize(upload.selectedFile.size) }})</div>
</template>

<script setup>
import { bytesToSize } from "@/utils"

const upload = reactive({
  selectedFile: null,
  uploading: false,
  uploadProgress: 0,
})

async function uploadFile() {
  upload.uploading = true
  const formData = new FormData()
  formData.append("file", upload.selectedFile)
  const response = await fetch("/temp_upload", {
    method: "POST",
    body: formData,
    onUploadProgress: (progressEvent) => {
      upload.uploadProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100)
    },
  })
  upload.uploading = false
  upload.uploadProgress = 0
  const data = await response.json()
  console.log(data)
}
</script>
