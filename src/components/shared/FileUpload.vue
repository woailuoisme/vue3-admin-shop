<template>
  <v-row>
    <v-col cols="7">
      <v-file-input ref="file" v-model="file" label="分类封面" />
    </v-col>
    <v-col cols="2">
      <v-btn :disabled="!existsFile" @click="submitFile">上传文件</v-btn>
    </v-col>
    <v-col v-if="data.uploadedSuccess" cols="3" class="pl-3">
      <v-fab-transition>
        <v-row align="center">
          <v-img :src="data.image" max-width="50" aspect-ratio="1" />
          <v-btn icon x-small tile>
            <v-icon color="error" @click="deleteFile()">mdi-delete-circle-outline</v-icon>
          </v-btn>
        </v-row>
      </v-fab-transition>
    </v-col>
  </v-row>
  <v-row>
    <v-fade-transition>
      <v-progress-linear v-if="data.uploading" v-model="data.uploadPercentage" height="20">
        <strong>{{ Math.ceil(data.uploadPercentage) }}%</strong>
      </v-progress-linear>
    </v-fade-transition>
  </v-row>
</template>

<script setup>
import axios from 'axios'
import Toast from '../../utils/toast'

import { computed, defineProps, reactive } from 'vue'

const props = defineProps({})
const emit = defineEmits([])

const file = ref(null)
const data = reactive({
  uploadPercentage: 0,
  uploadMsg: '',
  image: '',
  uploading: false,
  uploadedSuccess: false,
})

const existsFile = computed(() => !!data.file)

function reset() {
  file.value = null
  data.uploadPercentage = 0
  data.uploadMsg = ''
}

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/v1/admin',
  headers: { 'Content-Type': 'multipart/form-data' },
})

async function deleteFile() {
  const onUploadProgress = (progressEvent) => {
    data.uploadPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
  }
  try {
    const res = await axios.delete('/upload/category', { onUploadProgress })
    if (res.data.success === 'success') {
      Toast.success('图片删除成功')
    }
  } catch (e) {
    Toast.error('图片产出失败')
  }
}

async function submitFile() {
  let formData = new FormData()
  formData.append('category_id', 2)
  formData.append('image', file.value)
  const onUploadProgress = (progressEvent) => {
    data.uploadPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
  }
  try {
    data.uploading = true
    const res = await instance.post('/upload/category', formData, { onUploadProgress })
    data.image = res.data.data
    data.uploadedSuccess = true
    data.uploading = false
    Toast.success('图片上传成功')
    setTimeout(() => data.reset(), 200)
  } catch (e) {
    data.uploading = false
    Toast.error('图片上传失败')
    setTimeout(() => this.reset(), 200)
  }
}
</script>

<style scoped></style>
