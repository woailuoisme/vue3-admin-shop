export const menuModule = [
  {
    path: "/",
    name: "home",
    redirect: "/dashboard",
    meta: {
      title: "主页",
      layout: "menu",
      disabled: true,
      href: "home",
      requiredAuth: true,
      permission: "home",
      breads: [{ text: "主页", disabled: true, href: "/dashboard" }],
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      title: "仪表盘",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [{ text: "仪表盘", disabled: true, href: "/dashboard" }],
    },

    component: () => import("@/views/DashboardPage.vue"),
  },
  {
    path: "/user",
    name: "user",
    meta: {
      requiredAuth: true,
      permission: "home",
    },
    children: [
      {
        path: "/frontend",
        name: "user_frontend",
        meta: {
          title: "前台用户管理",
          layout: "menu",
          requiredAuth: true,
          permission: "home",
          breads: [
            { text: "主页", disabled: false, href: "/dashboard" },
            { text: "前台用户管理", disabled: true, href: "/dashboard" },
          ],
        },
        component: () => import("@/views/UserFrontPage.vue"),
      },

      {
        path: "/backend",
        name: "user_backend",
        meta: {
          title: "后台用户管理",
          layout: "menu",
          requiredAuth: true,
          permission: "home",
          breads: [
            { text: "主页", disabled: false, href: "/home" },
            { text: "后台用户管理", disabled: true, href: "/dashboard" },
          ],
        },
        component: () => import("@/views/UserPage.vue"),
      },
    ],
  },

  {
    path: "/product",
    name: "product",
    children: [
      {
        path: "/product/list",
        name: "product_list",
        meta: {
          title: "产品管理",
          layout: "menu",
          requiredAuth: true,
          permission: "home",
          breads: [
            { text: "主页", disabled: false, href: "/home" },
            { text: "后台用户管理", disabled: true, href: "/dashboard" },
          ],
        },
        component: () => import("@/views/ProductPage.vue"),
      },

      {
        path: "/product/category",
        name: "product_category",
        meta: {
          title: "产品分类管理",
          layout: "menu",
          requiredAuth: true,
          permission: "home",
          breads: [
            { text: "主页", disabled: false, href: "/home" },
            { text: "产品分类管理", disabled: true, href: "/dashboard" },
          ],
        },
        component: () => import("@/views/ProductCategoryPage.vue"),
      },
    ],
  },

  {
    path: "/order",
    name: "order",
    meta: {
      title: "订单管理",
      requiredAuth: true,
      layout: "menu",
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "订单管理", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/OrderPage.vue"),
  },
  {
    path: "/withdraw",
    name: "withdraw",
    meta: {
      title: "提现记录",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "提现记录", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/WithdrawPage.vue"),
  },
  {
    path: "/feedback",
    name: "feedback",
    meta: {
      title: "用户反馈",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "用户反馈", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/FeedbackPage.vue"),
  },

  {
    path: "/coupon",
    name: "coupon",
    meta: {
      title: "优惠券",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "优惠券", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/CouponPage.vue"),
  },
  {
    path: "/promotion",
    name: "promotion",
    meta: {
      title: "团购",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "团购", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/PromotionPage.vue"),
  },
  {
    path: "/promotion_award",
    name: "promotion_award",
    meta: {
      title: "团购奖品",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "团购奖品", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/PromotionAwardPage.vue"),
  },
  {
    path: "/refund",
    name: "refund",
    meta: {
      title: "退款管理",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "退款管理", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/RefundPage.vue"),
  },
  {
    path: "/top_up_amount",
    name: "top_up_amount",
    meta: {
      title: "充值设置管理",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "充值设置管理", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/TopUpAmountPage.vue"),
  },
  {
    path: "/top_up_record",
    name: "top_up_record",
    meta: {
      title: "充值管理",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "充值管理", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/TopUpRecordPage.vue"),
  },
  {
    path: "/carousel",
    name: "carousel",
    meta: {
      title: "轮播图",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "轮播图", disabled: true, href: "/carousel" },
      ],
    },
    component: () => import("@/views/CarouselNewPage.vue"),
  },
  {
    path: "/about_us",
    name: "about_us",
    meta: {
      title: "关于我们",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "关于我们", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/AboutUsPage.vue"),
  },
  {
    path: "/gateway",
    name: "gateway",
    meta: {
      title: "支付网关",
      layout: "menu",
      requiredAuth: true,
      permission: "home",
      breads: [
        { text: "主页", disabled: false, href: "/dashboard" },
        { text: "支付网关", disabled: true, href: "/dashboard" },
      ],
    },
    component: () => import("@/views/GatewayPage.vue"),
  },
]
