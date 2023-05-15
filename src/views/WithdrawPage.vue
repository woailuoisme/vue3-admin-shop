<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>提现管理</v-toolbar-title>
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
          v-bind="dataTableAttr"
          v-model:server-options="requestParams"
          :server-items-length="serverItemsLength"
          :loading="loading"
          :headers="headers"
          :items="withdraws"
        >
          <template #item-operation="item">
            <v-btn v-if="isShow(item)" color="info" tile small @click.stop="confirmedItem(item)">处理</v-btn>
          </template>
          <template #item-status="{ status }">
            <v-chip :color="statusClass(status)" small>
              {{ statusLabel(status) }}
            </v-chip>
          </template>
        </easy-data-table>
      </v-card>
      <v-dialog v-model="dialogEntity" persistent max-width="600px" />
      <v-dialog v-model="dialogDetail" max-width="800">
        <details :withdraw="mapCategory" />
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup>
import Details from "./components/withdraw/WithdrawDetails"
import { computed, nextTick, onMounted, ref, unref, watch } from "vue"
import { useBreadcrumb, useGlobal, useWithdraw, useTableHeader } from "@/stores"
import { debounce } from "lodash-es"
import { dataTableAttr } from "@/utils"

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
  sortBy: "",
  sortType: "",
})

const search = debounce((value) => withdrawStore.loadAllWithdraws(value), 800)
let mapCategory

onMounted(() => {
  console.log("onMounted")
  withdrawStore.loadAllWithdraws(unref(requestParams))
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
  if (value === "pending") {
    return "已申请"
  } else if (value === "passed") {
    return "已通过"
  } else if (value === "rejected") {
    return "已拒绝"
  }
}

function statusClass(value) {
  if (value === "pending") {
    return "primary"
  } else if (value === "passed") {
    return "success"
  } else if (value === "rejected") {
    return "error"
  }
}
</script>

<style scoped></style>
