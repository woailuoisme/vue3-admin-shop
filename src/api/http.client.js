import axios from 'axios'
import Toast from '../utils/toast'
import vue from '../main'
import { useGlobal, useAuth } from '@/stores'
import { baseUrl } from '@/utils/config'
class HttpClient {
  instance(auth = true) {
    const globalStore = useGlobal()
    const authStore = useAuth()

    const userString = window.localStorage.user
    const user = userString ? JSON.parse(userString) : ''
    const token = user && user.token ? user.token : ''
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    if (auth) {
      headers.Authorization = `Bearer ${token}`
    }
    const client = axios.create({
      baseURL: baseUrl,
      crossDomain: true,
      withCredentials: false,
      headers: headers,
      timeout: 50000,
    })
    client.interceptors.request.use(
      (config) => {
        // NProgress.start()
        vue.$NProgress.start()
        globalStore.setLoading(true)
        return config
      },
      (error) => {
        globalStore.setLoading(false)
        Toast.error(error.message)
        return Promise.reject(error)
      }
    )
    client.interceptors.response.use(
      (response) => {
        // const res = response.data;
        if (['put', 'post', 'delete', 'patch'].includes(response.config.method) && response.data.success) {
          Toast.success(response.data.message)
        }
        // NProgress.done()
        vue.$NProgress.done()
        globalStore.setLoading(false)
        return Promise.resolve(response)
      },
      (error) => {
        console.log(error)
        if (error.code === 'ECONNABORTED') {
          Toast.error('请求超时')
        }
        if (error.code === 'ERR_NETWORK') {
          Toast.error('网络异常')
        }
        if (error.response.status && error.response.status === 422) {
          Toast.error('请求参数错误！')
        } else if (error.response.status && error.response.status === 403) {
          Toast.error('权限拒绝')
          vue.$router.replace('/403')
        } else if (error.response.status && error.response.status === 401) {
          Toast.error('认证无效或已过期,请重新登录')
          authStore.resetUser()
          vue.$router.replace('/login')
        } else if (error.response.status && error.response.status >= 500) {
          Toast.error('服务端异常')
          vue.$router.replace('/500')
        }
        globalStore.setLoading(false)
        return Promise.reject(error)
      }
    )
    return client
  }
}

export default new HttpClient()
