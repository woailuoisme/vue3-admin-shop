import request from "./http.client"

export const topUpAmountRequest = () => {
  function list(data) {
    let params = {}
    if (data?.page) params.page = data?.page
    if (data?.rowsPerPage) params.per_page = data?.rowsPerPage
    if (data?.sortBy) params.sortBy = data.sortBy
    if (data?.sortType) params.sortType = data.sortType
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get("/top_up_amount", { params })
  }

  function show(id) {
    return request.instance().get(`/top_up_amount/${id}`)
  }

  function store(data) {
    let body = {
      integral: data?.integral,
      amount: data?.amount,
    }
    return request.instance().post(`/top_up_amount`, body)
  }

  function update(data) {
    let body = {
      integral: data?.integral,
      amount: data?.amount,
    }
    return request.instance().put(`/top_up_amount/${data?.id}`, body)
  }

  function remove(id) {
    const body = {
      ids: [id],
    }
    return request.instance().delete(`/top_up_amount`, {
      data: body,
    })
  }

  return { list, show, store, update, remove }
}
