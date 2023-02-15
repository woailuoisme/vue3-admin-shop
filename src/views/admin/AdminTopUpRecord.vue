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
            <v-toolbar-title>充值记录</v-toolbar-title>
            <v-spacer/>
            <v-text-field
              v-model="requestParams.keyword"
              append-icon="mdi-magnify"
              placeholder="ID/名字"
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
            :items="records"
            :rows-items="[10, 20, 50]"
          >

            <template #item-status="{ status }">
              <v-chip :color="statusClass(status)" small>
                {{ statusLabel(status) }}
              </v-chip>
            </template>

            <template #item-operation="item">
              <v-btn variant="flat" v-if="isShow(item)" color="info" tile small @click.stop="confirmedItem(item)">
                处理
              </v-btn>
            </template>

          </EasyDataTable>
        </v-card>
        <v-dialog v-model='dialogEntity' persistent max-width="600px">

        </v-dialog>
        <v-dialog v-model="dialogDetail" max-width="800">

        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import {computed, onMounted, ref, watch, nextTick} from 'vue'
import {useBreadcrumb, useGlobal, useTableHeader, useTopUpRecord} from '@/stores'

const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const recordStore = useTopUpRecord()
const headers = computed(() => tableHeaderStore.topUpRecord)
const breadcrumbs = computed(() => breadcrumbStore.topUpRecord)
const records = computed(() => recordStore.getRecords)
const serverItemsLength = computed(() => recordStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => recordStore.isNew)
const editedItem = computed(() => recordStore.getEditedItem)
const editedIndex = computed(() => recordStore.getEditedIndex)

const dialogEntity = ref(false)
const dialogDetail = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  keyword: ''
})

let mapProduct;

onMounted(() => {
  recordStore.loadAllRecords(requestParams._rawValue)
})

watch(
  requestParams,
  (value) => {
    recordStore.loadAllRecords(requestParams._rawValue)
  },
  {deep: true}
)

watch(dialogEntity, (val) => {
  console.log(val)
  val || close()
})

watch(dialogDetail, (val) => {
  console.log(val)
  val || close()
})

function detail(item) {
  mapProduct = recordStore.getMapReconds(item.id)
  this.detailsDialog = true
}

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


function close() {
  this.confirmDialog = false
  nextTick(() => {
    this.editedItem = Object.assign({}, this.defaultItem)
    // this.editedIndex = -1
  })
}

function confirmedItem(item) {
  this.editedIndex = this.records.indexOf(item)
  this.editedItem = Object.assign(this.editedItem, item)
  this.confirmDialog = true
}

function save() {
  recordStore.confirmedTopUp(this.editedItem)
  close()
}

function activeColor(value) {
  if (value) {
    return 'success'
  } else {
    return 'error'
  }
}

function statusLabel(value) {
  if (value === 'pending') {
    return '已申请'
  } else if (value === 'finished') {
    return '已通过'
  } else if (value === 'rejected') {
    return '已拒绝'
  }
}

function statusClass(value) {
  if (value === 'pending') {
    return 'primary'
  } else if (value === 'finished') {
    return 'success'
  } else if (value === 'rejected') {
    return 'error'
  }
}


</script>

<style scoped>
@import '../../styles/data-table.css';
</style>
