import request from './http.client'
import { canUsed } from '@/utils/util'

class CouponService {
  list(data) {
    const params = {
      page: data.page,
      per_page: data.rowsPerPage,
    }
    canUsed(data.keyword) ? (params.keyword = data.keyword) : null
    return request.instance().get('/coupons', { params })
  }

  show(id) {
    return request.instance().get(`/coupons/${id}`)
  }
}
export default new CouponService()
