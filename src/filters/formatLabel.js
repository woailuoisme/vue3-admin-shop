import { humanReadableFileSize } from "vuetify/lib/util/helpers"
import { format, isPast, parseISO } from "date-fns"
import { trim } from "lodash-es"

const kebab = (str) => {
  return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

const bytes = (byte) => {
  return humanReadableFileSize(byte)
}

export const roleLabel = (value) => {
  if (trim(value) === "admin") {
    return "管理员"
  } else if (trim(value) === "general") {
    return "普通用户"
  } else if (trim(value) === "normal") {
    return "普通用户"
  } else {
    return "unknow"
  }
}

export const datetime = (value) => {
  return format(value, "yyyy-MM-DD HH:mm:ss")
}

export const saleLabel = (value) => {
  return value ? "是" : "否"
}
export const saleColor = (isSale) => {
  if (isSale === "0" || isSale === 0) {
    return "error"
  } else if (isSale === "1" || isSale === 1) {
    return "success"
  }
}
export const isActivityLabel = (isSale) => {
  if (isSale === 0) {
    return "否"
  } else if (isSale === 1) {
    return "是"
  }
}
export const isActivityColor = (isSale) => {
  if (isSale === 0) {
    return "error"
  } else if (isSale === 1) {
    return "success"
  }
}

export const getColor = (calories) => {
  if (calories > 400) return "red"
  else if (calories > 200) return "orange"
  else return "green"
}

export const orderStatusLabel = (value) => {
  if (value === "pending") {
    return "未支付"
  } else if (value === "paid") {
    return "已支付"
  } else if (value === "pending_finished") {
    return "待完成"
  } else if (value === "pending_review") {
    return "待评论"
  } else if (value === "express") {
    return "运输中"
  } else if (value === "finished") {
    return "已完成"
  } else if (value === "canceled") {
    return "已取消"
  } else if (value === '"refunded"') {
    return "已退款"
  }
}

export function orderShowExpress(value) {
  if (value === "pending") {
    return false
  } else if (value === "paid") {
    return true
  } else if (value === "pending_finished") {
    return false
  } else if (value === "pending_review") {
    return true
  } else if (value === "express") {
    return true
  } else if (value === "finished") {
    return false
  } else if (value === "canceled") {
    return false
  } else {
    return false
  }
}

export default {
  orderStatusLabel,
  orderShowExpress,
  isActivityLabel,
  isActivityColor,
  saleColor,
  saleLabel,
}
