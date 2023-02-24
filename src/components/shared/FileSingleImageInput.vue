<template>
  <v-row>
    <v-col cols="8">
      <v-file-input
        v-model="image"
        ref="refImage"
        :label="imageLabel"
        :rules="imageRules"
        show-size
        accept="image/png, image/jpeg, image/bmp"
        variant="outlined"
        prepend-icon="mdi-camera"
        @update:modelValue="change"
        @click:clear="clear"
        hide-details
      ></v-file-input>
    </v-col>
    <v-col v-if="imageUrl" cols="4" class="pl-3">
      <v-fab-transition>
        <v-row align="center">
          <v-img :src="imageUrl" max-width="50" aspect-ratio="1" />
        </v-row>
      </v-fab-transition>
    </v-col>
  </v-row>
  <v-row></v-row>
</template>
<script setup>
import { defineEmits, defineProps, getCurrentInstance, onMounted, ref } from 'vue'

const instance = getCurrentInstance()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: File,
    required: false,
    default: null,
  },
  label: {
    type: String,
    required: false,
    default: 'Image',
  },
  url: {
    type: String,
    required: false,
    default: '',
  },
  rules: {
    type: Array,
    required: false,
    default: () => {
      return [
        (value) => {
          return !value || !value.length || value[0].size < 2000000 || ` 文件大小应小与 2 MB!`
        },
        (value) => {
          return (
            !value || !value.length || value[0].type.indexOf(['image/jpeg', 'image/jpg', 'image/png']) !== -1 || '文件类型需是jpeg,jpg,png'
          )
        },
      ]
    },
  },
})
const image = ref(props.modelValue)
const imageUrl = ref(props.url)
const imageLabel = ref(props.label)
const imageRules = ref(props.rules)

onMounted(() => {})
const change = (value) => {
  if (typeof value[0] !== 'undefined') {
    imageUrl.value = URL.createObjectURL(value[0])
    // console.log(imageUrl.value)
  }
  // console.log(value)
  emit('update:modelValue', value[0])
}

const clear = () => {
  imageUrl.value = ''
}
</script>
<style scoped></style>
