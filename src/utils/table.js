import {trim} from "lodash/string";
import moment from "moment";

export const roleLabel = (value) => {
  if (trim(value) === 'admin') {
    return '管理员'
  } else if (trim(value) === 'general') {
    return '普通用户'
  } else if (trim(value) === 'normal') {
    return '普通用户'
  } else {
    return 'unknow'
  }
}


export const sale = (isSale) => {
  if (isSale === '0') {
    return '否'
  } else if (isSale === '1') {
    return '是'
  }
}
export const datetime = (value) => {
  return moment(value).format('YYYY-MM-DD HH:mm:ss')
}

export const saleLabel = (value) => {
  return value ? '是' : '否'
}
export const saleColor = (isSale) => {
  if (isSale === '0' || isSale === 0) {
    return 'error'
  } else if (isSale === '1' || isSale === 1) {
    return 'success'
  }
}
export const isActivityLabel = (isSale) => {
  if (isSale === 0) {
    return '否'
  } else if (isSale === 1) {
    return '是'
  }
}
export const isActivityColor = (isSale) => {
  if (isSale === 0) {
    return 'error'
  } else if (isSale === 1) {
    return 'success'
  }
}
export const getColor = (calories) => {
  if (calories > 400) return 'red'
  else if (calories > 200) return 'orange'
  else return 'green'
}

export default {roleLabel}
