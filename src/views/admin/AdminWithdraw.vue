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
          <v-toolbar flat>
            <v-toolbar-title>提现管理</v-toolbar-title>
            <v-spacer/>
            <v-text-field
              v-model="requestParams.keyword"
              append-icon="mdi-magnify"
              placeholder="姓名"
              single-line
              hide-details
              solo
            />
          </v-toolbar>
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
            :items="withdraws"
            :rows-items="[10, 20, 50]"
          >
            <template #item-operation="item">
              <v-btn v-if="isShow(item)" color="info" tile small @click.stop="confirmedItem(item)">
                处理
              </v-btn>
            </template>
            <template #item-status="{status}">
              <v-chip :color="statusClass(status)" small>
                {{ statusLabel(status) }}
              </v-chip>
            </template>
          </EasyDataTable>
        </v-card>
        <v-dialog v-model="dialogEntity" persistent max-width="600px">

        </v-dialog>
        <v-dialog v-model="dialogDetail" max-width="800">
          <dialog-details :withdraw="mapCategory"></dialog-details>
        </v-dialog>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogDetails from '@/views/components/adminWithDraw/DialogDetails'
import {computed, nextTick, onMounted, ref, watch} from 'vue'
import {useBreadcrumb, useGlobal, useWithdraw, useTableHeader} from '@/stores'

const withdrawStore = useWithdraw()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()

const headers = computed(() => tableHeaderStore.withdraw)
const breadcrumbs = computed(() => breadcrumbStore.withdraw)
const withdraws = computed(() => withdrawStore.getWithdraws)
const serverItemsLength = computed(() => withdrawStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => withdrawStore.isNew)
const editedItem = computed(() => withdrawStore.getEditedItem)
const editedIndex = computed(() => withdrawStore.getEditedIndex)
const dialogEntity = ref(false)
const dialogDetail = ref(false)

let mapWithdraw


const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  keyword: ''
})
let mapCategory;

onMounted(() => {
  console.log('onMounted')
  withdrawStore.loadAllWithdraws(requestParams._rawValue)
})

watch(
  requestParams,
  (value) => {
    withdrawStore.loadAllWithdraws(requestParams._rawValue)
  },
  {deep: true}
)

watch(dialogEntity, (val) => {
  console.log(val)
  val || close()
})

function isShow(item) {
  if (item.status === 'pending') {
    return true
  } else if (item.status === 'finished') {
    return false
  } else if (item.status === 'rejected') {
    return true
  }
  return false
}

function detail(item) {
  mapWithdraw = withdrawStore.findByWithdrawId(item.id)
  dialogDetail.value = true
}

function close() {
  dialogEntity.value = false
  nextTick(() => {
    withdrawStore.resetEdited()
  })
}

function confirmedItem(item) {
  withdrawStore.findAndSetItem(item)
  dialogEntity.value = true
}

function save() {
  this.confirmedWithdraw(this.editedItem)
  this.close()
}

function statusLabel(value) {
  if (value === 'pending') {
    return '已申请'
  } else if (value === 'passed') {
    return '已通过'
  } else if (value === 'rejected') {
    return '已拒绝'
  }
}

function statusClass(value) {
  if (value === 'pending') {
    return 'primary'
  } else if (value === 'passed') {
    return 'success'
  } else if (value === 'rejected') {
    return 'error'
  }
}



</script>

<style scoped>

</style>
