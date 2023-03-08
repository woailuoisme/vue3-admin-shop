import { trim } from 'lodash/string'
import { format } from 'date-fns'

export const roleLabel = value => {
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

export const sale = isSale => {
  if (isSale === '0') {
    return '否'
  } else if (isSale === '1') {
    return '是'
  }
}
export const datetime = value => {
  return format(value, 'yyyy-MM-DD HH:mm:ss')
}

export const saleLabel = value => {
  return value ? '是' : '否'
}
export const saleColor = isSale => {
  if (isSale === '0' || isSale === 0) {
    return 'error'
  } else if (isSale === '1' || isSale === 1) {
    return 'success'
  }
}
export const isActivityLabel = isSale => {
  if (isSale === 0) {
    return '否'
  } else if (isSale === 1) {
    return '是'
  }
}
export const isActivityColor = isSale => {
  if (isSale === 0) {
    return 'error'
  } else if (isSale === 1) {
    return 'success'
  }
}
export const getColor = calories => {
  if (calories > 400) return 'red'
  else if (calories > 200) return 'orange'
  else return 'green'
}

export const orderStatusLabel = value => {
  if (value === 'pending') {
    return '未支付'
  } else if (value === 'paid') {
    return '已支付'
  } else if (value === 'pending_finished') {
    return '待完成'
  } else if (value === 'pending_review') {
    return '待评论'
  } else if (value === 'express') {
    return '运输中'
  } else if (value === 'finished') {
    return '已完成'
  } else if (value === 'canceled') {
    return '已取消'
  }
}
export const orderStatus = [
  { label: '未支付', value: 'pending' },
  { label: '已支付', value: 'paid' },
  { label: '待完成', value: 'pending_finished' },
  { label: '待评论', value: 'pending_review' },
  { label: '运输中', value: 'finished' },
  { label: '已完成', value: 'finished' },
  { label: '已取消', value: 'canceled' },
  { label: '全部', value: 'all' },
]

export function orderShowExpress(value) {
  if (value === 'pending') {
    return false
  } else if (value === 'paid') {
    return true
  } else if (value === 'pending_finished') {
    return false
  } else if (value === 'pending_review') {
    return true
  } else if (value === 'express') {
    return true
  } else if (value === 'finished') {
    return false
  } else if (value === 'canceled') {
    return false
  } else {
    return false
  }
}

export default { roleLabel }
