import { userModel } from "../model"
import { mock } from "mockjs"

const apis = [
  {
    url: "/mock/getSmsCode",
    method: "post",
    response: () => {
      return {
        code: 200,
        message: "ok",
        data: true,
      }
    },
  },
  {
    url: "/mock/login",
    method: "post",
    timeout: 500,
    response: (options) => {
      const { userName = undefined, password = undefined } = options.body

      if (!userName || !password) {
        return {
          code: 400,
          message: "request parameter invalid",
          data: null,
        }
      }

      const findItem = userModel.find((item) => item.userName === userName && item.password === password)

      if (findItem) {
        return {
          code: 200,
          message: "ok",
          data: {
            token: findItem.token,
            refreshToken: findItem.refreshToken,
          },
        }
      }
      return {
        code: 1000,
        message: "用户名或密码错误！",
        data: null,
      }
    },
  },
  {
    url: "/mock/getUserInfo",
    method: "get",
    response: (options) => {
      const { authorization = "" } = options.headers
      const REFRESH_TOKEN_CODE = 66666

      if (!authorization) {
        return {
          code: REFRESH_TOKEN_CODE,
          message: "用户已失效或不存在！",
          data: null,
        }
      }
      const userInfo = {
        userId: "",
        userName: "",
        userRole: "user",
        userAvatar:
          "avatar" +
          mock({
            "number|1-20": 2,
          })["number"],
      }
      const isInUser = userModel.some((item) => {
        const flag = item.token === authorization
        if (flag) {
          const { userId: itemUserId, userName, userRole } = item
          Object.assign(userInfo, { userId: itemUserId, userName, userRole })
        }
        return flag
      })

      if (isInUser) {
        return {
          code: 200,
          message: "ok",
          data: userInfo,
        }
      }

      return {
        code: REFRESH_TOKEN_CODE,
        message: "用户信息异常！",
        data: null,
      }
    },
  },
  {
    url: "/mock/updateToken",
    method: "post",
    response: (options) => {
      const { refreshToken = "" } = options.body

      const findItem = userModel.find((item) => item.refreshToken === refreshToken)

      if (findItem) {
        return {
          code: 200,
          message: "ok",
          data: {
            token: findItem.token,
            refreshToken: findItem.refreshToken,
          },
        }
      }
      return {
        code: 3000,
        message: "用户已失效或不存在！",
        data: null,
      }
    },
  },
]

export default apis
