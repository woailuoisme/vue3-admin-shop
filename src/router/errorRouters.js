export const errorModule = [
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
  {
    path: "/404",
    name: "not_found",
    meta: {
      title: "页面未找到",
      layout: "default",
      requiredAuth: false,
    },
    component: () => import("@/views/errors/NotFound.vue"),
  },
  {
    path: "/403",
    name: "forbidden",
    meta: {
      title: "权限拒绝",
      layout: "default",
      requiredAuth: false,
    },
    component: () => import("@/views/errors/Forbidden.vue"),
  },

  {
    path: "/500",
    name: "server_error",
    meta: {
      title: "服务器异常",
      layout: "default",
      requiredAuth: false,
    },
    component: () => import("@/views/errors/ServerError.vue"),
  },
]
