<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <breadcrumb :items="breadcrumbs" />
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title flat>
            <v-btn variant="flat" color="primary" @click.stop="addItem">新增</v-btn>
            <v-spacer />
          </v-card-title>
          <easy-data-table
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
          >
            <template #item-name="{ name }">
              <v-chip color="primary" small tile>{{ name }}</v-chip>
            </template>

            <template #item-avatar="{ avatar }">
              <table-image :image="avatar" />
            </template>

            <template #item-role="{ role }">
              <v-chip color="primary" small tile>{{ roleLabel(role) }}</v-chip>
            </template>

            <template #item-operation="item">
              <v-btn class="ml-1" icon="mdi-pencil" color="warning" size="small" tile @click.stop="editItem(item)" />
              <v-btn class="ml-1" icon="mdi-delete" color="error" size="small" tile @click.stop="deleteItem(item)" />
            </template>
          </easy-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="300px">
      <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm" />
    </v-dialog>
    <v-dialog v-model="dialogEntity" max-width="500px">
      <entity-form :item="editedItem" :is-new="isNew" @close="dialogEntity = false" @save="save" />
    </v-dialog>
  </v-container>
</template>

<script setup>
import TableImage from '@/components/table/TableImage'
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogConfirm from './components/common/DialogConfirm'
import EntityForm from './components/user/EntityForm'
import { roleLabel } from '@/utils/table'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useAdminUser, useBreadcrumb, useGlobal, useTableHeader } from '@/stores'

const adminUserStore = useAdminUser()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()

const headers = computed(() => tableHeaderStore.adminUsers)
const breadcrumbs = computed(() => breadcrumbStore.adminUser)
const users = computed(() => adminUserStore.getUsers)
const serverItemsLength = computed(() => adminUserStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => adminUserStore.isNew)
const editedItem = computed(() => adminUserStore.getEditedItem)
const editedIndex = computed(() => adminUserStore.getEditedIndex)
const content = ref('')

const dialogEntity = ref(false)
const dialogDelete = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 20,
})

onMounted(() => {
  adminUserStore.loadAllUsers(requestParams)
})

watch(
  requestParams,
  value => {
    adminUserStore.loadAllUsers(requestParams)
  },
  { deep: true }
)
watch(dialogEntity, val => {
  console.log(val)
  val || close()
})

watch(dialogDelete, val => {
  console.log(val)
  val || closeDelete()
})

function addItem() {
  dialogEntity.value = true
}

function editItem(item) {
  adminUserStore.findAndSetItem(item)
  dialogEntity.value = true
}

function deleteItem(item) {
  adminUserStore.findAndSetItem(item)
  dialogDelete.value = true
}

function deleteItemConfirm() {
  adminUserStore.deleteUser(editedItem.value.id)
  dialogDelete.value = false
  nextTick(() => {
    adminUserStore.resetEdited()
  })
}

function close() {
  dialogEntity.value = false
  nextTick(() => {
    adminUserStore.resetEdited()
  })
}

function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    adminUserStore.resetEdited()
  })
}

function save() {
  if (editedIndex.value > -1) {
    adminUserStore.updateUser(editedItem)
  } else {
    adminUserStore.createUser(editedItem)
  }
  this.close()
}
</script>

<style scoped></style>
