<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card v-bind="props" class="mx-auto" color="grey lighten-4" max-width="600">
      <v-row align="center" justify="center">
        <v-img :src="url" class="d-flex mt-3" :aspect-ratio="6 / 5" cover @error="dImgOne" @load="load">
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary" />
            </v-row>
          </template>
          <v-expand-transition>
            <div
              v-if="isHovering"
              class="d-flex transition-fast-in-fast-out bg-green-lighten-2 v-card--reveal border-opacity-50"
              style="height: 100%"
            >
              <v-row class="fill-height d-flex align-center justify-space-around">
                <!--                  <v-icon  class="text-h4" icon="mdi-trash-can-outline"  color="error"  @click.stop="deleteImage(url)"></v-icon> -->
                <v-btn prepend-icon="mdi-trash-can-outline" class="text-error" variant="outlined" @click.stop="deleteImage(url)">
                  <template #prepend>
                    <v-icon color="error"></v-icon>
                  </template>
                  删除
                </v-btn>
              </v-row>
            </div>
          </v-expand-transition>
        </v-img>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script setup>
import { dImgOne } from "@/assets"
import { defineProps, defineEmits, ref } from "vue"

const props = defineProps({
  url: String,
})

const emit = defineEmits(["delete"])
// const imageUrl = ref(props.url)

const deleteImage = (url) => {
  console.log("delete", url)
  emit("delete")
}

function load() {
  // if (imageUrl.value.startsWith('blob:')) URL.revokeObjectURL(url)
}
</script>

<style scoped></style>
