<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-toolbar-title>前台用户管理</v-toolbar-title>
          <v-spacer/>
          <v-btn prepend-icon="mdi-calendar-import-outline" variant="outlined" :loading="loading" :disabled="loading"
                 @click="downloadFile">导入
            <template #loader>
              <span>处理中...</span>
            </template>
          </v-btn>
          <v-divider class="mx-2" vertical thickness="0"></v-divider>
          <v-btn prepend-icon="mdi-calendar-export-outline" variant="outlined" :loading="loading" :disabled="loading"
                 @click="downloadFile">导出
            <template #loader>
              <span>处理中...</span>
            </template>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <v-card :loading="loading" :disabled="loading">
        <easy-data-table
          v-bind="dataTableAttr"
          :theme-color="tableColor"
          :table-class-name="tableClass"
          :hide-footer="isHideFooter"
          v-model:server-options="requestParams"
          :server-items-length="total"
          :headers="headers"
          :items="users"
          :loading="loading"
        >
          <template #item-name="{ name }">
            <v-chip color="primary" small tile>{{ name }}</v-chip>
          </template>

          <template #item-avatar="{ avatar }">
            <table-image :image="avatar"/>
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
        </easy-data-table>
      </v-card>
      <v-dialog v-model="dialogDetail" max-width="800"/>
    </v-col>
  </v-row>
</template>

<script setup>
import TableImage from "@/components/table/TableImage"
import {useBreadcrumb, useGlobal, useUser, useTableHeader} from "@/stores"
import {dataTableAttr} from "@/utils";

const vuetifyTheme = useTheme()
const globalStore = useGlobal()
const userStore = useUser()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()

const headers = computed(() => tableHeaderStore.users)
const breadcrumbs = computed(() => breadcrumbStore.user)
const loading = computed(() => globalStore.isLoading)
const {users, total, isNew, editedItem, editedIndex, isHideFooter} = storeToRefs(userStore)
const tableClass = computed(() => (vuetifyTheme.current.value.dark ? "customize-table-dark" : "customize-table"))
const tableColor = computed(() => vuetifyTheme.current.value.colors.primary)

const dialogDetail = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 20,
})

watch(
  requestParams,
  (value) => {
    userStore.loadAllUsers(requestParams.value._rawValue)
  },
  {deep: true},
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
