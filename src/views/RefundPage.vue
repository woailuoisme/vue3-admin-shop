<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>退款管理</v-toolbar-title>
          <v-spacer />
          <v-text-field
            v-model="requestParams.keyword"
            append-icon="mdi-magnify"
            placeholder="订单编号/姓名"
            single-line
            hide-details
            solo
          />
          <v-btn
            class="ma-4"
            variant="flat"
            icon="mdi-refresh"
            :class="{ 'animate-spin': loading }"
            color="info"
            size="medium"
            @click="reload"
          ></v-btn>
        </v-toolbar>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-card :loading="loading" :disabled="loading">
        <easy-data-table
          v-model:server-options="requestParams"
          :server-items-length="serverItemsLength"
          :loading="loading"
          :headers="headers"
          :items="refunds"
        >
          <template #item-order_num="item">
            <v-chip color="primary" small tile @click.stop="detail(item)">{{ item.order_num }}</v-chip>
          </template>

          <template #item-status="{ status }">
            <v-chip :color="statusClass(status)" small>
              {{ statusLabel(status) }}
            </v-chip>
          </template>

          <template #item-remark="{ remark }">
            <text-tooltip :text="remark" />
          </template>

          <template #item-amount="item">
            <span v-if="item?.product">
              {{ item.product.sale_price }}*{{ item.product.quantity }}={{ item.product.sale_price * item.product.quantity }}
            </span>
            <span v-else>0</span>
          </template>

          <template #item-operation="item">
            <v-btn v-if="isShow(item)" color="info" tile small @click.stop="confirmedItem(item)">处理</v-btn>
          </template>
        </easy-data-table>
      </v-card>

      <v-dialog v-model="dialogEntity" persistent max-width="600px" />
    </v-col>
  </v-row>
</template>

<script setup>
import TextTooltip from "@/components/table/TextTooltip"
import { computed, nextTick, onMounted, ref, unref, watch } from "vue"
import { useBreadcrumb, useGlobal, useRefund, useTableHeader } from "@/stores"
import { debounce } from "lodash-es"

const refundStore = useRefund()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()

const headers = computed(() => tableHeaderStore.refund)
const breadcrumbs = computed(() => breadcrumbStore.refund)
const refunds = computed(() => refundStore.getRefunds)
const serverItemsLength = computed(() => refundStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => refundStore.isNew)
const editedItem = computed(() => refundStore.getEditedItem)
const editedIndex = computed(() => refundStore.getEditedIndex)
const dialogEntity = ref(false)
const dialogDetail = ref(false)
let mapRefund = []

const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "",
  sortType: "",
})
const search = debounce((value) => refundStore.loadAllRefunds(value), 800)

onMounted(() => {
  console.log("onMounted")
  refundStore.loadAllRefunds(unref(requestParams))
})

watch(
  requestParams,
  (value) => {
    search(unref(requestParams))
  },
  { deep: true },
)

watch(dialogEntity, (val) => {
  console.log(val)
  val || close()
})

function reload() {
  search(unref(requestParams))
}

function isShow(item) {
  if (item.status === "pending") {
    return true
  } else if (item.status === "finished") {
    return false
  } else if (item.status === "rejected") {
    return true
  }
  return false
}

function detail(item) {
  mapRefund = refundStore.findByRefundNum(item.id)
  dialogDetail.value = true
}

function close() {
  dialogEntity.value = false
  nextTick(() => {
    refundStore.resetEdited()
  })
}

function confirmedItem(item) {
  refundStore.findAndSetItem(item)
  dialogEntity.value = true
}

function save() {
  this.confirmedWithdraw(this.editedItem)
  this.close()
}

function statusLabel(value) {
  if (value === "pending") {
    return "已申请"
  } else if (value === "passed") {
    return "已通过"
  } else if (value === "reject") {
    return "已拒绝"
  } else if (value === "rejected") {
    return "已拒绝"
  }
}

function statusClass(value) {
  if (value === "pending") {
    return "primary"
  } else if (value === "passed") {
    return "success"
  } else if (value === "reject") {
    return "error"
  } else if (value === "rejected") {
    return "error"
  }
}
</script>

<style scoped></style>
