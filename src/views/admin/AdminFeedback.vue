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
            <v-toolbar-title>用户反馈</v-toolbar-title>
            <v-spacer/>
            <v-text-field
              v-model="requestParams.keyword"
              append-icon="mdi-magnify"
              placeholder="ID/姓名"
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
            :items="feedback"
            :rows-items="[10, 20, 50]"
          >
            <template #item-content="{ content }">
              <text-tooltip :text="content"></text-tooltip>
            </template>

            <template #item-operation="item">
              <v-btn color="info" tile small @click.stop="detail(item)">查看</v-btn>
            </template>
          </EasyDataTable>
        </v-card>
        <v-dialog v-model="dialogDetail" max-width="800">
          <dialog-details :feedback="mapFeedback" @close="dialogDetail=false"></dialog-details>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import TextTooltip from '@/components/table/TextTooltip'
import DialogDetails from '@/views/components/adminFeedback/DialogDetails'
import {computed, onMounted, ref, toRaw} from 'vue'
import {useBreadcrumb, useFeedback, useGlobal, useTableHeader} from '@/stores'

const feedbackStore = useFeedback()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const headers = computed(() => tableHeaderStore.feedback)
const breadcrumbs = computed(() => breadcrumbStore.feedback)
const feedback = computed(() => feedbackStore.getFeedback)
const loading = computed(() => globalStore.isLoading)
const serverItemsLength = computed(() => feedbackStore.total)
const isNew = computed(() => feedbackStore.isNew)
const editedItem = computed(() => feedbackStore.getEditedItem)
const editedIndex = computed(() => feedbackStore.getEditedIndex)
let mapFeedback

const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  keyword: ''
})

const dialogDetail = ref(false)

onMounted(() => {
  feedbackStore.loadAllFeedback(toRaw(requestParams.value))
})


function detail(item) {
  mapFeedback = feedbackStore.getMapFeedback(item.id)
  dialogDetail.value = true
}


</script>

<style scoped>

</style>
