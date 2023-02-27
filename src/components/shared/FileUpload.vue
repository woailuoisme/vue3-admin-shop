<template>
  <v-row class="align-center mb-1">
    <v-col cols="7">
      <v-file-input
        ref="file"
        v-model="file"
        hide-details
        variant="outlined"
        prepend-inner-icon="mdi-camera"
        prepend-icon=""
        label="分类封面"
      />
    </v-col>
    <v-col cols="5">
      <v-btn variant="flat" :disabled="!existsFile" size="large" color="success" @click="submitFile">上传</v-btn>
    </v-col>
  </v-row>
  <v-row class="ma-0 pa-0">
    <v-col cols="12" class="mb-2 pa-0">
      <v-fade-transition>
        <!--        <v-progress-linear v-if="data.uploading" v-model="data.uploadPercentage" height="20"> -->
        <v-progress-linear v-model="data.uploadPercentage" height="10">
          <strong>{{ Math.ceil(data.uploadPercentage) }}%</strong>
        </v-progress-linear>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>

<script setup>
import axios from 'axios'
import Toast from '@/utils/toast'

import { ref, computed, defineProps, reactive } from 'vue'

const props = defineProps({})
const emit = defineEmits([])

const file = ref([])
const data = reactive({
  uploadPercentage: 0,
  uploadMsg: '',
  image: '',
  uploading: false,
  uploadedSuccess: false,
})

const existsFile = computed(() => !!file.value)

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
  try {
    const res = await axios.delete('/upload/category')
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
    reset()
  } catch (e) {
    data.uploadedSuccess = false
    data.uploading = false
    Toast.error('图片上传失败')
    reset()
  }
}
</script>

<style scoped></style>
