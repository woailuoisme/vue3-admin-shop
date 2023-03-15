import request from "./http.client"

class CouponService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
      keyword: data?.keyword,
    }
    return request.instance().get("/coupons", { params })
  }

  show(id) {
    return request.instance().get(`/coupons/${id}`)
  }
}
export default new CouponService()
