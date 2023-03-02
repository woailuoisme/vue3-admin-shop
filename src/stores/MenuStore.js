import { defineStore } from 'pinia'

const dashboard = { icon: 'mdi-contacts', text: '仪表盘', prependIcon: 'mdi-view-dashboard-outline', name: 'dashboard' }
const user = {
  text: '用户管理',
  prependIcon: 'mdi-account-outline',
  model: true,
  children: [
    { text: '前台用户', name: 'user_frontend' },
    { text: '后台用户', name: 'user_backend' },
  ],
}
const shop = {
  icon: 'mdi-chevron-up',
  'icon-alt': 'mdi-chevron-down',
  text: '商品管理',
  prependIcon: 'mdi-shopping-search-outline',
  model: true,
  children: [
    { text: '商品分类', name: 'product_category' },
    { text: '商品管理', name: 'product_list' },
  ],
}
const order = {
  icon: 'mdi-chevron-up',
  'icon-alt': 'mdi-chevron-down',
  text: '订单管理',
  prependIcon: 'mdi-wallet',
  model: true,
  children: [{ text: '订单管理', name: 'order' }],
}
const content = {
  icon: 'mdi-chevron-up',
  'icon-alt': 'mdi-chevron-down',
  text: '内容管理',
  prependIcon: 'mdi-content-save-edit-outline',
  model: true,
  children: [
    { text: '轮播图', name: 'carousel' },
    { text: '优惠券', name: 'coupon' },
    { text: '团   购', name: 'promotion' },
    { text: '支付网关', name: 'gateway' },
    { text: '团购奖品', name: 'promotion_award' },
    { text: '关于我们', name: 'about_us' },
    { text: '用户反馈', name: 'feedback' },
  ],
}
const finance = {
  icon: 'mdi-chevron-up',
  'icon-alt': 'mdi-chevron-down',
  text: '财务管理',
  prependIcon: 'mdi-finance',
  model: true,
  children: [
    { text: '充值管理', name: 'top_up_record' },
    { text: '充值设置', name: 'top_up_amount' },
    { text: '提现记录', name: 'withdraw' },
    { text: '退款管理', name: 'refund' },
  ],
}

/** Config Store */
export default defineStore('menu', {
  // Default Config State
  state: () => ({
    menuItems: [dashboard, user, shop, order, finance, content],
    contentEditorMenu: [
      {
        icon: 'mdi-chevron-up',
        'icon-alt': 'mdi-chevron-down',
        text: '商品管理',
        model: true,
        children: [
          { text: '商品分类', name: 'product_category' },
          { text: '商品管理', name: 'product_list' },
        ],
      },
    ],
  }),
  // Getters
  getters: {
    getMenuItems: (state) => state.menuItems,
    getContentEditorMenu: (state) => state.contentEditorMenu,
  },
})
