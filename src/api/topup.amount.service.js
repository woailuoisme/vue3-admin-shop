import request from './http.client'

class TopUpAmountService {
  list(data) {
    console.log(data)
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.sortBy) params.sortBy = data.sortBy
    if (data?.sortType) params.sortType = data.sortType
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get('/top_up_amount', { params })
  }

  show(id) {
    return request.instance().get(`/top_up_amount/${id}`)
  }

  store(data) {
    let body = {
      integral: data?.integral,
      amount: data?.amount,
    }
    return request.instance().post(`/top_up_amount`, body)
  }

  update(data) {
    let body = {
      integral: data?.integral,
      amount: data?.amount,
    }
    return request.instance().put(`/top_up_amount/${data?.id}`, body)
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return request.instance().delete(`/top_up_amount`, {
      data: body,
    })
  }
}

export default new TopUpAmountService()
