<template>
  <vue-dropzone
    id="dropzone-1"
    ref="images"
    :use-custom-slot="true"
    :options="options"
    @vdropzone-complete="afterUploadComplete"
    @vdropzone-file-added="fileAdd()"
    @vdropzone-files-added="filesAdd()"
    @vdropzone-file-added-manually="fileAddManually()"
    @vdropzone-removed-file="fileRemove()"
  >
    <div class="dropzone-custom-content">
      <div>
        <v-icon x-large>mdi-image-plus-outline</v-icon>
      </div>
      <h3 class="dropzone-custom-title mt-4">
        <v-btn tile color="success" class="mt-3">点击或拖拽上传</v-btn>
      </h3>
    </div>
  </vue-dropzone>
</template>
<script setup>
import { defineProps, defineEmits, ref } from 'vue'

const props = defineProps({
  modelValue: Array,
})

const emit = defineEmits(['update:modelValue'])

const images = ref(null)

const options = {
  url: 'https://httpbin.org/post',
  thumbnailWidth: 150,
  maxFilesize: 2,
  acceptedFiles: '.png,.jpg,.gif,.bmp,.jpeg',
  parallelUploads: 3,
  maxFiles: 3,
  uploadMultiple: true,
  autoProcessQueue: false,
  addRemoveLinks: true,
}

async function afterUploadComplete(response) {
  if (response.status === 'success') {
    console.log('upload successful')
  } else {
    console.log('upload failed')
  }
}

function fileAdd() {
  console.log('getAcceptedFiles', images.value.getAcceptedFiles())
  console.log('getActiveFiles', images.value.getActiveFiles())
  console.log('getRejectedFiles', images.value.getRejectedFiles())
  console.log('getQueuedFiles', images.value.getQueuedFiles())
  emit('update:modelValue', images.value.getAcceptedFiles())
}

function filesAdd() {
  console.log('filesAdd')
  emit('update:modelValue', images.value.getAcceptedFiles())
}

function fileAddManually() {
  console.log('fileAddManually')
  emit('update:modelValue', images.value.getAcceptedFiles())
}

function fileRemove() {
  console.log('getAcceptedFiles', images.value.getAcceptedFiles())
  console.log('getActiveFiles', images.value.getActiveFiles())
  console.log('getRejectedFiles', images.value.getRejectedFiles())
  console.log('getQueuedFiles', images.value.getQueuedFiles())
  emit('update:modelValue', images.value.getAcceptedFiles())
}
</script>
<style scoped></style>
