import { useToastMsg } from "@/utils/toast"
const { successMsg, errorMsg } = useToastMsg()
export const toastResponse = (code) => {
  switch (code) {
    case 200:
      successMsg("数据响应成功")
      break
    case 201:
      successMsg("数据处理成功")
      break
    case 204:
      successMsg("数据响应成功")
      break
    case 400:
      errorMsg("数据响应失败")
      break
    case 401:
      errorMsg("用户未认证")
      break
    case 403:
      errorMsg("用户无权限")
      break
    case 404:
      errorMsg("资源未发现")
      break
    case 409:
      errorMsg("提交参数错误")
      break
    case 422:
      errorMsg("提交参数错误")
      break
    case 429:
      errorMsg("请求次数过多，请稍后重试")
      break
    case code >= 500:
      errorMsg("服务端错误")
      break
    default:
      successMsg("数据响应成功")
  }
}
