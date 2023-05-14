import { errorModule } from "./errorRouters"
import { menuModule } from "./menuRouters"
import { authModule } from "./authRouters"

const personModule = [
  {
    path: "/user",
    name: "profile",
    children: [
      {
        path: "/user/profile",
        name: "person_profile",
        component: () => import("@/views/UserProfilePage.vue"),
        meta: {
          title: "个人信息",
          layout: "menu",
          disabled: true,
          requiredAuth: true,
          permission: "home",
          breads: [
            { text: "主页", disabled: false, href: "/dashboard" },
            { text: "个人信息", disabled: true, href: "/user/profile" },
          ],
        },
      },
    ],
  },
]

const testModule = [
  {
    path: "/drag",
    name: "drag",
    component: () => import("@/components/shared/DragSorted.vue"),
  },
  {
    path: "/menu",
    name: "menu",
    component: () => import("@/views/menu/MenuView.vue"),
  },
  {
    path: "/tree",
    name: "tree",
    component: () => import("@/views/tree/Tree.vue"),
  },
  {
    path: "/step",
    name: "step",
    component: () => import("@/views/step/StepperPage.vue"),
  },
  {
    path: "/upload",
    name: "/upload",
    component: () => import("@/views/FileUpload.vue"),
  },
  {
    path: "/card",
    name: "card",
    title: "用户注册",
    meta: {
      title: "仪表盘",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [{ text: "仪表盘", disabled: true, href: "/dashboard" }],
    },
    component: () => import("@/views/card/CardView.vue"),
  },
  // {
  //   path: '/product/form',
  //   name: 'product_test',
  //   component: () => import('@/views/components/adminProduct/DialogEntityForm'),
  // },
  {
    path: "/form",
    name: "form",
    component: () => import("@/views/FormVuePage.vue"),
  },
]

export const routers = [...personModule, ...authModule, ...errorModule, ...menuModule, ...testModule]
