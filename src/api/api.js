import axios from "axios"
import storage from "@/utils/storage"

export default (auth = true, withFile = false) => {
  const userString = storage.get("user")
  const user = userString ? JSON.parse(userString) : ""
  const token = user && user.token ? user.token : ""
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
  if (auth) headers.Authorization = `Bearer ${token}`
  if (withFile) headers["Content-Type"] = "multipart/form-data"
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_ADMIN,
    withCredentials: false,
    headers,
  })
}
