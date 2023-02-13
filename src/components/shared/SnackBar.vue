<template>
  <v-snackbar
    v-model="snackbar"
    :bottom="bottom"
    :color="color"
    :left="left"
    :multi-line="false"
    :right="right"
    :timeout="timeout"
    :top="top"
  >
    <span class="text-truncate">{{ text }}</span>
    <v-divider vertical />
    <v-btn dark text @click="snackbar = false">关闭</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'SnackBar',
  props: {
    text: {
      type: String,
      required: true,
    },
    timeout: {
      type: Number,
      default: 2000,
    },
    color: {
      type: String,
      default: 'success',
    },
    top: {
      type: Boolean,
      default: true,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: true,
    },
  },
}
</script>

<style scoped></style>
