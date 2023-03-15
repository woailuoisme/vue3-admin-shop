<template>
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
      <v-card :loading="isLoading" :disabled="isLoading">
        <easy-data-table
          v-model:server-options="requestParams"
          :server-items-length="total"
          :loading="isLoading"
          :headers="headers"
          :items="categories"
          :table-class-name="tableClass"
          :hide-footer="isHideFooter"
        >
          <template #item-image_url="{ image_url }">
            <table-image :image="image_url" />
          </template>

          <template #item-="{ avatar }">
            <table-image :image="avatar" />
          </template>
          <template #item-operation="item">
            <v-icon class="ml-1" icon="mdi-square-edit-outline" color="primary" size="large" @click.stop="editItem(item)"></v-icon>
            <v-icon class="ml-1" icon="mdi-trash-can-outline" color="error" size="large" @click.stop="deleteItem(item)"></v-icon>
          </template>
        </easy-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialogDelete" max-width="300px">
    <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm" />
  </v-dialog>
  <v-dialog v-model="dialogEntity" max-width="600px">
    <entity :item="editedItem" :is-new="isNew" @close="dialogEntity = false" @save="save" />
  </v-dialog>
</template>

<script setup>
import TableImage from "@/components/table/TableImage"
import DialogConfirm from "./components/common/DialogConfirm"
import Entity from "./components/productCategory/Entity"
import { computed, nextTick, onMounted, ref, unref, watch } from "vue"
import { useBreadcrumb, useGlobal, useProductCategory, useTableHeader } from "@/stores"
import { storeToRefs } from "pinia"
import { useTheme } from "vuetify"

const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const categoryStore = useProductCategory()
const vuetifyTheme = useTheme()

const headers = computed(() => tableHeaderStore.productCategories)
const breadcrumbs = computed(() => breadcrumbStore.productCategory)

const { categories, total, isNew, editedItem, editedIndex, isHideFooter } = storeToRefs(categoryStore)
const { isLoading } = storeToRefs(globalStore)

const tableClass = computed(() => (vuetifyTheme.global.name.value === "dark" ? "customize-table-dark" : "customize-table"))

const dialogEntity = ref(false)
const dialogDelete = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
})
let mapProduct

onMounted(() => {
  categoryStore.loadCategories(unref(requestParams))
})

watch(
  requestParams,
  (value) => {
    categoryStore.loadCategories(unref(requestParams))
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
