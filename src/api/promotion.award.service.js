import request from "./http.client"

class PromotionService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get("/promotion_award", { params })
  }
  show(id) {
    return request.instance().get(`/promotion_award/${id}`)
  }
}
export default new PromotionService()
