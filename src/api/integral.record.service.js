import request from "./http.client"

class IntegralRecordService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get("/integral_records", { params })
  }
}

export default new IntegralRecordService()
