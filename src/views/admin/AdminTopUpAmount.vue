<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <Breadcrumb :items="breadcrumbs"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-btn prepend-icon="mdi-plus" variant="flat" color="primary" dark class="mb-2">新 增</v-btn>
          <v-spacer/>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading" :disabled="loading">
          <EasyDataTable
            buttons-pagination
            alternating
            header-text-direction="center"
            body-text-direction="center"
            table-class-name="customize-table"
            v-model:server-options="requestParams"
            :server-items-length="serverItemsLength"
            :loading="loading"
            :headers="headers"
            :items="amounts"
            :rows-items="[10, 20, 50]"
          >

            <template #item-operation="item">
              <v-btn color="info" size="small" @click.stop="editItem(item)">修改</v-btn>
              <v-btn class="ml-3" color="error" size="small" @click.stop="deleteItem(item)">删除</v-btn>
            </template>
          </EasyDataTable>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialogDelete" max-width="500px"></v-dialog>
    <v-dialog v-model="dialogEntity" max-width="500px"></v-dialog>
  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogDetails from '@/views/components/adminProduct/DialogDetails'
import {computed, nextTick, onMounted, ref, watch} from 'vue'
import {useBreadcrumb, useGlobal, useTopUpAmount, useTableHeader} from '@/stores'

const amountStore = useTopUpAmount()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()

const headers = computed(() => tableHeaderStore.topUpAmount)
const breadcrumbs = computed(() => breadcrumbStore.topUpAmount)
const amounts = computed(() => amountStore.getAmount)
const serverItemsLength = computed(() => amountStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => amountStore.isNew)
const editedItem = computed(() => amountStore.getEditedItem)
const editedIndex = computed(() => amountStore.getEditedIndex)
const dialogEntity = ref(false)
const dialogDelete = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
})

onMounted(() => {
  amountStore.loadAllAmount(requestParams._rawValue)
})

watch(
  requestParams,
  (value) => {
    amountStore.loadAllAmount(requestParams._rawValue)
  },
  {deep: true}
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
  amountStore.findAndSetItem(item)
  dialogEntity.value = true
}

function deleteItem(item) {
  amountStore.findAndSetItem(item)
  dialogDelete.value = true
}

function deleteItemConfirm(item) {
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

function save() {
  if (editedIndex > -1) {
    amountStore.updateAmount(editedItem)
  } else {
    amountStore.createAmount(editedItem)
  }
  this.close()
}

function activeColor(value) {
  if (value) {
    return 'success'
  } else {
    return 'error'
  }
}
</script>
<style scoped>
@import '../../styles/data-table.css';

</style>
