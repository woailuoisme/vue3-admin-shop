<template>
  <div ref="domRef" class="w-full h-full"></div>
</template>

<script setup>
import { useScriptTag } from "@vueuse/core"

const { TENCENT_MAP_SDK_URL } = process.env

defineOptions({ name: "TencentMap" })

const { load } = useScriptTag(TENCENT_MAP_SDK_URL)

const domRef = (ref < HTMLDivElement) | (null > null)

async function renderMap() {
  await load(true)
  if (!domRef.value) return
  // eslint-disable-next-line no-new
  // new TMap.Map(domRef.value, {
  //   center: new TMap.LatLng(39.98412, 116.307484),
  //   zoom: 11,
  //   viewMode: "3D",
  // })
}

onMounted(() => {
  renderMap()
})
</script>

<style scoped></style>
