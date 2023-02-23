import client from './http.client'
import { canUsed } from '@/utils/util'

class WithdrawService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) (params.keyword = data.keyword)
    return client.instance().get('/withdraw', { params })
  }

  show(userId) {
    return client.instance().get(`/withdraw/${userId}`)
  }

  confirmedWithdraw(data) {
    const body = {
      record_id: data.id,
      confirmed: data.confirmed,
      remark: data.remark,
    }
    return client.instance().post(`/withdraw_confirm`, body)
  }
}

export default new WithdrawService()
