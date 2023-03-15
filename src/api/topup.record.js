import request from "./http.client"
import { canUsed } from "@/utils/util"

class TopUpRecordService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get("/top_up_records", { params })
  }

  show(id) {
    return request.instance().get(`/top_up_records/${id}`)
  }

  confirmedTopUp(data) {
    const body = {
      record_id: data.id,
      confirmed: data.confirmed,
      remark: data.remark,
    }
    return request.instance().post(`/top_up_confirm`, body)
  }
}
export default new TopUpRecordService()
