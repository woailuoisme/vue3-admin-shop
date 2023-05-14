<template>
  <product-filter @change="filterChange"></product-filter>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-btn color="primary" variant="flat" @click.stop="addItem">
            {{ $t("table.operation.add") }}
          </v-btn>
          <v-divider class="mx-2" color="primary" thickness="2" vertical></v-divider>
          <v-fade-transition>
            <batch v-if="isNotEmpty"></batch>
          </v-fade-transition>
          <v-spacer />
          <v-text-field
            v-model="requestParams.keyword"
            :placeholder="$t('table.search.keyword')"
            density="comfortable"
            hide-details
            prepend-inner-icon="mdi-magnify"
            single-line
            variant="outlined"
          />
          <v-divider class="mx-2" color="primary" thickness="2" vertical></v-divider>
          <div class="mx-4">
            <v-btn
              :class="{ 'animate-spin': isLoading }"
              color="success"
              icon="mdi-refresh"
              size="medium"
              variant="flat"
              @click="reload"
            ></v-btn>
          </div>
        </v-card-title>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
      <v-card>
        <easy-data-table
          v-model:items-selected="itemsSelected"
          v-model:server-options="requestParams"
          v-bind="dataTableAttr"
          :headers="headers"
          :items="products"
          :loading="isLoading"
          :server-items-length="total"
          :table-class-name="tableClass"
          :theme-color="tableColor"
          :hide-footer="isHideFooter"
          :rows-items="[10, 20, 40]"
        >
          <template #[`item-category.second_name`]="item">
            <v-chip color="primary" variant="outlined">{{ item.category.second_name }}</v-chip>
          </template>
          <template #item-thumbnail="item">
            <table-image :image="item.thumbnail" :max-height="50" :max-width="50" />
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
                :false-value="0"
                :label="`${item.is_sale ? '是' : '否'}`"
                :true-value="1"
                color="primary"
                inset
                @change="toggleSale(item)"
              />
            </div>
          </template>

          <template #item-operation="item">
            <v-icon class="ml-1" color="info" icon="mdi-eye-outline" size="large" @click.stop="viewItem(item)"></v-icon>
            <v-icon class="ml-1" color="primary" icon="mdi-square-edit-outline" size="large" @click.stop="editItem(item)"></v-icon>
            <v-icon class="ml-1" color="error" icon="mdi-trash-can-outline" size="large" @click.stop="deleteItem(item)"></v-icon>
          </template>
        </easy-data-table>
      </v-card>
    </v-col>
  </v-row>
  <v-dialog v-model="dialogDelete" max-width="300px">
    <dialog-confirm @close="closeDelete" @confirm="deleteItemConfirm" />
  </v-dialog>
  <v-dialog v-model="dialogEntity" max-width="1300px">
    <entity :is-new="isNew" :item="editedItem" @close="dialogEntity = false" @save="save" />
  </v-dialog>
  <v-dialog v-model="dialogDetail" max-width="1300px">
    <details :product="mapProduct" @close="dialogDetail = false" />
  </v-dialog>
</template>

<script setup>
import TableImage from "@/components/table/TableImage"
import TextTooltip from "@/components/table/TextTooltip"
import DialogConfirm from "./components/common/DialogConfirm"
import Entity from "./components/product/ProductEntity"
import Details from "./components/product/ProductDetails"
import { computed, nextTick, onMounted, ref, unref, watch } from "vue"
import { useBreadcrumb, useGlobal, useProduct, useProductCategory, useTableHeader } from "@/stores"
import { storeToRefs } from "pinia"
import { debounce } from "lodash-es"
import ProductFilter from "@/views/components/product/ProductFilter"
import Batch from "@/views/components/product/ProductBatch"
import { dataTableAttr } from "@/utils"
import { useTheme } from "vuetify"

const productStore = useProduct()
const globalStore = useGlobal()
const breadcrumbStore = useBreadcrumb()
const tableHeaderStore = useTableHeader()
const categoryStore = useProductCategory()
const vuetifyTheme = useTheme()

const { categories } = storeToRefs(categoryStore)
const { products: headers } = storeToRefs(tableHeaderStore)
const { product: breadcrumbs } = storeToRefs(breadcrumbStore)
const { isLoading } = storeToRefs(globalStore)
const { products, total, isNew, editedIndex, editedItem, isHideFooter } = storeToRefs(productStore)
const tableClass = computed(() => (vuetifyTheme.current.value.dark ? "customize-table-dark" : "customize-table"))
const tableColor = computed(() => vuetifyTheme.current.value.colors.primary)

const dialogEntity = ref(false)
const dialogDelete = ref(false)
const dialogDetail = ref(false)
const requestParams = ref({
  page: 1,
  rowsPerPage: 10,
  sortBy: "created_at",
  sortType: "desc",
  keyword: "",
})
const mapProduct = ref([])
const itemsSelected = ref([])
const idsSelected = computed(() => itemsSelected.value.map((item) => item.id))
const isNotEmpty = computed(() => idsSelected.value.length > 0)

const search = debounce((value) => productStore.loadAllProducts(value), 800)

onMounted(() => {
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
