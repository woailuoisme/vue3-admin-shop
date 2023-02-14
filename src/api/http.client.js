import axios from 'axios'
import Toast from '@/utils/toast'
import router from "@/router";
import {useGlobal, useAuth} from '@/stores'
import NProgress from 'nprogress'

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
      baseURL: import.meta.env.VITE_BASE_URL_ADMIN,
      crossDomain: true,
      withCredentials: false,
      headers: headers,
      timeout: 50000,
    })
    client.interceptors.request.use(
      (config) => {
        // NProgress.start()
        NProgress.start()
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
        // if (['put', 'post', 'delete', 'patch'].includes(response.config.method) && response.data.success) {
        //   Toast.success(response.data.message)
        // }
        // NProgress.done()
        NProgress.done()
        globalStore.setLoading(false)
        return Promise.resolve(response)
      },
      (error) => {
        NProgress.done()
        if (error.code === 'ECONNABORTED') {
          Toast.error('请求超时')
        }
        if (error.code === 'ERR_NETWORK') {
          Toast.error('网络异常')
        }
        if (error.response) {
          console.log(error.response);
          if (error.response.status) {
            switch (error.response.status) {
              case 400:
                Toast.error(error.response.data.message ?? error.response.data.message)
                console.error(error.response.status, error.message)
                console.log('📡 API | Nothing to display', 'Data Not Found')
                break

              case 401: // authentication error, logout the user
                Toast.error('认证无效或已过期,请重新登录')
                authStore.resetUser()
                router.replace('/login')
                console.log('📡 API | Please login again', 'Session Expired')
                localStorage.removeItem('user')
                break

              case 403:
                Toast.error('权限拒绝')
                router.replace('/403')
                console.error(error.response.status, error.message)
                console.log('📡 API | Access denied', 'Data Not Found')
                break

              case 404:
                console.error(error.response.status, error.message)
                console.log('📡 API | Dataset not found', 'Data Not Found')
                break

              case 422:
                Toast.error('请求参数错误！')
                console.log('📡 API | Validation error', 'Unprocessable Content')
                break
              case 500:
                Toast.error('服务端异常')
                router.replace('/500')
                break

              default:
                console.error(error.response.status, error.message)
            }
          }
        }
        globalStore.setLoading(false)
        return Promise.reject(error)
      }
    )
    return client
  }
}

export default new HttpClient()
