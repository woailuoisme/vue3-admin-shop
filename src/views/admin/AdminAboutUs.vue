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
            <v-toolbar-title>协议管理</v-toolbar-title>
            <v-spacer />
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
            :items="abouts"
            :rows-items="[10, 20, 50]"
          >
            <template #item-operation="item">
              <v-btn color="info" tile small @click.stop="editItem(item)">修改</v-btn>
            </template>
          </EasyDataTable>
        </v-card>
        <v-dialog v-model="dialogEntity" max-width="1300px">
          <dialog-entity :item="editedItem"></dialog-entity>
        </v-dialog>
        <v-dialog v-model="dialogDetail" max-width="800">
          <dialog-detail :item="mapAbout"></dialog-detail>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogDetail from '@/views/components/adminAbout/DialogDetails'
import DialogEntity from '@/views/components/adminAbout/DialogEntity'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useBreadcrumb, useAbout, useGlobal, useTableHeader } from '@/stores'
import { trim } from 'lodash/string'

const aboutStore = useAbout()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const headers = computed(() => tableHeaderStore.about)
const breadcrumbs = computed(() => breadcrumbStore.aboutUs)
const abouts = computed(() => aboutStore.getAbouts)
const serverItemsLength = computed(() => aboutStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => aboutStore.isNew)
const editedItem = computed(() => aboutStore.getEditedItem)
const editedIndex = computed(() => aboutStore.getEditedIndex)

const dialogEntity = ref(false)
const dialogDetail = ref(false)

let mapAbout = ref({})

const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
})

onMounted(() => {
  aboutStore.loadAllAbouts(requestParams._rawValue)
})

watch(
  requestParams,
  (value) => {
    aboutStore.loadAllAbouts(requestParams._rawValue)
  },
  { deep: true }
)

watch(dialogEntity, (val) => {
  console.log(val)
  val || close()
})

function detail(item) {
  mapAbout.value = aboutStore.findById(item.id)
  dialogDetail.value = true
}

function typeLabel(value) {
  if (trim(value) === 'about_us') {
    return '关于我们'
  } else if (trim(value) === 'user_agreement') {
    return '用户协议'
  } else if (trim(value) === 'privacy_agreement') {
    return '隐私协议'
  }
}

function close() {
  dialogEntity.value = false
  nextTick(() => {
    aboutStore.resetEdited()
  })
}

function editItem(item) {
  aboutStore.findAndSetItem(item)
  dialogEntity.value = true
}

function save() {
  aboutStore.updateAbout(data)
  this.close()
}
</script>

<style scoped></style>
