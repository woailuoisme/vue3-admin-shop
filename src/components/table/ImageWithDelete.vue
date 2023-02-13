<template>
  <v-hover v-slot="{ hover }">
    <v-card class="mx-auto" color="grey lighten-4" max-width="600">
      <v-row align="center" justify="center">
        <v-img
          :src="image"
          class="d-flex mt-3"
          :aspect-ratio="6 / 5"
          @error="image = require('@/assets/image/default_image_1.png')"
        >
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="primary" />
            </v-row>
          </template>
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
              style="height: 100%"
            >
              <v-row class="fill-height flex-column" align="center" justify="center">
                <div class="align-self-center">
                  <v-btn color="error" @click.stop="$emit('delete', item)">删除</v-btn>
                </div>
              </v-row>
            </div>
          </v-expand-transition>
        </v-img>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: '',
    },
    item: {
      required: true,
    },
  },
  methods: {
    delete(item) {
      console.log(item)
    },
  },
}
</script>

<style scoped></style>
