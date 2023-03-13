export const API_BASE_URL = import.meta.env.VITE_SOME_KEY

export const getApiUrl = endpoint => API_BASE_URL + endpoint

export const POSTS = getApiUrl('/posts')
export const DELETE_POSTS = getApiUrl('/todos/')

export const TME_IMAGE_UPLOAD = getApiUrl('/common/media_upload')

function getCMPFilterName(field = '', operator = '') {
  const types = { gt: '>', ge: '>=', lt: '<', le: '<=', eq: '=', ne: '<>' }

  for (const [key, value] of Object.entries(types)) {
    if (value === operator.trim()) {
      return `${field}-${key}`
    }
  }
  return ''
}
function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false
}

function isString(val) {
  return typeof val === 'string' || val instanceof String
}

function getFilterName(field) {
  if (isObject(field)) {
    let item = {}
    for (const [key, value] of Object.entries(field)) {
      item[`filter[${key}]`] = value
    }
    return item
  }

  if (isString(field)) {
    return `filter[${field}]`
  }
  return ''
}

function getCommonParams(data = {}) {
  let params = {}
  if (data?.keyword) params.keyword = `filter[${data.keyword}]`
  if (data?.keyword) params.keyword = `filter[${data.keyword}]`
  if (data?.page) params.page = data?.page
  if (data?.rowsPerPage) params.per_page = data?.rowsPerPage
  if (data?.sortBy && data?.sortType) {
    params.sort = `${data.sortType === 'asc' ? '' : '-'}${data.sortBy}`
  }
  return params
}
