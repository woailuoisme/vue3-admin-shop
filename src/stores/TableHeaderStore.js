import {defineStore} from 'pinia';
export default defineStore('table-header', {
  state: () => ({
    users: [
      {text: "ID", value: "id"},
      {text: "昵称", value: "name", sortable: true},
      {text: "头像", value: "avatar",},
      {text: "积分", value: "integer"},
      {text: "抽奖次数", value: "lottery_count"},
      {text: "启用每天抽奖", value: "is_active_lottery"},
      {text: "注册时间", value: "created_at",},
    ],
    adminUsers: [
      {text: "ID", value: "id"},
      {text: "名称", value: "name", sortable: true},
      {text: "头像", value: "avatar",},
      {text: "角色", value: "role"},
      {text: "注册时间", value: "created_at",},
      {text: "操作", value: "operation"},
    ],
    products: [
      {text: "ID", value: "id"},
      {text: "类别", value: "category.second_name"},
      {text: "缩略图", value: "thumbnail",},
      {text: "描述", value: "description"},
      {text: "创建时间", value: "created_at",},
      {text: "是否销售", value: "is_sale",},
      {text: "操作", value: "operation"},
    ],
    productCategories: [
      {text: "ID", value: "id"},
      {text: "名称", value: "name"},
      {text: "缩略图", value: "image",},
      {text: "排序", value: "order"},
      {text: "创建时间", value: "created_at",},
      {text: "操作", value: "operation"},
    ],
    orders: [
      {text: "订单编号", value: "order_num"},
      {text: "订单状态", value: "order_status"},
      {text: "姓名", value: "user_name",},
      {text: "订单金额", value: "amount"},
      {text: "创建时间", value: "created_at",},
      {text: "操作", value: "operation"},
    ],
    feedback: [
      {text: "反馈人", value: "nickname"},
      {text: "内容", value: "content"},
      {text: "创建时间", value: "created_at"},
      {text: "操作", value: "operation"},
    ]
  }),
  // Getters
  getters: {
    adminUserHeader(state) {
      return state.adminUsers
    },
    productHeader(state) {
      return state.products
    },
  },

});
