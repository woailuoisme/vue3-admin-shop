import client from "@/api/http.client"

class GatewayService {
  list() {
    return client.instance().get("/gateway")
  }

  update(data) {
    let formData = new FormData()
    formData.append("account", data.account)
    if (data.qr_code) {
      formData.append("qr_code", data.qr_code)
    }
    return client.instance().post(`/gateway/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }
}

export default new GatewayService()
