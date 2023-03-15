import axios from "axios"
import storage from "@/utils/storage"

export default (auth = true, withFile = false) => {
  // let currentUserString = window.localStorage.currentUser;
  // let currentUser = currentUserString ? JSON.parse(currentUserString) : "";
  const userString = storage.get("user")
  const user = userString ? JSON.parse(userString) : ""
  const token = user && user.token ? user.token : ""
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  }
  if (auth) headers.Authorization = `Bearer ${token}`
  if (withFile) headers["Content-Type"] = "multipart/form-data"
  // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  return axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_ADMIN,
    withCredentials: false,
    headers,
  })
}
