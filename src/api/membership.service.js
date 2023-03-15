import request from "./http.client"

class MembershipService {
  //user 列表
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
      keyword: data?.keyword,
    }
    return request.instance().get("/membership", { params })
  }
}

export default new MembershipService()
