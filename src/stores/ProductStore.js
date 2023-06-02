import ProductService from "../api/product.service"

const toast = useToast()

import {defineStore} from "pinia"

/** Config Store */
export default defineStore("product", {
  // Default Config State
  state: () => ({
    products: [],
    meta: {},
    loading: false,
    editedIndex: -1,
    editedItem: {
      category_id: 0,
      description: "",
      content: "",
      thumbnail: null,
      sale_price: 1,
      stock: 1,
      is_sale: true,
    },
    defaultItem: {
      category_id: 0,
      description: "",
      content: "",
      thumbnail: [],
      sale_price: 1,
      stock: 1,
      is_sale: true,
    },
    productInfo: {},
    productMerchants: [],
  }),
  getters: {
    total(state) {
      return state.meta.total ?? 0
    },
    isNew(state) {
      return state.editedIndex === -1
    },

    findById: (state) => (id) => {
      return state.products.find((p) => p.id === id)
    },
    findIndexById: (state) => (id) => {
      return state.products.findIndex((p) => p.id === id)
    },

    hasData(state) {
      return !!state.products.length
    },
    getProduct(state) {
      return {...state.productInfo}
    },
    findByProductId: (state) => (id) => {
      return state.products.find((product) => product.id === id)
    },

    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },

    getMapProduct: (state) => (id) => {
      let product = state.products.find((product) => product.id === id)
      let mapProductList = []
      Object.keys(product).map(function (key, index) {
        let fb = {}
        if (key === "id") {
          fb.key = key
          fb.label = "ID"
          fb.value = product["id"]
          mapProductList.push(fb)
        }
        if (key === "category") {
          fb.key = key
          fb.label = "产品类别"
          fb.value = product["category"]
          mapProductList.push(fb)
        }
        if (key === "description") {
          fb.key = key
          fb.label = "产品描述"
          fb.value = product["description"]
          mapProductList.push(fb)
        }
        if (key === "is_sale") {
          fb.key = key
          fb.label = "是否上线"
          fb.value = product["is_sale"]
          mapProductList.push(fb)
        }

        if (key === "thumbnail") {
          fb.key = key
          fb.label = "产品封面"
          fb.value = product["thumbnail"]
          mapProductList.push(fb)
        }

        if (key === "sale_price") {
          fb.key = key
          fb.label = "销售价格"
          fb.value = product["sale_price"]
          mapProductList.push(fb)
        }
        if (key === "sale_count") {
          fb.key = key
          fb.label = "销售数量"
          fb.value = product["sale_count"]
          mapProductList.push(fb)
        }
        if (key === "stock") {
          fb.key = key
          fb.label = "库存"
          fb.value = product["stock"]
          mapProductList.push(fb)
        }

        if (key === "images") {
          fb.key = key
          fb.label = "产品内容图"
          fb.value = product["images"]
          mapProductList.push(fb)
        }

        if (key === "created_at") {
          fb.key = key
          fb.label = "创建时间"
          fb.value = product["created_at"]
          mapProductList.push(fb)
        }
      })

      return mapProductList
    },
  },
  // Actions
  actions: {
    setEditedIndex(id) {
      this.editedIndex = this.products.findIndex((user) => user.id === id)
    },
    resetEdited() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    findAndSetItem(item) {
      this.editedIndex = this.products.findIndex((p) => p.id === item.id)
      this.editedItem = Object.assign({}, this.products[this.editedIndex])
    },

    async loadAllProducts(payload) {
      this.loading = true
      const res = await ProductService.list(payload)
      if (res.data.data) {
        this.products = res.data.data.items
        this.meta = res.data.data.meta
      }
      this.loading = true
    },

    async toggleSale(payload) {
      const res = await ProductService.toggleSale(payload)
      if (res.data.data) {
        const product = res.data.data
        const index = this.products.findIndex((p) => p.id === payload.id)
        this.products[index].is_sale = product.is_sale
        toast.success(res.data.message)
      }
    },

    async removeProductImage(payload) {
      const res = await ProductService.removeProductImage(payload)
      toast.success(res.data.message)
    },

    async loadProduct(productId) {
      const res = await ProductService.show(productId)
      this.productInfo = res.data.data
      toast.success(res.data.message)
    },

    async createProduct(payload) {
      const res = await ProductService.create(payload)
      const product = res.data.data
      this.products.unshift(product)
      toast.success(res.data.message)
    },

    async updateProduct(payload) {
      const index = this.products.findIndex((p) => p.id === payload.id)
      this.editedIndex = index
      this.editedItem = Object.assign({}, this.products[index])
      const res = await ProductService.update(payload)
      if (res.data.success) {
        Object.assign(this.products[index], res.data.data)
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
      }
    },

    async deleteProduct(productId) {
      const index = this.products.findIndex((p) => p.id === productId)
      const res = await ProductService.delete(productId)
      if (res.data.success) {
        this.products.splice(index, 1)
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
      }
    },

    // async deleteMultiProduct(productIds) {
    //   const res = await ProductService.deleteMultiple(productIds)
    //   if (res.data.success) {
    //     const index = this.products.findIndex((p) => p.id === payload.product_id)
    //     const imageIndex = this.products[index].images.findIndex((p) => p.id === payload.id)
    //     this.products[index].images.splice(imageIndex, 1)
    //     toast.success(res.data.message)
    //   } else {
    //     toast.error(res.data.message)
    //   }
    // },
  },
})
