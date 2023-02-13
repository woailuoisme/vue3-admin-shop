<template>
  <v-row>
    <v-col cols="8">
      <v-row align="center">
        <v-col cols="7">
          <v-file-input ref="file" v-model="file" label="分类封面" />
        </v-col>
        <v-col cols="2">
          <v-btn :disabled="!existsFile" @click="submitFile">上传文件</v-btn>
        </v-col>
        <v-col v-if="uploadedSuccess" cols="3" class="pl-3">
          <v-fab-transition>
            <v-row align="center">
              <v-img :src="image" max-width="50" aspect-ratio="1" />
              <v-btn icon x-small tile>
                <v-icon color="error" @click="deleteFile()">mdi-delete-circle-outline</v-icon>
              </v-btn>
            </v-row>
          </v-fab-transition>
        </v-col>
      </v-row>
      <v-row>
        <v-fade-transition>
          <v-progress-linear v-if="uploading" v-model="uploadPercentage" height="20">
            <strong>{{ Math.ceil(uploadPercentage) }}%</strong>
          </v-progress-linear>
        </v-fade-transition>
        <!--        <strong v-if="existsFile">{{ uploadMsg }}</strong>-->
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios'
import Toast from '../../utils/toast'

export default {
  data() {
    return {
      file: null,
      uploadPercentage: 0,
      uploadMsg: '',
      image: '',
      uploading: false,
      uploadedSuccess: false,
    }
  },
  computed: {
    existsFile() {
      return !!this.file
    },
  },
  created() {},
  methods: {
    reset() {
      this.file = null
      this.uploadPercentage = 0
      this.uploadMsg = ''
    },
    async deleteFile() {
      const res = await axios.delete('/upload/category', {
        baseURL: 'http://localhost:8000/api/v1/admin',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: function (progressEvent) {
          this.uploadPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
        }.bind(this),
      })
    },
    async submitFile() {
      this.uploading = true
      let formData = new FormData()
      formData.append('category_id', 2)
      formData.append('image', this.file)
      try {
        const res = await axios.post('/upload/category', formData, {
          baseURL: 'http://localhost:8000/api/v1/admin',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = Math.round((progressEvent.loaded / progressEvent.total) * 100)
          }.bind(this),
        })
        this.image = res.data.data
        // debugger;
        this.uploadedSuccess = true
        this.uploading = false
        Toast.success('图片上传成功')
        setTimeout(() => this.reset(), 1000)
      } catch (e) {
        this.uploading = false
        Toast.success('图片上传失败')
        setTimeout(() => this.reset(), 1000)
      }
    },
  },
}
</script>

<style scoped></style>
