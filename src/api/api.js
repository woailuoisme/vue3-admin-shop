import axios from 'axios'
import { baseUrl } from '@/utils/config'

export default (auth = true) => {
  // let currentUserString = window.localStorage.currentUser;
  // let currentUser = currentUserString ? JSON.parse(currentUserString) : "";

  const userString = window.localStorage.user
  const user = userString ? JSON.parse(userString) : ''
  const token = user && user.token ? user.token : ''

  let headerWithAuth = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  return axios.create({
    baseURL: baseUrl,
    withCredentials: false,
    headers: auth ? headerWithAuth : header,
  })
}
