<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <v-card>
          <Breadcrumb :items="breadcrumbs"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title flat>
            <v-btn variant="flat" color="primary" @click.stop="addItem">新增</v-btn>
            <v-spacer/>
          </v-card-title>
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
            :items="products"
            :rows-items="[10, 20, 50]"
          >
            <template #item-catetory="item">
              <v-chip color="info" small>{{ item.category.second_name }}</v-chip>
            </template>
            <template #item-thumbnail="item">
              <table-image :image="item.thumbnail"></table-image>
            </template>
            <template #item-description="item">
              <text-tooltip :text="item.description"></text-tooltip>
            </template>
            <template #item-created_at="item">
              {{ item.created_at }}
            </template>
            <template #item-is_sale="item">
              <div class="d-flex justify-center">
                <v-switch color="primary" :true-value="1" :false-value="0" v-model="item.is_sale"
                          :label="`${item.is_sale ? '是' : '否'}`" @change="toggleSale(item)" inset/>
              </div>
            </template>

            <template #item-operation="item">
              <v-btn class="ml-1" icon="mdi-eye" color="primary" size="small" tile
                     @click.stop="viewItem(item)"></v-btn>
              <v-btn class="ml-1" icon="mdi-pencil" color="warning" size="small" tile
                     @click.stop="editItem(item)"></v-btn>
              <v-btn class="ml-1" icon="mdi-delete" color="error" size="small" tile
                     @click.stop="deleteItem(item)"></v-btn>
            </template>
          </EasyDataTable>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogDelete" max-width="300px">
      <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm"></dialog-confirm>
    </v-dialog>
    <v-dialog v-model="dialogEntity" max-width="1300px">
      <dialog-entity-form @close="dialogEntity = false" @save="save" :item="editedItem"

                          :is-new="isNew"></dialog-entity-form>
    </v-dialog>
    <v-dialog v-model="dialogDetail" max-width="1300px">
      <dialog-details :product="mapProduct" @close=" dialogDetail = false"></dialog-details>
    </v-dialog>
  </v-container>
</template>
<script setup>
import TableImage from '@/components/table/TableImage'
import TextTooltip from '@/components/table/TextTooltip'
import Breadcrumb from '@/components/shared/Breadcrumb'
import DialogConfirm from '@/views/components/adminProduct/DialogConfirm'
import DialogEntityForm from '@/views/components/adminProduct/DialogEntityForm'
import DialogDetails from '@/views/components/adminProduct/DialogDetails'
import {computed, nextTick, onMounted, ref, watch} from 'vue'
import {useBreadcrumb, useGlobal, useProduct, useProductCategory, useTableHeader} from '@/stores'

const productStore = useProduct()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const categoryStore = useProductCategory()

const categories = computed(() => categoryStore.getCategories)

const headers = computed(() => tableHeaderStore.productHeader)
const breadcrumbs = computed(() => breadcrumbStore.getProduct)
const products = computed(() => productStore.getProducts)
const serverItemsLength = computed(() => productStore.total)
const loading = computed(() => globalStore.isLoading)
const isNew = computed(() => productStore.isNew)
const editedItem = computed(() => productStore.getEditedItem)
const editedIndex = computed(() => productStore.getEditedIndex)
// const findProduct = computed(() => productStore.findById)

const dialogEntity = ref(false)
const dialogDelete = ref(false)
const dialogDetail = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
})
let mapProduct;

onMounted(() => {
  categoryStore.loadCategories()
  productStore.loadAllProducts(requestParams._rawValue)
})

watch(
  requestParams,
  (value) => {
    productStore.loadAllProducts(requestParams._rawValue)
  },
  {deep: true}
)

watch(dialogEntity, (val) => {
  console.log(val)
  val || close()
})

watch(dialogDelete, (val) => {
  console.log(val)
  val || closeDelete()
})

watch(dialogDetail, (val) => {
  console.log(val)
  val || closeDetail()
})

function toggleSale(item) {
  productStore.toggleSale(item)
}

function addItem() {
  dialogEntity.value = true
}

function viewItem(item) {
  mapProduct = productStore.getMapProduct(item.id)
  dialogDetail.value = true
}

function editItem(item) {
  productStore.findAndSetItem(item)
  dialogEntity.value = true
}

function deleteItem(item) {
  productStore.findAndSetItem(item)
  dialogDelete.value = true
}

function deleteItemConfirm() {
  debugger
  productStore.deleteProduct(editedItem.value.id)
  dialogDelete.value = false
  nextTick(() => {
    productStore.resetEdited()
  })
}

function close() {
  dialogEntity.value = false
  nextTick(() => {
    productStore.resetEdited()
  })
}

function closeDetail() {
  dialogDetail.value = false
  nextTick(() => {
    productStore.resetEdited()
  })
}

function closeDelete() {
  dialogDelete.value = false
  nextTick(() => {
    productStore.resetEdited()
  })
}

function save() {
  if (editedIndex > -1) {
    productStore.updateProduct(editedItem)
  } else {
    productStore.createProduct(editedItem)
  }
  this.close()
}
</script>

<style scoped>
@import '../../styles/data-table.css';
</style>
