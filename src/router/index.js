import { createRouter, createWebHistory } from "vue-router"
import { useAuth } from "@/stores"
import { routers } from "./routers"
import { startProgress, endProgress } from "@/utils"

//fix dev prod server nginx uri /admin rewrite
const base = import.meta.env.MODE === "dev" || import.meta.env.MODE === "prod" ? "/admin" : import.meta.env.BASE_URL
const router = createRouter({
  history: createWebHistory(base),
  routes: routers,
})

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"]
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuth()
  const title = to.meta?.title ?? import.meta.env.VITE_APP_TITLE
  // If the route has a title, set it as the page title of the document/page
  if (title) document.title = title
  if (authRequired && !authStore.isAuthed) next({ name: "login" })
  else {
    next()
  }
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    startProgress()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  endProgress()
})

// const toDepth = to.path.split('/').length
// const fromDepth = from.path.split('/').length
// this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'

export default router
