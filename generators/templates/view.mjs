import {useNameCase} from "../util.mjs"

export const viewContent = (model) => {
    const result = useNameCase(model);
    const camelName = result.camelName
    const pascalName = result.pascalName
    const pluralCamelName = result.pluralCamelName
    const pluralPascalName = result.pluralPascalName

    return `
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
        <v-toolbar :elevation="2" flat>
          <v-btn variant="flat" color="primary" @click.stop="addItem">
            {{ $t('table.operation.add') }}
          </v-btn>
          <v-spacer />
          <v-text-field
            v-model="requestParams.keyword"
            variant="outlined"
            prepend-inner-icon="mdi-magnify"
            :placeholder="$t('table.search.keyword')"
            single-line
            hide-details
          />
        </v-toolbar>
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
            :items="${pluralCamelName}"
            :table-class-name="tableClass"
            :hide-footer="isHideFooter"
          >
            <template #item-operation="item">
              <v-icon icon="mdi-eye-outline" color="info" size="large"  @click.stop="viewItem(item)"></v-icon>
              <v-icon  class="ml-1" icon="mdi-square-edit-outline" color="primary" size="large"  @click.stop="editItem(item)"></v-icon>
              <v-icon  class="ml-1" icon="mdi-trash-can-outline" color="error" size="large" @click.stop="deleteItem(item)"></v-icon>
            </template>
          </easy-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogEntity" max-width="500px" persistent>
      <entity :item="editedItem" :is-new="isNew" @close="close" @save="save" />
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm" />
    </v-dialog>
  </v-container>
</template>

<script setup>
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogConfirm from './components/common/DialogConfirm'
import Entity from './components/${camelName}/Entity'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBreadcrumb, useGlobal, use${pascalName}, useTableHeader } from '@/stores'
const { debounce } = require('lodash-es')
import { useTheme } from 'vuetify'

const ${camelName}Store = use${pascalName}()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const vuetifyTheme = useTheme()
const headers = computed(() => tableHeaderStore.${camelName})
const breadcrumbs = computed(() => breadcrumbStore.${camelName})
const { ${pluralCamelName}, total, isNew, editedItem, editedIndex,isHideFooter } = storeToRefs(${camelName}Store)
const { isLoading } = storeToRefs(globalStore)
const tableClass = computed(()=> vuetifyTheme.global.name.value==='dark'?'customize-table-dark':'customize-table')
const dialogEntity = ref(false)
const dialogDelete = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: '',
  sortType: '',
})
const search = debounce((value) =>  ${camelName}Store.loadAll${pluralPascalName}(value), 800)

onMounted(() => {
  ${camelName}Store.loadAll${pluralPascalName}(unref(requestParams))
})
watch(
  requestParams,
  (value) => {
    search(unref(requestParams))
  },
  { deep: true }
)

watch(
  [dialogEntity, dialogDelete, requestParams],
  ([newEntry, newDelete, newRequestParams]) => {
    newEntry || close()
    newDelete || closeDelete()
  },
  { deep: true }
)

function addItem() {
  dialogEntity.value = true
}

function editItem(item) {
  ${camelName}Store.findAndSetItem(item)
  dialogEntity.value = true
}

function deleteItem(item) {
  ${camelName}Store.findAndSetItem(item)
  dialogDelete.value = true
}

function close() {
  dialogEntity.value = false
  nextTick(() => {
    ${camelName}Store.resetEdited()
  })
}

function deleteItemConfirm(item) {
  ${camelName}Store.delete${pascalName}(editedItem.value.id)
  dialogDelete.value = false
  nextTick(() => {
    ${camelName}Store.resetEdited()
  })
}

function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    ${camelName}Store.resetEdited()
  })
}

function save(values) {
  if (editedIndex.value > -1) {
    const entity = { id: editedItem.value?.id, ...values }
    ${camelName}Store.update${pascalName}(entity)
  } else {
    ${camelName}Store.create${pascalName}(values)
  }
  close()
}
</script>

<style scoped></style>

  `
}
