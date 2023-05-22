<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-btn variant="flat" color="primary" @click.stop="addItem">
            {{ $t("table.operation.add") }}
          </v-btn>
          <v-spacer />
          <v-text-field
            v-model="requestParams.keyword"
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
            :placeholder="$t('table.search.keyword')"
            single-line
            hide-details
          />
          <v-divider vertical thickness="2" color="primary" class="mx-2"></v-divider>
          <v-btn
            class="ma-4"
            variant="flat"
            icon="mdi-refresh"
            :class="{ 'animate-spin': isLoading }"
            color="info"
            size="medium"
            @click="reload"
          ></v-btn>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-card :loading="isLoading" :disabled="isLoading">
        <easy-data-table
          v-bind="dataTableAttr"
          v-model:server-options="requestParams"
          :server-items-length="total"
          :loading="isLoading"
          :headers="headers"
          :items="amounts"
          :theme-color="tableColor"
          :table-class-name="tableClass"
          :hide-footer="isHideFooter"
        >
          <template #item-operation="item">
            <v-icon icon="mdi-square-edit-outline" color="primary" size="large" class="mx-1" @click.stop="editItem(item)"></v-icon>
            <v-icon icon="mdi-trash-can-outline" color="error" size="large" @click.stop="deleteItem(item)"></v-icon>
          </template>
        </easy-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialogEntity" max-width="500px" persistent>
    <entity :item="editedItem" :is-new="isNew" @close="close" @save="save" />
  </v-dialog>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm" />
  </v-dialog>
</template>

<script setup>
import DialogConfirm from "./components/common/DialogConfirm"
import Entity from "./components/topUpAmount/TopUpEntity"
import { useBreadcrumb, useGlobal, useTableHeader, useTopUpAmount } from "@/stores"
// import {dataTableAttr} from "@/utils"

const amountStore = useTopUpAmount()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const headers = computed(() => tableHeaderStore.topUpAmount)

const { amounts, total, isNew, editedItem, editedIndex, isHideFooter } = storeToRefs(amountStore)
const { isLoading } = storeToRefs(globalStore)
const vuetifyTheme = useTheme()
const tableClass = computed(() => (vuetifyTheme.current.value.dark ? "customize-table-dark" : "customize-table"))
const tableColor = computed(() => vuetifyTheme.current.value.colors.primary)
const dialogEntity = ref(false)
const dialogDelete = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "",
  sortType: "",
})
const search = debounce((value) => amountStore.loadAllAmount(value), 800)

onMounted(() => {
  amountStore.loadAllAmount(unref(requestParams))
})
watch(
  requestParams,
  (value) => {
    debugger
    search(unref(value))
  },
  { deep: true },
)

function reload() {
  search(unref(requestParams))
}

function addItem() {
  dialogEntity.value = true
}

function editItem(item) {
  amountStore.findAndSetItem(item)
  dialogEntity.value = true
}

function deleteItem(item) {
  amountStore.findAndSetItem(item)
  dialogDelete.value = true
}

function deleteItemConfirm() {
  amountStore.deleteAmount(editedItem.value.id)
  dialogDelete.value = false
  nextTick(() => {
    amountStore.resetEdited()
  })
}

function close() {
  dialogEntity.value = false
  nextTick(() => {
    amountStore.resetEdited()
  })
}

function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    amountStore.resetEdited()
  })
}

function save(values) {
  if (editedIndex.value > -1) {
    const entity = { id: editedItem.value?.id, ...values }
    amountStore.updateAmount(entity)
  } else {
    amountStore.createAmount(values)
  }
  close()
}
</script>

<style scoped></style>
