<template>
  <v-carousel cycle hide-delimiter-background show-arrows="hover">
    <v-carousel-item v-for="(item, key) in items" :key="key">
      <v-img
        :src="item.attr"
        :aspect-ratio="6 / 5"
        @error="item.image = errorImg">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"/>
          </v-row>
        </template>
      </v-img>
    </v-carousel-item>
  </v-carousel>
</template>
<script setup>
import errorImg from '@/assets/image/default_image_1.png'
import {defineEmits, defineProps} from 'vue'

const props = defineProps({
  items: {
    type: Object,
    required: true
  },
  attr: {
    type: String,
    required: true,
    default: 'image'
  }
})

const emit = defineEmits(['update'])

</script>
<style scoped>
</style>
