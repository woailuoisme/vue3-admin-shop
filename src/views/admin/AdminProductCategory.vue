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
          <v-card-title>
            <v-btn prepend-icon="mdi-plus" variant="flat" color="primary" dark class="mb-2" @click="addItem">新 增</v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading" :disabled="loading">
          <easy-data-table
            v-model:server-options="requestParams"
            buttons-pagination
            alternating
            header-text-direction="center"
            body-text-direction="center"
            table-class-name="customize-table"
            :server-items-length="serverItemsLength"
            :loading="loading"
            :headers="headers"
            :items="categories"
            :rows-items="[10, 20, 50]"
          >
            <template #item-image_url="{ image_url }">
              <table-image :image="image_url" />
            </template>

            <template #item-="{ avatar }">
              <table-image :image="avatar" />
            </template>
            <template #item-operation="item">
              <v-btn class="ml-1" icon="mdi-pencil" color="warning" size="small" tile @click.stop="editItem(item)" />
              <v-btn class="ml-1" icon="mdi-delete" color="error" size="small" tile @click.stop="deleteItem(item)" />
            </template>
          </easy-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="300px">
      <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm" />
    </v-dialog>
    <v-dialog v-model="dialogEntity" max-width="1300px">
      <dialog-entity :item="editedItem" :is-new="isNew" @close="dialogEntity = false" @save="save" />
    </v-dialog>
  </v-container>
</template>

<script setup>
import TableImage from '@/components/table/TableImage'
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogConfirm from '@/views/components/adminProduct/DialogConfirm'
import DialogEntity from '@/views/components/adminProductCategory/DialogEntity'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useBreadcrumb, useGlobal, useProductCategory, useTableHeader } from '@/stores'

const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const categoryStore = useProductCategory()

const headers = computed(() => tableHeaderStore.productCategories)
const breadcrumbs = computed(() => breadcrumbStore.productCategory)
const categories = computed(() => categoryStore.getCategories)
const serverItemsLength = computed(() => categoryStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => categoryStore.isNew)
const editedItem = computed(() => categoryStore.getEditedItem)
const editedIndex = computed(() => categoryStore.getEditedIndex)
// const findProduct = computed(() => productStore.findById)

const dialogEntity = ref(false)
const dialogDelete = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
})
let mapProduct

onMounted(() => {
  categoryStore.loadCategories()
})

watch(
  requestParams,
  (value) => {
    categoryStore.loadCategories(requestParams.value._rawValue)
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

function addItem() {
  dialogEntity.value = true
}

function editItem(item) {
  categoryStore.findAndSetItem(item)
  dialogEntity.value = true
}

function deleteItem(item) {
  categoryStore.findAndSetItem(item)
  dialogDelete.value = true
}

function deleteItemConfirm() {
  debugger
  categoryStore.deleteCategory(editedItem.value.id)
  dialogDelete.value = false
  nextTick(() => {
    categoryStore.resetEdited()
  })
}

function close() {
  dialogEntity.value = false
  nextTick(() => {
    categoryStore.resetEdited()
  })
}

function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    categoryStore.resetEdited()
  })
}

function save() {
  if (editedIndex.value > -1) {
    categoryStore.updateCategory(editedItem)
  } else {
    categoryStore.createCategory(editedItem)
  }
  this.close()
}
</script>

<style scoped></style>
