import client from './http.client'
import { canUsed } from '@/utils/util'

class CarouselService {
  list(data) {
    const params = {
      page: data.page,
      per_page: data.rowsPerPage,
    }
    canUsed(data.keyword) ? (params.keyword = data.keyword) : null
    return client.instance().get('/carousels', { params })
  }

  // listMedias(productId) {
  //     return client.instance().get(`/products/${productId}/medias`);
  // }

  show(id) {
    return client.instance().get(`/carousels/${id}`)
  }

  store(data) {
    let formData = new FormData()
    formData.append('order', data.order)
    formData.append('image', data.image)
    return client.instance().post(`/carousels`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  update(data) {
    let formData = new FormData()
    formData.append('order', data.order)
    if (data.image) {
      formData.append('image', data.image)
    }
    return client.instance().post(`/carousel_update/${data.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return client.instance().delete(`/carousels`, {
      data: body,
    })
  }
}

export default new CarouselService()
