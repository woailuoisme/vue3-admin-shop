export function filterAuthRoutesByUserPermission(routes, permission) {
  return routes.map(route => filterAuthRouteByUserPermission(route, permission)).flat(1)
}

function filterAuthRouteByUserPermission(route, permission) {
  const filterRoute = { ...route }
  const hasPermission = !route.meta.permissions || permission === 'admin' || route.meta.permissions.includes(permission)

  if (filterRoute.children) {
    const filterChildren = filterRoute.children.map(item => filterAuthRouteByUserPermission(item, permission)).flat(1)
    Object.assign(filterRoute, { children: filterChildren })
  }
  return hasPermission ? [filterRoute] : []
}

/**
 * 获取所有固定路由的名称集合
 * @param routes - 固定路由
 */
export function getConstantRouteNames(routes) {
  return routes.map(route => getConstantRouteName(route)).flat(1)
}

/**
 * 获取所有固定路由的名称集合
 * @param route - 固定路由
 */
function getConstantRouteName(route) {
  const names = [route.name]
  if (route.children.length) {
    names.push(...route.children.map(item => getConstantRouteName(item)).flat(1))
  }
  return names
}

/**
 * 权限路由排序
 * @param routes - 权限路由
 */
export function sortRoutes(routes) {
  return routes
    .sort((next, pre) => {
      return Number(next.meta?.order) - Number(pre.meta?.order)
    })
    .map(i => {
      if (i.children) sortRoutes(i.children)
      return i
    })
}

/**
 * 处理全部导入的路由模块
 * @param modules - 路由模块
 */
export function handleModuleRoutes(modules) {
  const routes = []

  Object.keys(modules).forEach(key => {
    const item = modules[key].default
    if (item) {
      routes.push(item)
    } else {
      window.console.error(`路由模块解析出错: key = ${key}`)
    }
  })

  return sortRoutes(routes)
}

/**
 * 获取缓存的路由对应组件的名称
 * @param routes - 转换后的vue路由
 */
export function getCacheRoutes(routes) {
  const cacheNames = []
  routes.forEach(route => {
    // 只需要获取二级路由的缓存的组件名
    if (hasChildren(route)) {
      route.children.forEach(item => {
        if (isKeepAlive(item)) {
          cacheNames.push(item.name)
        }
      })
    }
  })
  return cacheNames
}

/**
 * 路由是否缓存
 * @param route
 */
function isKeepAlive(route) {
  return Boolean(route?.meta?.keepAlive)
}
/**
 * 是否有二级路由
 * @param route
 */
function hasChildren(route) {
  return Boolean(route.children && route.children.length)
}
