import { decrypto, encrypto } from "@/utils"

export function useLocalStorage() {
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

  function set(key, value, expire = DEFAULT_CACHE_TIME) {
    const storageData = {
      value,
      expire: expire ? new Date().getTime() + expire * 1000 : null,
    }
    const json = encrypto(storageData)
    window.localStorage.setItem(key, json)
  }

  function get(key) {
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

  function remove(key) {
    window.localStorage.removeItem(key)
  }

  function clear() {
    window.localStorage.clear()
  }

  return {
    set,
    get,
    remove,
    clear,
    DEFAULT_CACHE_TIME,
  }
}
