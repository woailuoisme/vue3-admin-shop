import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/admin/AdminDashboard.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/admin/AdminDashboard.vue'),
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/login.vue'),
  },

  {
    path: '/drag',
    name: '/drag',
    component: () => import('@/components/shared/DragSorted.vue'),
  },
  {
    path: '/404',
    name: 'not_found',
    component: () => import('@/views/errors/NotFound.vue'),
  },

  {
    path: '/403',
    name: 'forbidden',
    component: () => import('@/views/errors/Forbidden.vue'),
  },

  {
    path: '/500',
    name: 'server_error',
    component: () => import('@/views/errors/ServerError.vue'),
  },
  {
    path: '/user/frontend',
    name: 'user_frontend',
    component: () => import('@/views/admin/AdminUserFront.vue'),
  },

  {
    path: '/user/backend',
    name: 'user_backend',
    component: () => import('@/views/admin/AdminUser.vue'),
  },

  {
    path: '/product/list',
    name: 'product_list',
    component: () => import('@/views/admin/AdminProduct.vue'),
  },

  {
    path: '/product/form',
    name: 'product_test',
    component: () => import('@/views/components/adminProduct/DialogEntityForm'),
  },

  {
    path: '/product/category',
    name: 'product_category',
    component: () => import('@/views/admin/AdminProductCategory.vue'),
  },

  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/admin/AdminOrder.vue'),
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('@/views/admin/AdminWithdraw.vue'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/admin/AdminFeedback.vue'),
  },

  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('@/views/admin/AdminCoupon.vue'),
  },
  {
    path: '/promotion',
    name: 'promotion',
    component: () => import('@/views/admin/AdminPromotion.vue'),
  },
  {
    path: '/promotion_award',
    name: 'promotion_award',
    component: () => import('@/views/admin/AdminPromotionAward.vue'),
  },
  {
    path: '/refund',
    name: 'refund',
    component: () => import('@/views/admin/AdminRefund.vue'),
  },
  {
    path: '/top_up_amount',
    name: 'top_up_amount',
    component: () => import('@/views/admin/AdminTopUpAmount.vue'),
  },
  {
    path: '/top_up_record',
    name: 'top_up_record',
    component: () => import('@/views/admin/AdminTopUpRecord.vue'),
  },
  {
    path: '/carousel',
    name: 'carousel',
    component: () => import('@/views/admin/AdminCarousel.vue'),
  },
  {
    path: '/about_us',
    name: 'about_us',
    component: () => import('@/views/admin/AdminAboutUs.vue'),
  },
  {
    path: '/gateway',
    name: 'gateway',
    component: () => import('@/views/admin/AdminGateway.vue'),
  },

  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/FormVue.vue'),
  },
  //###//
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// router.beforeEach(async (to) => {
//   // clear alert on route change
//   const alertStore = useAlertStore();
//   alertStore.clear();
//
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/account/login', '/account/register'];
//   const authRequired = !publicPages.includes(to.path);
//   const authStore = useAuthStore();
//
//   if (authRequired && !authStore.user) {
//     authStore.returnUrl = to.fullPath;
//     return '/account/login';
//   }
// });

// router.beforeEach((to, from, next) => {
//   let user = window.localStorage.getItem('user')
//   // console.log(user)
//   if (to.name !== 'login' && !user) next({name: 'login'})
//   else {
//     next()
//   }
// })

export default router
