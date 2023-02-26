<template>
  <v-row>
    <v-col cols="12">
      <div class="text-body-1 mt-2">{{ label }}</div>
      <div
        :class="{ 'active-dropzone': active }"
        class="dropzone"
        @dragenter.prevent="toggleActive"
        @dragleave.prevent="toggleActive"
        @dragover.prevent
        @drop.prevent="drop"
        @change.prevent="selectedFile"
      >
        <span>拖拽文件</span>
        <span>或</span>
        <label for="dropzoneFile">
          <v-icon x-large>mdi-image-plus-outline</v-icon>
          添加文件
        </label>
        <input id="dropzoneFile" ref="inputFile" multiple type="file" class="dropzoneFile"/>
      </div>
    </v-col>
    <v-divider/>
    <v-col cols="12">
      <v-row v-if="files.length > 0">
        <v-col v-for="(file, index) in files" :key="index" cols="4">
<!--          <div>{{ index }}&#45;&#45;{{ file?.name }}&#45;&#45;{{ file?.url }}</div>-->
          <image-remove :url="file['url']" @delete="removeImage(file?.id)"/>
        </v-col>
      </v-row>
    </v-col>
    <v-divider/>
  </v-row>
</template>

<script setup>
import {defineEmits, defineProps, ref} from 'vue'
import ImageRemove from '@/components/shared/ImageRemove'
import Toast from '@/utils/toast'
import {uuid} from '@/utils/util'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: {
    type:String,
    default: '产品图片'
  },
  maxFiles: {
    type: Number,
    default: 6
  }
})

const emit = defineEmits(['update:modelValue'])
const active = ref(false)
const files = ref([])
const inputFile = ref(null)

const drop = (e) => {
  active.value = !active.value
  if ((files.value.length + e.dataTransfer.files.length) > props.maxFiles) {
    Toast.error(`超出可上传的最大数量 ${props.maxFiles} 个！`)
    return
  }
  files.value = Object.values(e.dataTransfer.files)
    .map((f) => ({id: uuid(), file: f, url: URL.createObjectURL(f)}))
    .concat(files.value)
  emit(
    'update:modelValue',
    files.value.map((f) => f?.file)
  )
  active.value = !active.value
}

const selectedFile = () => {
  active.value = !active.value
  if ((files.value.length + inputFile.value.files.length) > props.maxFiles) {
    Toast.error(`超出可上传的最大数量 ${props.maxFiles} 个！`)
    return
  }
  files.value = Object.values(inputFile.value.files)
    .map((f) => ({id: uuid(), file: f, url: URL.createObjectURL(f)}))
    .concat(files.value)
  emit(
    'update:modelValue',
    files.value.map((f) => f?.file)
  )
  active.value = !active.value
}

const removeImage = (index) => {
  console.log(index)
  const fIndex = files.value.findIndex((f) => f['id'] === index)
  URL.revokeObjectURL(files.value[fIndex]?.url)
  files.value.splice(fIndex, 1)
  emit(
    'update:modelValue',
    files.value.map((f) => f?.file)
  )
}

const toggleActive = () => {
  active.value = !active.value
}
</script>

<style scoped lang="scss">
.error {
  border: 2px solid #e03e2d !important;
}

.dropzone {
  max-width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  border: 2px dashed #41b883;
  background-color: #fff;
  transition: 0.3s ease all;

  label {
    padding: 8px 12px;
    color: #fff;
    background-color: #41b883;
    transition: 0.3s ease all;
  }

  input {
    display: none;
  }
}

.active-dropzone {
  color: #fff;
  border-color: #fff;
  background-color: #41b883;

  label {
    background-color: #fff;
    color: #41b883;
    cursor: pointer;
  }
}
</style>
