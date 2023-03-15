import { defineStore } from "pinia"

/** Config Store */
export default defineStore("breadcrumb", {
  // Default Config State
  state: () => ({
    dashboard: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "仪表盘", disabled: true, href: "/dashboard" },
    ],
    user: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "前台用户管理", disabled: true, href: "/dashboard" },
    ],
    adminUser: [
      { text: "主页", disabled: false, href: "/home" },
      { text: "后台用户管理", disabled: true, href: "/dashboard" },
    ],
    productCategory: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "产品分类", disabled: true, href: "/dashboard" },
    ],
    productNew: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "新建产品", disabled: true, href: "/dashboard" },
    ],
    product: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "产品管理", disabled: true, href: "/dashboard" },
    ],
    productDetail: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "产品详情", disabled: true, href: "/product" },
    ],
    refund: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "退款管理", disabled: true, href: "/dashboard" },
    ],
    order: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "订单管理", disabled: true, href: "/dashboard" },
    ],

    withdraw: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "提现记录", disabled: true, href: "/dashboard" },
    ],
    feedback: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "用户反馈", disabled: true, href: "/dashboard" },
    ],

    carousel: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "轮播图", disabled: true, href: "/dashboard" },
    ],

    coupon: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "优惠券", disabled: true, href: "/dashboard" },
    ],

    promotion: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "团购", disabled: true, href: "/dashboard" },
    ],

    promotionAward: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "团购奖品", disabled: true, href: "/dashboard" },
    ],
    topUpAmount: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "充值设置管理", disabled: true, href: "/dashboard" },
    ],
    topUpRecord: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "充值管理", disabled: true, href: "/dashboard" },
    ],
    aboutUs: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "关于我们", disabled: true, href: "/dashboard" },
    ],

    gateway: [
      { text: "主页", disabled: false, href: "/dashboard" },
      { text: "", disabled: true, href: "/dashboard" },
    ],
  }),
})
