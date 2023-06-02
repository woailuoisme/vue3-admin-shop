<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-btn variant="flat" color="primary" @click.stop="addItem">新增</v-btn>
          <v-spacer/>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-card>
        <easy-data-table
          v-bind="dataTableAttr"
          :theme-color="tableColor"
          :table-class-name="tableClass"
          :hide-footer="isHideFooter"
          v-model:server-options="requestParams"
          :server-items-length="total"
          :loading="loading"
          :headers="headers"
          :items="managers"
        >
          <template #item-name="{ name }">
            <v-chip color="primary" small tile>{{ name }}</v-chip>
          </template>

          <template #item-avatar="{ avatar }">
            <table-image :image="avatar"/>
          </template>

          <template #item-role="{ role }">
            <v-chip color="primary" small tile>{{ roleLabel(role) }}</v-chip>
          </template>

          <template #item-operation="item">
            <v-icon icon="mdi-square-edit-outline" color="primary" size="large" class="mx-1"
                    @click.stop="editItem(item)"></v-icon>
            <v-icon icon="mdi-trash-can-outline" color="error" size="large" @click.stop="deleteItem(item)"></v-icon>
          </template>
        </easy-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialogDelete" max-width="300px">
    <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm"/>
  </v-dialog>
  <v-dialog v-model="dialogEntity" max-width="500px">
    <entity-form :item="editedItem" :is-new="isNew" @close="dialogEntity = false" @save="save"/>
  </v-dialog>
</template>

<script setup>
import TableImage from "@/components/table/TableImage"
import DialogConfirm from "@/views/components/common/DialogConfirm"
import EntityForm from "@/views/components/user/UserEntityForm"
import {useAdminUser, useBreadcrumb, useGlobal, useTableHeader} from "@/stores"
import {roleLabel} from "@/filters"
import {dataTableAttr} from "@/utils";

const adminUserStore = useAdminUser()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const vuetifyTheme = useTheme()

const headers = computed(() => tableHeaderStore.adminUsers)
const breadcrumbs = computed(() => breadcrumbStore.adminUser)
const loading = computed(() => globalStore.isLoading)

const {managers, total, isNew, editedItem, editedIndex, isHideFooter} = storeToRefs(adminUserStore)
const tableClass = computed(() => (vuetifyTheme.current.value.dark ? "customize-table-dark" : "customize-table"))
const tableColor = computed(() => vuetifyTheme.current.value.colors.primary)
const content = ref("")

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
  (value) => {
    adminUserStore.loadAllUsers(requestParams)
  },
  {deep: true},
)
watch(dialogEntity, (val) => {
  console.log(val)
  val || close()
})

watch(dialogDelete, (val) => {
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
