<template>
  <v-btn v-show="fab" v-scroll="onScroll" bottom color="primary" dark fab fixed right @click="toTop">
    <v-icon>mdi-chevron-up</v-icon>
  </v-btn>
</template>

<script setup>
import vue from '../../main'
import { ref } from 'vue'

const fab = ref(false)

const onScroll = (e) => {
  if (typeof window === 'undefined') return
  const top = window.pageYOffset || e.target.scrollTop || 0
  this.fab = top > 20
}
const toTop = (e) => {
  vue.$vuetify.goTo(0)
}
</script>

<style scoped></style>
