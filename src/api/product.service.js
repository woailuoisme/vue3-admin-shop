import client from "./http.client"

class ProductService {
  list(data) {
    const params = {
      page: data.page,
      per_page: data.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    if (data?.category_id) params.category_id = data.category_id
    if (data?.is_sale) params.is_sale = data.is_sale ? 1 : 0
    if (data?.created_at) params.created_at = data.created_at

    return client.instance().get("/products", { params })
  }

  show(id) {
    return client.instance().get(`/products/${id}`)
  }

  create(data = {}) {
    let formData = this._attributes(data)
    return client.instance().post(`/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  update(data = {}) {
    let formData = this._attributes(data)
    return client.instance().post(`/product_update/${data.id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  }

  removeProductImage(data) {
    const body = {
      product_image_id: data.id,
    }
    return client.instance().delete(`/product_image`, {
      data: body,
    })
  }

  toggleSale(data) {
    const body = {
      product_id: data.id,
      is_sale: data.is_sale,
    }
    return client.instance().put(`/product_toggle_sale`, body)
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return client.instance().delete(`/products`, {
      data: body,
    })
  }

  deleteMultiple(ids) {
    const body = {
      ids: [...ids],
    }
    return client.instance().delete(`/products`, {
      data: body,
    })
  }

  _attributes(data) {
    let formData = new FormData()
    if (data?.category_id) formData.append("category_id", data.category_id)
    if (data?.description) formData.append("description", data.description)
    if (data?.content) formData.append("content", data.content)
    if (data?.thumbnail) formData.append("thumbnail", data.thumbnail)
    if (data?.attribute) formData.append("attribute", data.attribute)
    if (data?.is_sale) formData.append("is_sale", data.is_sale ? 1 : 0)
    if (data?.sale_price) formData.append("sale_price", data.sale_price)
    if (data?.sale_count) formData.append("sale_count", data.sale_count)
    if (data?.stock) formData.append("stock", data.stock)
    if (data.images) {
      data.images.forEach((v) => formData.append(`images[]`, v))
    }
    return formData
  }
}

export default new ProductService()
