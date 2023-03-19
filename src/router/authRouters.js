export const authModule = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "用户登录",
      layout: "default",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/LoginPage.vue"),
  },

  {
    path: "/forgotPassword",
    name: "forgotPassword",
    meta: {
      title: "忘记密码",
      layout: "default",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/ForgotPage.vue"),
  },

  {
    path: "/register",
    name: "register",
    meta: {
      title: "用户注册",
      layout: "default",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/RegisterVue.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    meta: {
      title: "重置密码",
      layout: "default",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/SignupPage.vue"),
  },

  {
    path: "/login",
    name: "login",
    meta: {
      title: "verifyEmail",
      layout: "default",
      requiredAuth: false,
    },
    component: () => import("@/views/auth/VerifyEmailPage.vue"),
  },
]
