<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>订单管理</v-toolbar-title>
          <v-spacer />
          <v-text-field
            v-model="requestParams.keyword"
            clearable
            prepend-inner-icon="mdi-magnify"
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
        <easy-data-table
          v-model:server-options="requestParams"
          :server-items-length="total"
          :loading="isLoading"
          :headers="headers"
          :items="orders"
        >
          <template #header-order_status="header">
            <div class="filter-column" @click="showStatus = !showStatus">
              <v-icon
                class="filter-icon"
                color="primary"
                :icon="showStatus ? 'mdi-filter' : 'mdi-filter-outline'"
                @click="showStatus = !showStatus"
              />
              <span>{{ header.text }}</span>
              <div v-if="showStatus" class="filter-menu filter-status-menu">
                <v-select
                  v-model="orderNoStatus"
                  :items="orderStatus"
                  item-title="label"
                  item-value="value"
                  variant="outlined"
                  density="compact"
                />
              </div>
            </div>
          </template>
          <template #item-order_num="item">
            <!--            <v-chip color="primary" variant="elevated">{{ item.order_num }}</v-chip> -->
            <copy-label :text="item.order_num"></copy-label>
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
        </easy-data-table>
      </v-card>
      <v-dialog v-model="dialogEntity" persistent max-width="600px" />
      <v-dialog v-model="dialogDetail" max-width="800">
        <details :category="mapCategory" @close="dialogDetail = false" />
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup>
import Details from "./components/order/OrderDetails"
import { computed, nextTick, onMounted, ref, unref, watch } from "vue"
import { useBreadcrumb, useGlobal, useOrder, useTableHeader } from "@/stores"
import { orderStatus } from "@/filters"
import { storeToRefs } from "pinia/dist/pinia"
import Toast from "@/utils/toast"
import { debounce } from "lodash-es"
import CopyLabel from "@/components/common/CopyLabel"
import { useClipboard } from "@vueuse/core"
const { toClipboard } = useClipboard()
import { orderStatusLabel, orderShowExpress } from "@/filters"

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
  sortBy: "created_at",
  sortType: "desc",
  keyword: "",
})

const showStatus = ref(false)
const orderNoStatus = ref("")

const mapCategory = ref({})
const search = debounce((value) => orderStore.loadAllOrders(value), 600)
onMounted(() => {
  orderStore.loadAllOrders(unref(requestParams))
})

watch(
  requestParams,
  (value) => {
    search(unref(requestParams))
  },
  { deep: true },
)

watch(dialogEntity, (val) => {
  val || close()
})

async function copy(value) {
  try {
    toClipboard(value)
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

<style scoped>
.filter-column {
  display: flex;
  align-items: center;
  justify-items: center;
  position: relative;
  cursor: pointer;
}

.filter-icon {
  cursor: pointer;
  width: 15px !important;
  height: 15px !important;
  margin-right: 4px;
}

.filter-menu {
  padding: 4px 4px;
  z-index: 1;
  position: absolute;
  top: 35px;
  width: 130px;
  height: 50px;
  background-color: #eee;
  border: 1px solid #eee;
}

.filter-status-menu {
  height: 40px !important;
}

.filter-age-menu {
  height: 40px;
}
.slider {
  margin-top: 36px;
}
</style>
