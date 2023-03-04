<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <breadcrumb :items="breadcrumbs" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar flat>
            <v-btn variant="flat" color="primary" dark>{{ $t('form.title.add') }}</v-btn>
            <v-spacer />
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="isLoading" :disabled="isLoading">
          <easy-data-table
            v-model:server-options="requestParams"
            :server-items-length="total"
            :loading="isLoading"
            :headers="headers"
            :items="carousels"
          >
            <template #item-id="{ id }">
              <v-chip color="primary" small tile>{{ id }}</v-chip>
            </template>

            <template #item-image_url="{ image_url }">
              <table-image :image="image_url" :max-height="40" />
            </template>

            <template #item-operation="item">
              <v-btn color="info" tile small @click.stop="editItem(item)">修改</v-btn>
              <v-btn class="ml-3" color="error" tile small @click.stop="deleteItem(item)">删除</v-btn>
            </template>
          </easy-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="500px" />
    <v-dialog v-model="dialogEntity" max-width="500px" />
  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import TableImage from '@/components/table/TableImage'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useBreadcrumb, useCarousel, useGlobal, useTableHeader } from '@/stores'
import { storeToRefs } from 'pinia/dist/pinia'

const carouselStore = useCarousel()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const headers = computed(() => tableHeaderStore.carousel)
const breadcrumbs = computed(() => breadcrumbStore.carousel)

const { carousels, total, isNew, editedItem, editedIndex } = storeToRefs(carouselStore)
const { isLoading } = storeToRefs(globalStore)

const dialogEntity = ref(false)
const dialogDelete = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
})

onMounted(() => {
  carouselStore.loadAllCarousels(requestParams.value._rawValue)
})

watch(
  requestParams,
  (value) => {
    carouselStore.loadAllCarousels(requestParams.value._rawValue)
  },
  { deep: true }
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
