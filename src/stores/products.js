import ProductService from '../api/product.service'
import Toast from '../utils/toast'

export default {
  namespaced: true,
  state: {
    products: [],
    meta: {},
    initProductMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 7,
      from: 1,
      to: 10,
    },
    productInfo: {},
    productMerchants: [],
  },

  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },

    SET_META(state, payload) {
      state.meta = payload
    },

    SET_PRODUCT(state, payload) {
      state.productInfo = payload
    },

    CREATE_PRODUCTS(state, payload) {
      state.products.unshift(payload)
    },

    UPDATE_PRODUCTS(state, payload) {
      const index = state.products.findIndex((p) => p.id === payload.id)
      Object.assign(state.products[index], payload)
    },

    DELETE_PRODUCT(state, payload) {
      const index = state.products.findIndex((p) => p.id === payload)
      state.products.splice(index, 1)
    },

    DELETE_MULTI_PRODUCT(state, payload) {
      // payload.forEach((id) => {
      //     const index = state.products.findIndex(p => p.id === id);
      //     state.products.splice(index, 1);
      // });
      state.products = state.products.filter((p) => !payload.includes(p.id))
    },

    DELETE_PRODUCT_IMAGE(state, payload) {
      debugger
      const index = state.products.findIndex((p) => p.id === payload.product_id)
      const imageIndex = state.products[index].images.findIndex((p) => p.id === payload.id)
      state.products[index].images.splice(imageIndex, 1)
    },

    RESET_PRODUCT(state) {
      state.productInfo = {}
    },
  },
  actions: {
    async loadAllProducts({ commit }, payload) {
      const res = await ProductService.list(payload)
      if (res.data.data) {
        commit('SET_PRODUCTS', res.data.data.items)
        commit('SET_META', res.data.data.meta)
      }
    },

    clearProduct({ commit }) {
      commit('RESET_PRODUCT')
    },

    async toggleSale({ commit }, payload) {
      const res = await ProductService.toggleSale(payload)
      if (res.data.data) {
        const product = res.data.data
        commit('SET_PRODUCT', product)
        Toast.success(res.data.message)
      }
    },

    async removeProductImage({ commit }, payload) {
      const res = await ProductService.removeProductImage(payload)
      // debugger
      // commit("DELETE_PRODUCT_IMAGE", payload);
      Toast.success(res.data.message)
    },

    async loadProduct({ commit }, productId) {
      const res = await ProductService.show(productId)
      const product = res.data.data
      commit('SET_PRODUCT', product)
      Toast.success(res.data.message)
    },

    async createProduct({ commit }, payload) {
      const res = await ProductService.create(payload)
      const product = res.data.data

      commit('CREATE_PRODUCTS', product)
      Toast.success(res.data.message)
      return true
    },

    async updateProduct({ commit }, payload) {
      const res = await ProductService.update(payload)
      const product = res.data.data
      commit('UPDATE_PRODUCTS', product, { root: true })
      Toast.success(res.data.message)
    },

    async deleteProduct({ commit }, productId) {
      const res = await ProductService.delete(productId)
      if (res.data.success) {
        commit('DELETE_PRODUCT', productId)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },

    async deleteMultiProduct({ commit }, productIds) {
      const res = await ProductService.deleteMultiple(productIds)
      debugger
      if (res.data.success) {
        commit('DELETE_MULTI_PRODUCT', productIds)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
  getters: {
    hasData(state) {
      return !!state.products.length
    },
    getProducts(state) {
      return [...state.products]
    },

    getProductMerchants(state) {
      return state.productMerchants
    },

    getProduct(state) {
      return { ...state.productInfo }
    },
    findByProductId: (state) => (id) => {
      return state.products.find((product) => product.id === id)
    },
    getMeta(state) {
      return { ...state.meta }
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },

    getMapProduct: (state) => (id) => {
      let product = state.products.find((product) => product.id === id)
      let mapProductList = []
      Object.keys(product).map(function (key, index) {
        let fb = {}
        if (key === 'id') {
          fb.key = key
          fb.label = 'ID'
          fb.value = product['id']
          mapProductList.push(fb)
        }
        if (key === 'category') {
          fb.key = key
          fb.label = '产品类别'
          fb.value = product['category']
          mapProductList.push(fb)
        }
        if (key === 'description') {
          fb.key = key
          fb.label = '产品描述'
          fb.value = product['description']
          mapProductList.push(fb)
        }
        // if (key === "content") {
        //     fb.key = key;
        //     fb.label = "产品内容";
        //     fb.value = product['content']
        //     mapProductList.push(fb)
        // }
        if (key === 'is_sale') {
          fb.key = key
          fb.label = '是否上线'
          fb.value = product['is_sale']
          mapProductList.push(fb)
        }

        if (key === 'thumbnail') {
          fb.key = key
          fb.label = '产品封面'
          fb.value = product['thumbnail']
          mapProductList.push(fb)
        }

        if (key === 'sale_price') {
          fb.key = key
          fb.label = '销售价格'
          fb.value = product['sale_price']
          mapProductList.push(fb)
        }
        if (key === 'sale_count') {
          fb.key = key
          fb.label = '销售数量'
          fb.value = product['sale_count']
          mapProductList.push(fb)
        }
        if (key === 'stock') {
          fb.key = key
          fb.label = '库存'
          fb.value = product['stock']
          mapProductList.push(fb)
        }

        if (key === 'images') {
          fb.key = key
          fb.label = '产品内容图'
          fb.value = product['images']
          mapProductList.push(fb)
        }

        if (key === 'created_at') {
          fb.key = key
          fb.label = '创建时间'
          fb.value = product['created_at']
          mapProductList.push(fb)
        }
      })

      return mapProductList
    },
  },
}
