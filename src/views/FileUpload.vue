<template>
  <v-row>
    <v-col cols="6" class="mx-auto">
      <file-pond
        ref="pond"
        class="filepond"
        name="file"
        :server="server"
        max-files="3"
        allow-multiple
        accepted-file-types="image/jpeg, image/png"
        style-panel-layout="compact"
        min-file-size="1kb"
        max-file-size="2MB"
        @init="handleFilePondInit"
      />
    </v-col>
    <!--        stylePanelAspectRatio='100%' -->
    <!--        styleItemPanelAspectRatio='100%' -->
    <!--        styleItemPanelAspectRatio="3:1" -->
    <!--        stylePanelAspectRatio="3:1" -->
    <!--        storeAsFile -->
    <v-col cols="6">
      {{ files }}
      <v-btn @click="showSnackbar"></v-btn>
    </v-col>
  </v-row>
</template>

<script setup>
import axios from "axios"
const files = ref([])
const pond = ref()

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_ADMIN,
  withCredentials: false,
})

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

function handleFilePondInit() {
  // console.log(pond.value.getFiles())
  console.log("FilePond has initialized")
}
</script>
