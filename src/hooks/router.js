import { useRouter } from "vue-router"
import globalRouter from "@/router"

/**
 * 路由跳转
 * @param inSetup - 是否在vue页面/组件的setup里面调用，在axios里面无法使用useRouter和useRoute
 */
export function useRouterPush(inSetup = true) {
  const router = inSetup ? useRouter() : globalRouter
  const route = globalRouter.currentRoute

  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param newTab - 是否在新的浏览器Tab标签打开
   */
  function routerPush(to, newTab = false) {
    if (newTab) {
      const routerData = router.resolve(to)
      window.open(routerData.href, "_blank")
    } else {
      router.push(to)
    }
  }

  /** 返回上一级路由 */
  function routerBack() {
    router.go(-1)
  }

  /**
   * 跳转首页
   * @param newTab - 在新的浏览器标签打开
   */
  function toHome(newTab = false) {
    routerPush({ name: "root" }, newTab)
  }

  function toLogin(loginModule, redirectUrl) {
    const module = loginModule === "login" || loginModule === "sign-in"
    const routeLocation = {
      name: "login",
      params: { module },
    }
    const redirect = redirectUrl || route.value.fullPath
    Object.assign(routeLocation, { query: { redirect } })
    routerPush(routeLocation)
  }

  function toLoginModule(module) {
    const { query } = route.value
    routerPush({ name: "login", params: { module }, query })
  }

  function toLoginRedirect() {
    const { query } = route.value
    if (query?.redirect) {
      routerPush(query.redirect)
    } else {
      toHome()
    }
  }

  return {
    routerPush,
    routerBack,
    toHome,
    toLogin,
    toLoginModule,
    toLoginRedirect,
  }
}
