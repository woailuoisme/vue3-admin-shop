import request from './http.client'

class FeedbackService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get('/feedbacks', { params })
  }

  show(id) {
    return request.instance().get(`/feedbacks/${id}`)
  }
}

export default new FeedbackService()
