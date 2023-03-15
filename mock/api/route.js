import { routeModel, userModel } from "../model"

const apis = [
  {
    url: "/mock/getUserRoutes",
    method: "post",
    response: (options) => {
      const { userId = undefined } = options.body

      const routeHomeName = "dashboard_analytics"

      const role = userModel.find((item) => item.userId === userId)?.userRole || "user"

      const filterRoutes = routeModel[role]

      return {
        code: 200,
        message: "ok",
        data: {
          routes: filterRoutes,
          home: routeHomeName,
        },
      }
    },
  },
]

export default apis
