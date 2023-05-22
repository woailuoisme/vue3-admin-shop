<template>
  <div class="d-flex justify-center">
    <v-img :src="modelImage" cover :aspect-ratio="6 / 5" :max-width="maxWidth" :max-height="maxHeight" @error="modelImage = dImgOne">
      <template #placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5" />
        </v-row>
      </template>
    </v-img>
  </div>
</template>

<script setup>
const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  maxWidth: {
    type: Number,
    default: 60,
  },
  maxHeight: {
    type: Number,
    default: 60,
  },
})
let modelImage = ref(props.image)
</script>

<style scoped></style>
