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
            <v-toolbar-title>退款管理</v-toolbar-title>
            <v-spacer/>
            <v-text-field
              v-model="requestParams.keyword"
              append-icon="mdi-magnify"
              placeholder="订单编号/姓名"
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
            :items="refunds"
            :rows-items="[10, 20, 50]"
          >
            <template #item-order_num="item">
              <v-chip color="primary" small tile @click.stop="detail(item)">{{ item.order_num }}</v-chip>
            </template>

            <template #item-status="{status}">
              <v-chip :color="statusClass(status)" small>
                {{ statusLabel(status) }}
              </v-chip>
            </template>

            <template #item-remark="{remark}">
              <text-tooltip :text="remark"/>
            </template>

            <template #item-amount="item">
              <span v-if="item?.product">
                {{ item.product.sale_price }}*{{ item.product.quantity }}={{
                  item.product.sale_price * item.product.quantity
                }}
              </span>
              <span v-else>0</span>
            </template>

            <template #item-operation="item">
              <v-btn v-if="isShow(item)" color="info" tile small @click.stop="confirmedItem(item)">
                处理
              </v-btn>
            </template>

          </EasyDataTable>
        </v-card>

        <v-dialog v-model="dialogEntity" persistent max-width="600px">

        </v-dialog>
      </v-col>
    </v-row>

  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import TextTooltip from '@/components/table/TextTooltip'
import DialogDetails from '@/views/components/adminWithDraw/DialogDetails'
import {computed, nextTick, onMounted, ref, watch} from 'vue'
import {useBreadcrumb, useGlobal, useRefund, useTableHeader} from '@/stores'
import {useDisplay} from 'vuetify'

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

let mapRefund

const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  keyword: ''
})

onMounted(() => {
  console.log('onMounted')
  refundStore.loadAllRefunds(requestParams._rawValue)
})

watch(
  requestParams,
  (value) => {
    refundStore.loadAllRefunds(requestParams._rawValue)
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
  if (value === 'pending') {
    return '已申请'
  } else if (value === 'passed') {
    return '已通过'
  } else if (value === 'reject') {
    return '已拒绝'
  } else if (value === 'rejected') {
    return '已拒绝'
  }
}

function statusClass(value) {
  if (value === 'pending') {
    return 'primary'
  } else if (value === 'passed') {
    return 'success'
  } else if (value === 'reject') {
    return 'error'
  } else if (value === 'rejected') {
    return 'error'
  }
}
</script>

<style scoped>
@import '../../styles/data-table.css';
</style>
