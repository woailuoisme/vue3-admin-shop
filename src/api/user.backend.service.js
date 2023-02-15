import request from './http.client'
import client from '@/api/http.client'
import { canUsed } from '@/utils/util'

class UserBackendService {
  list(data) {
    const params = {
      page: data.page,
      perPage: data.rowsPerPage,
    }
    canUsed(data.keyword) ? (params.keyword = data.keyword) : null
    return request.instance().get('/admin_users', {params})
  }

  show(userId) {
    return request.instance().get(`/admin_users/${userId}`)
  }

  create(data) {
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('role', data.role)
    formData.append('avatar', data.avatar)
    formData.append('password', data.password)
    return client.instance().post(`/admin_users`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  update(data) {
    let formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('role', data.role)
    if (data.avatar) {
      formData.append('avatar', data.avatar)
    }
    if (data.password) {
      formData.append('password', data.password)
    }
    return client.instance().post(`/admin_users_update/${data.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return client.instance().delete(`/admin_users`, {
      data: body,
    })
  }
}

export default new UserBackendService()
