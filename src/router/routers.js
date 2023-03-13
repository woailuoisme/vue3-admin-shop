import { errorModule } from './errorRouters'
import { menuModule } from './menuRouters'

const personModule = [
  {
    path: '/person',
    name: 'profile',
    children: [
      {
        path: '/profile',
        name: 'person_profile',
        component: () => import('@/views/UserProfilePage.vue'),
      },
    ],
  },
]

const testModule = [
  {
    path: '/drag',
    name: '/drag',
    component: () => import('@/components/shared/DragSorted.vue'),
  },
  // {
  //   path: '/product/form',
  //   name: 'product_test',
  //   component: () => import('@/views/components/adminProduct/DialogEntityForm'),
  // },
  {
    path: '/form',
    name: 'form',
    component: () => import('@/views/FormVuePage.vue'),
  },
]

export const routers = [...personModule, ...errorModule, ...menuModule, ...testModule]
