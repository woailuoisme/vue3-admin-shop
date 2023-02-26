import OrderService from '../api/order.service'
import Toast from '@/utils/toast'
import {defineStore} from 'pinia'

/** Global Store */
export default defineStore('order', {
  // Default Global State
  state: () => ({
    orders: [],
    meta: {},
    initProductMeta: {
      per_page: 10,
      last_page: 1,
      current_page: 1,
      total: 0,
      from: 1,
      to: 7,
    },
    loading: false,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      id: 0,
      category_id: 0,
      description: '',
      content: '',
      thumbnail: [],
      sale_price: 1,
      stock: 1,
      is_sale: true,
    },
  }),
  // Getters
  getters: {
    total(state) {
      return state.meta.total ?? 0
    },
    isNew(state) {
      return state.editedIndex === -1
    },
    findById: (state) => (id) => {
      return state.orders.find((p) => p.id === id)
    },
    findIndexById: (state) => (id) => {
      return state.orders.findIndex((p) => p.id === id)
    },
    hasData(state) {
      return !!state.orders.length
    },
    isDisplayPagination(state) {
      return !!(state.meta && state.meta.last_page && state.meta.last_page > 1)
    },
    findByOrderNum: (state) => (num) => {
      return state.orders.find((order) => order.order_num === num)
    },
    getMapOrder: (state) => (id) => {
      let order = state.orders.find((order) => order.id === id)
      let mapOrderList = []
      Object.keys(order).map(function (key, index) {
        let fb = {}
        if (key === 'id') {
          fb.key = key
          fb.label = 'id'
          fb.value = order['id']
          mapOrderList.push(fb)
        }
        if (key === 'order_num') {
          fb.key = key
          fb.label = '订单编号'
          fb.value = order['order_num']
          mapOrderList.push(fb)
        }
        if (key === 'order_status') {
          fb.key = key
          fb.label = '订单状态'
          fb.value = order['order_status']
          mapOrderList.push(fb)
        }
        if (key === 'amount') {
          fb.key = key
          fb.label = '金额'
          fb.value = order['amount']
          mapOrderList.push(fb)
        }
        if (key === 'user') {
          fb.key = key
          fb.label = '用户'
          fb.value = order['user']
          mapOrderList.push(fb)
        }

        if (key === 'user_remark') {
          fb.key = key
          fb.label = '备注'
          fb.value = order['user_remark']
          mapOrderList.push(fb)
        }
        if (key === 'paid_at') {
          fb.key = key
          fb.label = '支付时间'
          fb.value = order['paid_at']
          mapOrderList.push(fb)
        }
        // if (key === "order_expired") {
        //     fb.key = key;
        //     fb.label = "是否过期";
        //     fb.value = order['order_expired']
        //     mapOrderList.push(fb)
        // }
        if (key === 'express_no') {
          fb.key = key
          fb.label = '物流编号'
          fb.value = order['express_no']
          mapOrderList.push(fb)
        }
        if (key === 'express_company') {
          fb.key = key
          fb.label = '物流公司'
          fb.value = order['express_company']
          mapOrderList.push(fb)
        }
        if (key === 'created_at') {
          fb.key = key
          fb.label = '创建时间'
          fb.value = order['created_at']
          mapOrderList.push(fb)
        }
      })
      return mapOrderList
    },
  },
  // Actions
  actions: {
    setEditedIndex(id) {
      this.editedIndex = this.orders.findIndex((m) => m.id === id)
    },
    resetEdited() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    findAndSetItem(item) {
      this.editedIndex = this.orders.findIndex((m) => m.id === item.id)
      this.editedItem = Object.assign({}, item)
    },
    async loadAllOrders(payload) {
      const res = await OrderService.list(payload)
      if (res.data.success) {
        this.orders = res.data.data.items
        this.meta = res.data.data.meta
      }
    },
    async updateOrderExpress(payload) {
      const res = await OrderService.updateExpress(payload)
      if (res.data.success) {
        const index = this.orders.findIndex((p) => p.id === payload.id)
        Object.assign(this.orders[index], payload)
        Toast.success(res.data.message)
      } else {
        Toast.error(res.data.message)
      }
    },
  },
})
