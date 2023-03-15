import { decrypto, encrypto } from "@/utils"

class CreateLocalStorage {
  // DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7
  constructor() {
    this.DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7
  }

  set(key, value, expire = this.DEFAULT_CACHE_TIME) {
    const storageData = {
      value,
      expire: expire ? new Date().getTime() + expire * 1000 : null,
    }
    const json = encrypto(storageData)
    window.localStorage.setItem(key, json)
  }

  get(key) {
    const json = window.localStorage.getItem(key)
    if (json) {
      let storageData
      try {
        storageData = decrypto(json)
      } catch {
        // 防止解析失败
      }
      if (storageData) {
        const { value, expire } = storageData
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value
        }
      }
      this.remove(key)
      return null
    }
    return null
  }

  remove(key) {
    window.localStorage.removeItem(key)
  }

  clear() {
    window.localStorage.clear()
  }
}

export default new CreateLocalStorage()
