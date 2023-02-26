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
            <v-text-field v-model="filter.keyword" clearable prepend-inner-icon="mdi-magnify" placeholder="订单编号/姓名" single-line hide-details />
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
              <v-chip color="primary" variant="elevated" tile @click.stop="copy(item.order_num)">{{ item.order_num }}</v-chip>
            </template>
            <template #item-order_status="item">
              <v-chip color="success" small>
                {{ orderStatusLabel(item.order_status) }}
              </v-chip>
            </template>
            <template #item-operation="item">
              <v-btn v-if="orderShowExpress(item.order_status)" color="success" tile small @click.stop="confirmedItem(item)">更新物流</v-btn>
              <v-btn color="info" variant="flat" @click.stop="view(item)">查看</v-btn>
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
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { useBreadcrumb, useGlobal, useOrder, useTableHeader } from '@/stores'
import { orderStatusLabel,orderShowExpress } from '@/utils/table'
import { storeToRefs } from 'pinia/dist/pinia'
import useClipboard from 'vue-clipboard3'
import Toast from '@/utils/toast'
import _ from 'lodash'
const { toClipboard } = useClipboard()

const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const orderStore = useOrder()

const headers = computed(() => tableHeaderStore.orders)
const breadcrumbs = computed(() => breadcrumbStore.order)
const { orders, total, isNew, editedItem, editedIndex } = storeToRefs(orderStore)
const { isLoading } = storeToRefs(globalStore)
const show = ref(false)

// const findProduct = computed(() => productStore.findById)

const dialogEntity = ref(false)
const dialogDetail = ref(false)

const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
})

const filter = ref({
  keyword: '',
})

const mapCategory = ref({})
const search =  _.debounce((value) => orderStore.loadAllOrders(value), 1000)
onMounted(() => {
  orderStore.loadAllOrders({ ...unref(requestParams), ...unref(filter) })
})

watch(
  [requestParams, filter],
  ([value, val]) => {
    search({ ...unref(value), ...unref(val)})
  },
  { deep: true }
)

watch(dialogEntity, (val) => {
  val || close()
})

async function copy(value) {
  try {
    await toClipboard(value)
    show.value = true
    Toast.info("'Copied to clipboard'")
  } catch (e) {
    console.error(e)
  }
}

function view(item) {
  mapCategory.value = orderStore.getMapOrder(item.id)
  dialogDetail.value = true
}

function close() {
  dialogEntity.value = false
  nextTick(() => {
    orderStore.resetEdited()
  })
}
function closeDetails() {
  dialogDetail.value = false
  nextTick(() => {
    orderStore.resetEdited()
  })
}

function editItem(item) {
  orderStore.findAndSetItem(item)
  dialogEntity.value = true
}

function save(values) {
  const entity = { id: editedItem.value?.id, ...values }
  orderStore.updateOrderExpress(entity)

    close()
  }
</script>

<style scoped></style>
