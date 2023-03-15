import request from "./http.client"
import client from "@/api/http.client"

class CommonService {
  productCategories() {
    return request.instance().get(`/common/categories`)
  }

  mediaUpload(data) {
    let formData = new FormData()
    formData.append("image", data.image)
    return client.instance().post(`/common/media_upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
}

export default new CommonService()
