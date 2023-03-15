<template>
  <product-filter @change="filterChange"></product-filter>
  <v-row>
    <v-col cols="12">
      <v-toolbar :elevation="4" density="comfortable" class="align-center">
        <v-btn variant="flat" color="primary" @click.stop="addItem">
          {{ $t("table.operation.add") }}
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
        <v-divider vertical thickness="2" color="primary" class="mx-2"></v-divider>
        <div class="mx-4">
          <v-btn variant="flat" :loading="isLoading" icon="mdi-refresh" color="success" size="medium" @click="reload"></v-btn>
        </div>
      </v-toolbar>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-card>
        <easy-data-table
          v-model:server-options="requestParams"
          v-model:items-selected="itemsSelected"
          :server-items-length="total"
          :loading="isLoading"
          :headers="headers"
          :items="products"
        >
          <template #[`item-category.second_name`]="item">
            <v-chip variant="outlined" color="primary">{{ item.category.second_name }}</v-chip>
          </template>
          <template #item-thumbnail="item">
            <table-image :max-height="50" :max-width="50" :image="item.thumbnail" />
          </template>
          <template #item-description="item">
            <text-tooltip :text="item.description" />
          </template>
          <template #item-created_at="item">
            {{ item.created_at }}
          </template>
          <template #item-is_sale="item">
            <div class="d-flex justify-center">
              <v-switch
                v-model="item.is_sale"
                color="primary"
                :true-value="1"
                :false-value="0"
                :label="`${item.is_sale ? '是' : '否'}`"
                inset
                @change="toggleSale(item)"
              />
            </div>
          </template>

          <template #item-operation="item">
            <v-icon class="ml-1" icon="mdi-eye-outline" color="info" size="large" @click.stop="viewItem(item)"></v-icon>
            <v-icon class="ml-1" icon="mdi-square-edit-outline" color="primary" size="large" @click.stop="editItem(item)"></v-icon>
            <v-icon class="ml-1" icon="mdi-trash-can-outline" color="error" size="large" @click.stop="deleteItem(item)"></v-icon>
          </template>
        </easy-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialogDelete" max-width="300px">
    <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm" />
  </v-dialog>
  <v-dialog v-model="dialogEntity" max-width="1300px">
    <entity :item="editedItem" :is-new="isNew" @close="dialogEntity = false" @save="save" />
  </v-dialog>
  <v-dialog v-model="dialogDetail" max-width="1300px">
    <details :product="mapProduct" @close="dialogDetail = false" />
  </v-dialog>
</template>

<script setup>
import TableImage from "@/components/table/TableImage"
import TextTooltip from "@/components/table/TextTooltip"
import DialogConfirm from "./components/common/DialogConfirm"
import Entity from "./components/product/Entity"
import Details from "./components/product/Details"
import { computed, nextTick, onMounted, ref, unref, watch } from "vue"
import { useBreadcrumb, useGlobal, useProduct, useProductCategory, useTableHeader } from "@/stores"
import { storeToRefs } from "pinia"
import { debounce } from "lodash-es"
import ProductFilter from "@/views/components/product/ProductFilter"

const productStore = useProduct()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const categoryStore = useProductCategory()

const categories = computed(() => categoryStore.categories)

const headers = computed(() => tableHeaderStore.products)
const breadcrumbs = computed(() => breadcrumbStore.product)
const { isLoading } = storeToRefs(globalStore)
const { products, total, isNew, editedIndex, editedItem } = storeToRefs(productStore)
// const findProduct = computed(() => productStore.findById)

const dialogEntity = ref(false)
const dialogDelete = ref(false)
const dialogDetail = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "",
  sortType: "",
})
const mapProduct = ref([])
const itemsSelected = ref([])
const idsSelected = computed(() => itemsSelected.value.map((item) => item.id))
const isNotEmpty = computed(() => idsSelected.value.length > 0)

const search = debounce((value) => productStore.loadAllProducts(value), 800)

onMounted(() => {
  // categoryStore.loadCategories()
  search(unref(requestParams))
})

watch(
  requestParams,
  (value) => {
    search(unref(requestParams))
  },
  { deep: true },
)

function reload() {
  search(unref(requestParams))
}

function filterChange(value) {
  console.log(value)
}

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
  mapProduct.value = productStore.getMapProduct(item.id)
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
  if (editedIndex.value > -1) {
    productStore.updateProduct(editedItem)
  } else {
    productStore.createProduct(editedItem)
  }
  close()
}
</script>

<style scoped></style>
