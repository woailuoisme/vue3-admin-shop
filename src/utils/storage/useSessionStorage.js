import { decrypto, encrypto } from "@/utils"

export function useSessionStorage() {
  function set(key, value) {
    const json = encrypto(value)
    sessionStorage.setItem(key, json)
  }
  function get(key) {
    const json = sessionStorage.getItem(key)
    let data = null
    if (json) {
      try {
        data = decrypto(json)
      } catch {
        // 防止解析失败
      }
    }
    return data
  }
  function remove(key) {
    window.sessionStorage.removeItem(key)
  }
  function clear() {
    window.sessionStorage.clear()
  }

  return {
    set,
    get,
    remove,
    clear,
  }
}
