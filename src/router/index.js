import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores'
import { routers } from './routers'
//fix dev prod server nginx uri /admin rewrite
const base = import.meta.env.MODE === 'dev' || import.meta.env.MODE === 'prod' ? '/admin' : import.meta.env.BASE_URL
const router = createRouter({
  history: createWebHistory(base),
  routes: routers,
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuth()
  const title = to.meta?.title
  // If the route has a title, set it as the page title of the document/page
  if (title) document.title = title
  if (authRequired && !authStore.isAuthed) next({ name: 'login' })
  else {
    next()
  }
})

export default router
