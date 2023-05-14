import UAParser from "ua-parser-js"
import { useAuth } from "@/stores"
import { isArray, isString } from "@/utils/index"
import pkg from "~/package.json"

const pkgWithType = pkg

export function useAppInfo() {
  const { VITE_APP_NAME: name, VITE_APP_TITLE: title, VITE_APP_DESC: desc } = import.meta.env

  return {
    name,
    title,
    desc,
    version: pkgWithType.version,
  }
}

/** 获取设备信息 */
export function useDeviceInfo() {
  const parser = new UAParser()
  return parser.getResult()
}

/** 权限判断 */
export function usePermission() {
  const auth = useAuth()

  function hasPermission(permission) {
    const { role } = auth.user

    let has = role === "admin"
    if (!has) {
      if (isArray(permission)) {
        has = permission.includes(role)
      }
      if (isString(permission)) {
        has = permission === role
      }
    }
    return has
  }

  return {
    hasPermission,
  }
}
