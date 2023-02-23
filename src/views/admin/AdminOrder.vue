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
            <v-toolbar-title>订单管理</v-toolbar-title>
            <v-spacer/>
            <v-text-field
              v-model="requestParams.keyword"
              append-icon="mdi-magnify"
              placeholder="订单编号/姓名"
              single-line
              hide-details
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
            :items="orders"
            :rowsPerPage="20"
            :rows-items="[10, 20, 50]"
          >
            <template #item-order_num="item">
              <v-chip color="primary" small tile @click.stop="detail(item)">{{ item.order_num }}</v-chip>
            </template>
            <template #item-order_status="item">
              <v-chip color="success" small>
                {{ orderStatusLabel(item.order_status) }}
              </v-chip>
            </template>
            <template #item-operation="item">
              <v-btn
                v-if="showExpress(item.order_status)"
                color="info"
                tile
                small
                @click.stop="confirmedItem(item)"
              >
                更新物流
              </v-btn>
            </template>

          </EasyDataTable>
        </v-card>
        <v-dialog v-model="dialogExpress" persistent max-width="600px">
        </v-dialog>
        <v-dialog v-model="dialogDetail" max-width="800">
          <dialog-details :category="mapCategory" @close=" dialogDetail = false"></dialog-details>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TableImage from '@/components/table/TableImage'
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogConfirm from '@/views/components/adminProduct/DialogConfirm'
import DialogDetails from '@/views/components/adminOrder/DialogDetails'
import {computed, nextTick, onMounted, ref, watch, onBeforeMount} from 'vue'
import {useBreadcrumb, useGlobal, useOrder, useTableHeader} from '@/stores'
import {orderStatusLabel} from "@/utils/table"

const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const orderStore = useOrder()
const headers = computed(() => tableHeaderStore.orders)
const breadcrumbs = computed(() => breadcrumbStore.order)
const orders = computed(() => orderStore.getOrders)
const serverItemsLength = computed(() => orderStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => orderStore.isNew)
const editedItem = computed(() => orderStore.getEditedItem)
const editedIndex = computed(() => orderStore.getEditedIndex)
// const findProduct = computed(() => productStore.findById)

const dialogEntity = ref(false)
const dialogExpress = ref(false)
const dialogDetail = ref(false)

const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  keyword: ''
})
let mapCategory;

onMounted(() => {
  console.log('onMounted')
  orderStore.loadAllOrders(requestParams._rawValue)
})

watch(
  requestParams,
  (value) => {
    orderStore.loadAllOrders(requestParams._rawValue)
  },
  {deep: true}
)

watch(dialogEntity, (val) => {
  console.log(val)
  val || close()
})

async function copy(mytext) {
  try {
    await navigator.clipboard.writeText(mytext);
    // alert('Copied');
  } catch ($e) {
    // alert('Cannot copy');
  }
}

function detail(item) {
  copy(item?.order_num)
  mapCategory = orderStore.getMapOrder(item.id)
  dialogDetail.value = true
}

function showExpress(value) {
  if (value === 'pending') {
    return false
  } else if (value === 'paid') {
    return true
  } else if (value === 'pending_finished') {
    return false
  } else if (value === 'pending_review') {
    return true
  } else if (value === 'express') {
    return true
  } else if (value === 'finished') {
    return false
  } else if (value === 'canceled') {
    return false
  } else {
    return false
  }
}


function close() {
  dialogExpress.value = false
  nextTick(() => {
    // this.editedItem = Object.assign({}, this.defaultItem)
    // this.editedIndex = -1
  })
}

function confirmedItem(item) {
  // this.editedIndex = this.orders.indexOf(item)
  // this.editedItem = Object.assign(this.editedItem, item)
  this.expressDialog = true
}

function save() {
  // orderStore.updateOrderExpress(this.editedItem)
  this.close()
}

</script>

<style scoped>

</style>
