export const flatten = (routes) => {
  return routes.reduce((acc, r) => {
    if (r.children && r.children.length) {
      acc = acc.concat(flatten(r.children))
    } else {
      if (r.component) {
        acc.push(r)
      }
    }
    return acc
  }, [])
}
