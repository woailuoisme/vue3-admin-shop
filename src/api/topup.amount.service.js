import request from "@/api/http.client"
import { buildQueryParams } from "@/utils"

export const topUpAmountService = () => {
  function list(data) {
    const params = buildQueryParams(data)
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
