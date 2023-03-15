import client from "@/api/http.client"

class AboutUsService {
  list() {
    return client.instance().get("/about_us")
  }

  show(id) {
    return client.instance().get(`/about_us/${id}`)
  }

  create(data = {}) {
    const body = {
      content: data.content,
    }
    return client.instance().post("/about_us", body)
  }

  update(data = {}) {
    const body = {
      content: data.content,
    }
    return client.instance().put(`/about_us/${data.id}`, body)
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return client.instance().delete(`/about_us`, {
      data: body,
    })
  }
}

export default new AboutUsService()
