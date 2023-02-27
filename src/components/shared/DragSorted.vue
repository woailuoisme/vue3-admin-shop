<template>
  <v-container fluid>
    <draggable :list="list" item-key="id" class="v-row" drag-class="drag" ghost-class="ghost" group="images" @change="onChange">
      <template #item="{ element }">
        <v-col cols="3">
          <image-remove :url="element.url" />
        </v-col>
      </template>
    </draggable>
  </v-container>
</template>

<script setup>
import draggable from 'vuedraggable'
import ImageRemove from '@/components/shared/ImageRemove'
import { ref, toRaw, markRaw } from 'vue'

const list = ref([
  { name: 'John', id: 0, url: 'https://via.placeholder.com/150', position: 1 },
  { name: 'Joao', id: 1, url: 'https://via.placeholder.com/150', position: 2 },
  { name: 'Jean', id: 2, url: 'https://via.placeholder.com/150', position: 3 },
  { name: 'Tom', id: 3, url: 'https://via.placeholder.com/150', position: 4 },
  { name: 'Alice', id: 4, url: 'https://via.placeholder.com/150', position: 5 },
])

function onChange(e) {
  let item = e.added || e.moved
  if (!item) return
  let index = item.newIndex
  // let prevCard = list.value[index - 1]
  // let nextCard = list.value[index + 1]
  // let card = list.value[index]
  // let position = card.position
  // if (prevCard && nextCard) {
  //   position = (prevCard.position + nextCard.position) / 2
  // } else if (prevCard) {
  //   position = prevCard.position + prevCard.position / 2
  // } else if (nextCard) {
  //   position = nextCard.position / 2
  // }
  // const foundIndex = list.value.findIndex((x) => x.id === card.id)
  // list.value[foundIndex].position = position
  list.value.forEach((item, index) => (item.position = index + 1))
  console.log(index)
  console.log(e)
  console.log(toRaw(list.value))
  // console.log(toRaw(toRaw(list).value))
}
</script>

<style scoped></style>
