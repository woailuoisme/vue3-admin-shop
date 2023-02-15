import request from './http.client'
import { canUsed } from '@/utils/util'

class IntegralRecordService {
  list(data) {
    const params = {
      page: data.page,
      per_page: data.rowsPerPage,
    }
    canUsed(data.keyword) ? (params.keyword = data.keyword) : null
    return request.instance().get('/integral_records', { params })
  }
}

export default new IntegralRecordService()
