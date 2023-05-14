import axios from "axios"
import router from "@/router"
import { useGlobal } from "@/stores"
import { useLocalStorage, useToastMsg, startProgress, endProgress } from "@/utils"
const storage = useLocalStorage()

const { errorMsg } = useToastMsg()

class HttpClient {
  instance(auth = true, withFile = false) {
    const globalStore = useGlobal()
    const userString = storage.get("user")
    const user = userString ? JSON.parse(userString) : ""
    const token = user && user.token ? user.token : ""
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
    if (auth) headers.Authorization = `Bearer ${token}`
    if (withFile) headers["Content-Type"] = "multipart/form-data"

    const client = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL_ADMIN,
      crossDomain: true,
      withCredentials: false,
      headers: headers,
      timeout: 50000,
    })

    client.interceptors.request.use(
      (config) => {
        startProgress()
        globalStore.setLoading(true)
        return config
      },
      (error) => {
        globalStore.setLoading(false)
        errorMsg(error.message)
        return Promise.reject(error)
      },
    )
    client.interceptors.response.use(
      (response) => {
        endProgress()
        globalStore.setLoading(false)
        return Promise.resolve(response)
      },
      (error) => {
        endProgress()
        if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
          errorMsg("请求超时")
        }
        if (error.code === "ERR_NETWORK") {
          errorMsg("网络异常")
        }
        if (error?.response && error.response.status) {
          switch (error.response.status) {
            case 400:
              errorMsg(error.response.data.message ?? error.response.data.message)
              break
            case 401:
              errorMsg("认证无效或已过期,请重新登录！")
              storage.remove("user")
              router.replace({ name: "login" })
              break
            case 403:
              errorMsg("权限拒绝！")
              router.replace({ name: "forbidden" })
              break
            case 404:
              errorMsg("未返回资源！")
              break
            case 422:
              errorMsg("请求参数错误！")
              break
            case 500:
              errorMsg("服务端异常")
              router.replace({ name: "server_error" })
              break
            default:
              console.error(error.response.status, error.message)
              return Promise.reject(error)
          }
        }
        globalStore.setLoading(false)
        return Promise.reject(error)
      },
    )
    return client
  }
}

export default new HttpClient()
