import request from "./http.client"
import client from "@/api/http.client"

class CategoryService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get("/product_category", params)
  }

  store(data) {
    let formData = new FormData()
    formData.append("order", data.order)
    formData.append("image", data.image)
    formData.append("parent_id", data.parent_id)
    formData.append("name", data.name)
    return client.instance().post(`/product_category`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  update(data) {
    let formData = new FormData()
    formData.append("order", data.order)
    if (data.image) {
      formData.append("image", data.image)
    }
    formData.append("parent_id", data.parent_id)
    formData.append("name", data.name)
    return client.instance().post(`/product_category_update/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return client.instance().delete(`/product_category`, {
      data: body,
    })
  }
}

export default new CategoryService()
