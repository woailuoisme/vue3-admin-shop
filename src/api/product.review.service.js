import request from "./http.client"

class OrderService {
  //user 列表
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    data?.keyword ? (params.keyword = data.keyword) : null
    return request.instance().get("/product_review", { params })
  }
}
export default new OrderService()
