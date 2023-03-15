import { mock } from "mockjs"

const apis = [
  {
    url: "/mock/getAllUserList",
    method: "post",
    timeout: 1000,
    response: () => {
      const data = mock({
        pageNo: 1,
        pageSize: 10,
        total: 20,
        "list|10": [
          {
            id: "@id",
            name: "@name",
            "role|1": ["user", "admin"],
            "age|18-56": 56,
            "gender|1": ["0", "1", null],
            "verified|1-2": true,
            created: mock("@datetime()"),
            lastSignIn: mock("@datetime()"),
            phone: /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/,
            "email|1": ['@email("gmail.com")'],
            "userStatus|1": ["1", "2", "3", "4", null],
            birthDay: mock("@date()"),
            avatar: () => {
              return (
                "avatar" +
                mock({
                  "number|1-20": 2,
                })["number"]
              )
            },
          },
        ],
      })
      return {
        code: 200,
        message: "ok",
        data: data,
      }
    },
  },

  {
    url: "/mock/getUser/:id?",
    method: "post",
    timeout: 1500,
    response: () => {
      const data = mock({
        id: "@id",
        name: "@name",
        "role|1": ["user", "admin"],
        "age|18-56": 56,
        "gender|1": ["0", "1", null],
        "verified|1-2": true,
        created: mock("@datetime()"),
        lastSignIn: mock("@datetime()"),
        phone: /^[1](([3][0-9])|([4][01456789])|([5][012356789])|([6][2567])|([7][0-8])|([8][0-9])|([9][012356789]))[0-9]{8}$/,
        "email|1": ['@email("qq.com")'],
        "userStatus|1": ["1", "2", "3", "4", null],
        birthDay: mock("@date()"),
        avatar: () => {
          return (
            "avatar" +
            mock({
              "number|1-20": 2,
            })["number"]
          )
        },
      })
      return {
        code: 200,
        message: "ok",
        data: data,
      }
    },
  },
]

export default apis
