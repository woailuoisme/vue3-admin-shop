export function isObject(val) {
  return val != null && typeof val === "object" && Array.isArray(val) === false
}

export function isString(val) {
  return typeof val === "string" || val instanceof String
}

export function isArray(val) {
  return Array.isArray(val)
}
