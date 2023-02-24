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
            <v-toolbar-title>前台用户管理</v-toolbar-title>
            <v-spacer />
            <v-btn :loading="loading" :disabled="loading" color="info" @click="downloadFile">
              Download Excel
              <template #loader>
                <span>Loading...</span>
              </template>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card :loading="loading" :disabled="loading">
          <EasyDataTable
            v-model:server-options="requestParams"
            buttons-pagination
            alternating
            header-text-direction="center"
            body-text-direction="center"
            table-class-name="customize-table"
            :server-items-length="serverItemsLength"
            :loading="loading"
            :headers="headers"
            :items="users"
            :rows-items="[10, 20, 50]"
          >
            <template #item-name="{ name }">
              <v-chip color="primary" small tile>{{ name }}</v-chip>
            </template>

            <template #item-avatar="{ avatar }">
              <table-image :image="avatar" />
            </template>

            <template #item-is_active_lottery="item">
              <div class="d-flex justify-center">
                <v-switch
                  v-model="item.is_active_lottery"
                  inset
                  color="primary"
                  :true-value="1"
                  :false-value="0"
                  :label="`${item.is_active_lottery ? '是' : '否'}`"
                  @change="toggleActiveLottery(item)"
                />
              </div>
            </template>
          </EasyDataTable>
        </v-card>
        <v-dialog v-model="dialogDetail" max-width="800" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TableImage from '@/components/table/TableImage'
import Breadcrumb from '@/components/shared/Breadcrumb'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useBreadcrumb, useGlobal, useUser, useProductCategory, useTableHeader } from '@/stores'

const userStore = useUser()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()

const headers = computed(() => tableHeaderStore.users)
const breadcrumbs = computed(() => breadcrumbStore.user)
const users = computed(() => userStore.getUsers)
const serverItemsLength = computed(() => userStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => userStore.isNew)
const editedItem = computed(() => userStore.getEditedItem)
const editedIndex = computed(() => userStore.getEditedIndex)
// const findProduct = computed(() => productStore.findById)

const dialogDetail = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 20,
})
let mapProduct

watch(
  requestParams,
  (value) => {
    userStore.loadAllUsers(requestParams.value._rawValue)
  },
  { deep: true }
)

onMounted(() => {
  userStore.loadAllUsers(requestParams)
})

function downloadFile() {
  userStore.downloadExcel()
}

function detail(item) {
  dialogDetail.value = true
}

function toggleActiveLottery(item) {
  userStore.toggleLottery(item)
}
</script>

<style scoped></style>
