import request from './http.client'
import { canUsed } from '@/utils/util'

class OrderService {
  //user 列表
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
      keyword: data?.keyword,
    }
    return request.instance().get('/product_review', { params })
  }
}
export default new OrderService()
