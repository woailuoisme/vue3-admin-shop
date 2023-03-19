<template>
  <v-row>
    <v-col cols="6" class="mx-auto">
      <file-pond
        ref="pond"
        class="filepond"
        name="file"
        :server="server"
        accepted-file-types="image/jpeg, image/png"
        label-idle="拖拽文件"
        max-files="3"
        allow-multiple
        style-panel-layout="compact"
        min-file-size="1kb"
        max-file-size="2MB"
        allow-file-poster
        @init="handleFilePondInit"
      />
    </v-col>
    <!--        styleItemPanelAspectRatio="3:1" -->
    <!--        stylePanelAspectRatio="3:1" -->
    <!--        storeAsFile -->
    <v-col cols="6">
      {{ files }}
    </v-col>
  </v-row>
</template>

<script setup>
import vueFilePond from "vue-filepond"
import "filepond/dist/filepond.min.css"
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css"
// Import image preview and file type validation plugins
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size"
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type"
import FilePondPluginImageValidateSize from "filepond-plugin-image-validate-size"
import FilePondPluginImagePreview from "filepond-plugin-image-preview"
import axios from "axios"

const files = ref([])

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ADMIN,
  withCredentials: false,
})

const pond = ref()
const server = {
  url: import.meta.env.VITE_BASE_URL_ADMIN,
  timeout: 7000,
  process: {
    url: "/tmp_upload",
    withCredentials: false,
    onload: (response) => {
      files.value.push(response)
      return response
    },
  },
  revert: async (uniqueFileId, load, error) => {
    try {
      await request.delete("/tmp_upload", { data: uniqueFileId })
      const index = files.value.findIndex((v) => v === uniqueFileId)
      files.value.splice(index, 1)
    } catch (e) {
      error("oh my goodness" + e)
    }
    load()
  },
}
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginImageValidateSize,
)

function handleFilePondInit() {
  // console.log(pond.value.getFiles())
  console.log("FilePond has initialized")
}
</script>
