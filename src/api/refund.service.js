import request from "./http.client"

class RefundRecordService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get("/refund_records", { params })
  }

  show(id) {
    return request.instance().get(`/refund_records/${id}`)
  }

  confirmedRefund(data) {
    const body = {
      record_id: data.id,
      confirmed: data.confirmed,
      remark: data.remark,
    }
    return request.instance().post(`/refund_confirm`, body)
  }
}
export default new RefundRecordService()
