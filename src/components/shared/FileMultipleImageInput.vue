<template>
  <v-row>
    <v-col cols="8">
      <v-file-input
        ref="refImage"
        v-model="images"
        :label="imageLabel"
        show-size
        accept="image/png, image/jpeg, image/bmp"
        variant="outlined"
        prepend-icon="mdi-camera"
        hide-details
        multiple
        @update:model-value="change"
        @click:clear="clear"
      />
    </v-col>
  </v-row>
  <v-row>
    <v-col col="" />
  </v-row>
</template>

<script setup>
import { defineEmits, defineProps, getCurrentInstance, onMounted, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: File,
    required: false,
    default: null,
  },
  isNew: {
    type: Boolean,
    required: false,
    default: false,
  },
  label: {
    type: String,
    required: false,
    default: 'Image',
  },
  urls: {
    type: String,
    required: false,
    default: '',
  },
  rules: {
    type: Array,
    required: false,
    default: () => {
      return [
        value => {
          return !value || !value.length || value[0].size < 2000000 || ` 文件大小应小与 2 MB!`
        },
        value => {
          return (
            !value || !value.length || value[0].type.indexOf(['image/jpeg', 'image/jpg', 'image/png']) !== -1 || '文件类型需是jpeg,jpg,png'
          )
        },
      ]
    },
  },
})
const emit = defineEmits(['update:modelValue'])
const instance = getCurrentInstance()
const images = ref(props.modelValue)
const imageUrls = ref(props.urls)
const imageLabel = ref(props.label)

onMounted(() => {})
const change = value => {
  if (typeof value[0] !== 'undefined') {
    // imageUrl.value = URL.createObjectURL(value[0])
    // console.log(imageUrl.value)
  }
  // console.log(value)
  emit('update:modelValue', value[0])
}

const clear = () => {
  // imageUrl.value = ''
}
</script>

<style scoped></style>
