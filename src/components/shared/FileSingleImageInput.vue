<template>
  <v-row class=" align-center">
    <v-col cols="9">
      <v-file-input
        ref="refImage"
        v-model="image"
        :label="imageLabel"
        :rules="rules"
        @click:clear="clear"
        variant="outlined"
        prepend-inner-icon="mdi-camera"
        prepend-icon=""
        @update:modelValue="change"
        show-size
        single-line
        class="my-4"
      />
    </v-col>
    <v-col v-if="imageUrl" cols="3">
      <v-fab-transition>
        <v-row align="center">
          <v-img  :src="imageUrl" max-width="100" aspect-ratio="1" cover/>
        </v-row>
      </v-fab-transition>
    </v-col>
  </v-row>
  <v-row/>
</template>
<script setup>
import {defineEmits, defineProps, getCurrentInstance, onMounted, ref} from 'vue'

const instance = getCurrentInstance()
const emit = defineEmits(['update:modelValue',])
const props = defineProps({
  modelValue: File,
  label: {
    type:String,
    default:"图片"
  },
  url: String,
})

const image = ref([])
const imageUrl = ref(props.url)
const imageLabel = ref(props.label)
const types = ['image/jpg', 'image/jpeg', 'image/png']
const exes = types.map((type) => type.split('/')[1].trim()).join(' ')
const label = props?.label ? props?.label : '图片'
const size = 2
const rules = [
  value => !!value || `${label} 必填`,
  value => !value || !value.length || types.includes(value?.type) || `仅接收: ${exes} 文件!`,
  value => !value || !value.length || value[0].size/(1024*1024) < size || `${label} 的大小需要小于 ${size}M`
]

const change = (value) => {
  if (value[0] && value[0] instanceof File) {
    imageUrl.value = URL.createObjectURL(value[0])
  }
  emit('update:modelValue', value[0])
}

const clear = () => {
  imageUrl.value = ''
}
</script>
<style scoped></style>
