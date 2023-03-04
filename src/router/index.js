import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores'

const routes = [
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  },
  {
    path: '/',
    name: 'home',
    meta: { title: 'Home :: ' },
    component: () => import('@/views/auth/login.vue'),
  },
  {
    path: '/404',
    name: 'not_found',
    component: () => import('@/views/errors/NotFound.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/UserProfile.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
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
    component: () => import('@/views/UserFront.vue'),
  },

  {
    path: '/user/backend',
    name: 'user_backend',
    component: () => import('@/views/User.vue'),
  },

  {
    path: '/product/list',
    name: 'product_list',
    component: () => import('@/views/Product.vue'),
  },

  // {
  //   path: '/product/form',
  //   name: 'product_test',
  //   component: () => import('@/views/components/adminProduct/DialogEntityForm'),
  // },

  {
    path: '/product/category',
    name: 'product_category',
    component: () => import('@/views/ProductCategory.vue'),
  },

  {
    path: '/order',
    name: 'order',
    component: () => import('@/views/Order.vue'),
  },
  {
    path: '/withdraw',
    name: 'withdraw',
    component: () => import('@/views/Withdraw.vue'),
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('@/views/Feedback.vue'),
  },

  {
    path: '/coupon',
    name: 'coupon',
    component: () => import('@/views/Coupon.vue'),
  },
  {
    path: '/promotion',
    name: 'promotion',
    component: () => import('@/views/Promotion.vue'),
  },
  {
    path: '/promotion_award',
    name: 'promotion_award',
    component: () => import('@/views/PromotionAward.vue'),
  },
  {
    path: '/refund',
    name: 'refund',
    component: () => import('@/views/Refund.vue'),
  },
  {
    path: '/top_up_amount',
    name: 'top_up_amount',
    component: () => import('@/views/TopUpAmount.vue'),
  },
  {
    path: '/top_up_record',
    name: 'top_up_record',
    component: () => import('@/views/TopUpRecord.vue'),
  },
  {
    path: '/carousel',
    name: 'carousel',
    component: () => import('@/views/Carousel.vue'),
  },
  {
    path: '/carousel_new',
    name: 'carousel_new',
    component: () => import('@/views/CarouselNew.vue'),
  },
  {
    path: '/about_us',
    name: 'about_us',
    component: () => import('@/views/AboutUs.vue'),
  },
  {
    path: '/gateway',
    name: 'gateway',
    component: () => import('@/views/Gateway.vue'),
  },

  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/FormVue.vue'),
  },
]
//fix dev prod server nginx uri /admin rewrite
const base = import.meta.env.MODE === 'dev' || import.meta.env.MODE === 'prod' ? '/admin' : import.meta.env.BASE_URL
const router = createRouter({
  history: createWebHistory(base),
  routes,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuth()
  const title = to.meta.title
  // If the route has a title, set it as the page title of the document/page
  if (title) document.title = title
  if (authRequired && !authStore.isAuthed) next({ name: 'login' })
  else {
    next()
  }
})

export default router
