<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-toolbar flat>
          <v-toolbar-title>用户反馈</v-toolbar-title>
          <v-spacer />
          <v-text-field v-model="requestParams.keyword" append-icon="mdi-magnify" placeholder="ID/姓名" single-line hide-details solo />
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
          :items="feedback"
        >
          <template #item-content="{ content }">
            <text-tooltip :text="content" />
          </template>

          <template #item-operation="item">
            <v-btn color="info" tile small @click.stop="detail(item)">查看</v-btn>
          </template>
        </easy-data-table>
      </v-card>
      <v-dialog v-model="dialogDetail" max-width="800">
        <details :feedback="mapFeedback" @close="dialogDetail = false" />
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script setup>
import Breadcrumb from "@/components/shared/Breadcrumb"
import TextTooltip from "@/components/table/TextTooltip"
import Details from "./components/feedback/FeedbackDetails"
import { computed, onMounted, ref, toRaw } from "vue"
import { useBreadcrumb, useFeedback, useGlobal, useTableHeader } from "@/stores"

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
  keyword: "",
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

<style scoped></style>
