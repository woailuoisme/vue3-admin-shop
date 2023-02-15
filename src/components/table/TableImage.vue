<template>
  <div class="d-flex justify-center">
    <v-img
      :src="modelImage"
      :aspect-ratio="6 / 5"
      @error="modelImage = errorImg"
      :max-width="maxWidth"
      :max-height="maxHeight"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5" />
        </v-row>
      </template>
    </v-img>
  </div>

</template>

<script setup>
import {defineProps, ref} from 'vue'

import errorImg from '@/assets/image/default_image_1.png'

const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  maxWidth: {
    type: Number,
    default: 100,
  },
  maxHeight: {
    type: Number,
    default: 100,
  },
})
let modelImage = ref(props.image)

</script>

<style scoped></style>
