<template>
  <v-row>
    <v-col cols="12">
      <div class="title primary">{{ label }}</div>
      <div
        @dragenter.prevent="toggleActive"
        @dragleave.prevent="toggleActive"
        @dragover.prevent
        @drop.prevent="drop"
        :class="{ 'active-dropzone': active }"
        class="dropzone"
        @change.prevent="selectedFile"
      >
        <span>拖拽文件</span>
        <span>或</span>
        <label for="dropzoneFile">
          <v-icon x-large>mdi-image-plus-outline</v-icon>
          添加文件
        </label>
        <input ref="inputFile" multiple type="file" id="dropzoneFile" class="dropzoneFile"/>
      </div>
    </v-col>
    <v-divider></v-divider>
    <v-col cols="12">
      <div v-if="files.length > 0">
        <v-chip>{{ files.length }}</v-chip>
      </div>
      <v-row v-if="files.length > 0">
        <v-col v-for="(file, index) in files" :key="index" cols="4">
          <div>{{ index }}--{{ file?.name }}--{{ file?.url }}</div>
          <image-remove :url="file['url']" @delete="removeImage(file?.id)"></image-remove>
        </v-col>
      </v-row>
    </v-col>
    <v-divider></v-divider>
  </v-row>
</template>

<script setup>
import {computed, defineEmits, defineProps, ref, watch} from 'vue'
import ImageRemove from '@/components/shared/ImageRemove'
import {uuid} from '@/utils/util'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  label: String
})

const emit = defineEmits(['update:modelValue'])
const active = ref(false)
const files = ref([])

const readURL = file => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = e => res(e.target.result);
    reader.onerror = e => rej(e);
    reader.readAsDataURL(file);
  });
};
// const urls = ref([])

// const urls = computed(()=>files.value.map((f)=>{
//   let reader = new FileReader();
//   return reader.readAsDataURL(f)
// }))
// const urls = computed(()=>files.value.map((f)=>URL.createObjectURL (f)))
// const mapFlies = computed(() =>
//   files.value.map((f) => {
//     // debugger
//     return { id: f?.id, url: f?.url ? f?.url : URL.createObjectURL(f), name: f?.file?.name }
//   })
// )


// const mapFlies = computed(() => files.value.map((f) => {

const inputFile = ref(null)

const drop = (e) => {
  active.value = !active.value
  files.value = Object.values(e.dataTransfer.files)
    .map((f) => ({id: uuid(), file: f, url: URL.createObjectURL(f)}))
    .concat(files.value)
  emit('update:modelValue', files.value.map((f) => f?.file))
  console.log(files.value.length)
}

const selectedFile = () => {
  active.value = !active.value
  files.value = Object.values(inputFile.value.files)
    .map((f) => ({id: uuid(), file: f, url: URL.createObjectURL(f)}))
    .concat(files.value)
  emit('update:modelValue', files.value.map((f) => f?.file))
  console.log(files.value.length)
}

const removeImage = (index) => {
  debugger
  console.log(index)
  const fIndex = files.value.findIndex((f) => f['id'] === index)
  // files.value.splice(index, 1)
  files.value.splice(fIndex, 1)
  emit('update:modelValue', files.value.map((f) => f?.file))
  console.log('after remove files', files.value)
}

const toggleActive = () => {
  active.value = !active.value
}
</script>

<style scoped lang="scss">
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
