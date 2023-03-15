<template>
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
        <easy-data-table
          v-model:server-options="requestParams"
          :server-items-length="serverItemsLength"
          :loading="loading"
          :headers="headers"
          :items="abouts"
        >
          <template #item-operation="item">
            <v-btn color="info" tile small @click.stop="editItem(item)">修改</v-btn>
          </template>
        </easy-data-table>
      </v-card>
      <v-dialog v-model="dialogEntity" max-width="1300px">
        <entity :item="editedItem" />
      </v-dialog>
      <v-dialog v-model="dialogDetail" max-width="800">
        <details :item="mapAbout" />
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup>
import Breadcrumb from "@/components/shared/Breadcrumb"
import Details from "./components/about/Details"
import Entity from "./components/about/Entity"
import { computed, nextTick, onMounted, ref, watch } from "vue"
import { useBreadcrumb, useAbout, useGlobal, useTableHeader } from "@/stores"
import { trim } from "lodash-es"

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
  aboutStore.loadAllAbouts(requestParams.value._rawValue)
})

watch(
  requestParams,
  (value) => {
    aboutStore.loadAllAbouts(requestParams.value._rawValue)
  },
  { deep: true },
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
  if (trim(value) === "about_us") {
    return "关于我们"
  } else if (trim(value) === "user_agreement") {
    return "用户协议"
  } else if (trim(value) === "privacy_agreement") {
    return "隐私协议"
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

function save(data) {
  aboutStore.updateAbout(data)
  this.close()
}
</script>

<style scoped></style>
