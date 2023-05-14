export const authModule = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "用户登录",
      layout: "auth",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/LoginPage.vue"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "用户注册",
      layout: "auth",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/RegisterVue.vue"),
  },

  {
    path: "/forgotPwd",
    name: "forgotPwd",
    meta: {
      title: "忘记密码",
      layout: "auth",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/ForgotPage.vue"),
  },
  {
    path: "/resetPwd",
    name: "resetPwd",
    meta: {
      title: "重置密码",
      layout: "auth",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/ResetPage.vue"),
  },

  {
    path: "/verifyEmail",
    name: "verifyEmail",
    meta: {
      title: "verifyEmail",
      layout: "auth",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/VerifyEmailPage.vue"),
  },
]
