export const API_BASE_URL = import.meta.env.VITE_SOME_KEY

export const getApiUrl = (endpoint) => API_BASE_URL + endpoint

export const POSTS = getApiUrl('/posts')
export const DELETE_POSTS = getApiUrl('/todos/')
