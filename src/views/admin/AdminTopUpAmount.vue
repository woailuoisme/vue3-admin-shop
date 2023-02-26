<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <Breadcrumb :items="breadcrumbs" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-toolbar :elevation="2" flat>
          <v-btn variant="flat" color="primary" @click.stop="addItem">
            {{ $t('table.operation.add') }}
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
        </v-toolbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="isLoading" :disabled="isLoading">
          <EasyDataTable
            v-model:server-options="requestParams"
            :server-items-length="total"
            :loading="isLoading"
            :headers="headers"
            :items="amounts"
          >
            <template #item-operation="item">
              <v-btn color="info" @click.stop="editItem(item)">{{ $t('table.operation.update') }}</v-btn>
              <v-btn class="mx-3" color="error" @click.stop="deleteItem(item)">{{ $t('table.operation.delete') }}</v-btn>
            </template>
          </EasyDataTable>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogEntity" max-width="500px" persistent>
      <dialog-entity-form :item="editedItem" :is-new="isNew" @close="close" @save="save" />
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm" />
    </v-dialog>
  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogConfirm from '@/views/components/common/DialogConfirm'
import DialogEntityForm from '@/views/components/adminTopUpAmount/DialogEntityForm'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBreadcrumb, useGlobal, useTopUpAmount, useTableHeader } from '@/stores'

const amountStore = useTopUpAmount()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const headers = computed(() => tableHeaderStore.topUpAmount)
const breadcrumbs = computed(() => breadcrumbStore.topUpAmount)
const { amounts, total, isNew, editedItem, editedIndex } = storeToRefs(amountStore)
const { isLoading } = storeToRefs(globalStore)
const dialogEntity = ref(false)
const dialogDelete = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  keyword: '',
})

onMounted(() => {
  amountStore.loadAllAmount(unref(requestParams))
})

watch(
  requestParams,
  (value) => {
    amountStore.loadAllAmount(unref(requestParams))
  },
  { deep: true }
)

watch(
  [dialogEntity, dialogDelete, requestParams],
  ([newEntry, newDelete, newRequestParams]) => {
    console.log(newEntry, newDelete)
    newEntry || close()
    newDelete || closeDelete()
  },
  { deep: true }
)

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

function close() {
  dialogEntity.value = false
  nextTick(() => {
    amountStore.resetEdited()
  })
}

function deleteItemConfirm(item) {
  amountStore.deleteAmount(editedItem.value.id)
  dialogDelete.value = false
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
    const entity = { id: editedItem.value.?id, ...values }
    amountStore.updateAmount(entity)
  } else {
    amountStore.createAmount(values)
  }
  close()
}
</script>
<style scoped></style>
