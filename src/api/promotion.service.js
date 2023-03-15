import client from "./http.client"
import { canUsed } from "@/utils/util"

class PromotionService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    return client.instance().get("/promotion", { params })
  }

  show(id) {
    return client.instance().get(`/promotion/${id}`)
  }

  create(data) {
    let formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("rules", data.rules)
    if (data.imageFile) {
      formData.append("image", data.imageFile)
    }
    return client.instance().post(`/promotion`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  update(data) {
    debugger
    let formData = new FormData()
    formData.append("name", data.name)
    formData.append("description", data.description)
    formData.append("rules", data.rules)
    if (data.imageFile) {
      formData.append("image", data.imageFile)
    }
    return client.instance().post(`/promotion_update/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return client.instance().delete(`/promotion`, {
      data: body,
    })
  }
}

export default new PromotionService()
