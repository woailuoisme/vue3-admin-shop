import request from './http.client'
import { canUsed } from '@/utils/util'

class OrderService {
  //user 列表
  list(data) {
    const params = {
      page: data.page,
      per_page: data.perPage,
    }
    canUsed(data.keyword) ? (params.keyword = data.keyword) : null
    return request.instance().get('/orders', { params })
  }

  updateExpress(data) {
    const body = {
      order_id: data.id,
      no: data.no,
      company: data.company,
    }

    return request.instance().put('/order_update_express', body)
  }
}

export default new OrderService()
