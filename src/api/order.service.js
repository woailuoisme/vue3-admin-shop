import request from "./http.client"

class OrderService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get("/orders", { params })
  }

  updateExpress(data) {
    const body = {
      order_id: data.id,
      no: data.no,
      company: data.company,
    }

    return request.instance().put("/order_update_express", body)
  }
}

export default new OrderService()
