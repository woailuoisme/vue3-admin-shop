<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card class="mb-4">
          <Breadcrumb :items="breadcrumbs" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar flat>
            <v-toolbar-title>订单管理</v-toolbar-title>
            <v-spacer />
            <v-text-field
              v-model="requestParams.keyword"
              clearable
              append-inner-icon="mdi-magnify"
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
        <v-card :loading="isLoading" :disabled="isLoading">
          <EasyDataTable
            v-model:server-options="requestParams"
            :server-items-length="total"
            :loading="isLoading"
            :headers="headers"
            :items="orders"
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
              <v-btn v-if="showExpress(item.order_status)" color="info" tile small @click.stop="confirmedItem(item)">更新物流</v-btn>
            </template>
          </EasyDataTable>
        </v-card>
        <v-dialog v-model="dialogEntity" persistent max-width="600px" />
        <v-dialog v-model="dialogDetail" max-width="800">
          <dialog-details :category="mapCategory" @close="dialogDetail = false" />
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogDetails from '@/views/components/adminOrder/DialogDetails'
import { computed, nextTick, onMounted, ref, unref, watch, onBeforeMount } from 'vue'
import { useBreadcrumb, useGlobal, useOrder, useTableHeader } from '@/stores'
import { orderStatusLabel } from '@/utils/table'
import { storeToRefs } from 'pinia/dist/pinia'

const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const orderStore = useOrder()

const headers = computed(() => tableHeaderStore.orders)
const breadcrumbs = computed(() => breadcrumbStore.order)
const { orders, total, isNew, editedItem, editedIndex } = storeToRefs(orderStore)
const { isLoading } = storeToRefs(globalStore)

// const findProduct = computed(() => productStore.findById)

const dialogEntity = ref(false)
const dialogDetail = ref(false)

const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  keyword: '',
})
const mapCategory = ref({})

onMounted(() => {
  orderStore.loadAllOrders(unref(requestParams))
})

watch(
  requestParams,
  (value) => {
    orderStore.loadAllOrders(unref(requestParams))
  },
  { deep: true }
)

watch(dialogEntity, (val) => {
  val || close()
})

function view(item) {
  mapCategory.value = orderStore.getMapOrder(item.id)
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
  dialogEntity.value = false
  nextTick(() => {})
}
function closeDetails() {
  dialogDetail.value = false
  nextTick(() => {})
}

function confirmedItem(item) {
  dialogEntity.value = false
}
</script>

<style scoped></style>
