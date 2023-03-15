<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-item>
          <template #append>
            <v-divider vertical indent thickness="3" class="mx-3"></v-divider>
            <v-icon size="1.9rem" icon="mdi-refresh" @click.stop="refresh" />
          </template>
          <v-card-title>
            <v-btn variant="flat" color="primary" dark>{{ $t("form.title.add") }}</v-btn>
          </v-card-title>
        </v-card-item>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-card :loading="isLoading" :disabled="isLoading">
        <v-container fluid>
          <v-row>
            <v-col v-if="!hasData" class="text-center" cols="12">暂无数据</v-col>
            <v-col v-else cols="12">
              <v-table>
                <thead>
                  <tr>
                    <th class="text-center">id</th>
                    <th class="text-center">排序</th>
                    <th class="text-center">图片</th>
                    <th class="text-center">创建时间</th>
                    <th class="text-center">操作</th>
                  </tr>
                </thead>
                <draggable :list="carousels" tag="tbody" item-key="id" drag-class="drag" ghost-class="ghost" @change="dragChange">
                  <template #item="{ element }">
                    <tr class="my-1">
                      <td class="text-center">
                        <v-chip color="primary" small tile>{{ element.id }}</v-chip>
                      </td>
                      <td class="text-center">{{ element.order }}</td>
                      <td class="text-center">
                        <table-image :image="element.image_url"></table-image>
                      </td>
                      <td class="text-center">{{ element.created_at }}</td>
                      <td class="text-center">
                        <v-btn color="info" tile small @click.stop="editItem(element)">修改</v-btn>
                        <v-btn class="ml-3" color="error" tile small @click.stop="deleteItem(element)">删除</v-btn>
                      </td>
                    </tr>
                  </template>
                </draggable>
              </v-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialogDelete" max-width="500px" />
  <v-dialog v-model="dialogEntity" max-width="500px" />
</template>

<script setup>
import TableImage from "@/components/table/TableImage"
import { computed, nextTick, onMounted, ref, unref, watch } from "vue"
import { useCarousel, useGlobal, useTableHeader } from "@/stores"
import { storeToRefs } from "pinia/dist/pinia"
import { debounce } from "lodash-es"

const carouselStore = useCarousel()
const globalStore = useGlobal()
const tableHeaderStore = useTableHeader()
const headers = computed(() => tableHeaderStore.carousel)

const { carousels, total, isNew, editedItem, editedIndex, hasData } = storeToRefs(carouselStore)
const { isLoading } = storeToRefs(globalStore)

const dialogEntity = ref(false)
const dialogDelete = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
})

onMounted(() => {
  carouselStore.loadAllCarousels(unref(requestParams.value))
})

const search = debounce((value) => carouselStore.loadAllCarousels(value), 800)

function refresh() {
  search(unref(requestParams.value))
}

function dragChange(e) {
  let item = e.added || e.moved
  if (!item) return
  let index = item.newIndex
  carousels.value.forEach((item, index) => (item.order = index + 1))
  const mapCarousel = carousels.value.map((c) => {
    return { id: c?.id, order: c.order }
  })
  console.log(mapCarousel)
  console.log(index)
}

watch(
  requestParams,
  (value) => {
    carouselStore.loadAllCarousels(requestParams.value._rawValue)
  },
  { deep: true },
)

watch(dialogEntity, (val) => {
  console.log(val)
  val || close()
})

watch(dialogDelete, (val) => {
  console.log(val)
  val || closeDelete()
})

function editItem(item) {
  carouselStore.findAndSetItem(item)
  dialogEntity.value = true
}

function deleteItem(item) {
  carouselStore.findAndSetItem(item)
  dialogDelete.value = true
}

function deleteItemConfirm(item) {
  carouselStore.deleteCarousel(editedItem.value.id)
  dialogDelete.value = false
  nextTick(() => {
    carouselStore.resetEdited()
  })
}

function close() {
  dialogDelete.value = false
  nextTick(() => {
    carouselStore.resetEdited()
  })
}

function closeDelete() {
  if (editedIndex.value > -1) {
    carouselStore.updateCarousel(editedItem)
  } else {
    carouselStore.createCarousel(editedItem)
  }
  this.close()
}

function save(value) {
  if (this.editedIndex > -1) {
    carouselStore.updateCarousel(value)
  } else {
    carouselStore.createCarousel(value)
  }
  this.close()
}
</script>

<style scoped></style>
