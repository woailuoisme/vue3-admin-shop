<template>
  <div class="h-full">
    <v-card title="视频播放器插件" class="h-full shadow-sm rounded-16px">
      <div ref="domRef" class=""></div>
    </v-card>
  </div>
</template>

<script setup>
import Player from "xgplayer"
//HTMLElement
const domRef = ref()
//Player
const player = ref()

function renderXgPlayer() {
  if (!domRef.value) return
  const url = "https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4"
  player.value = new Player({
    el: domRef.value,
    url,
    playbackRate: [0.5, 0.75, 1, 1.5, 2],
    fluid: true,
  })
}

function destroyXgPlayer() {
  player.value?.destroy()
}

onMounted(() => {
  renderXgPlayer()
})

onUnmounted(() => {
  destroyXgPlayer()
})
</script>

<style scoped></style>
