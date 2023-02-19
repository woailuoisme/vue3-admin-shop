// import { format } from 'date-fns'
import {humanReadableFileSize} from 'vuetify/lib/util/helpers'

export const canUsed = function (data) {
  return typeof data !== 'undefined' && data !== null && !!data
}

// const formatDate = (d, dateFormat = 'MM/dd/yyyy') => {
//   return format(d, dateFormat)
// }

const formatDate = (dt) => {
  if (typeof dt?.getMonth !== 'function') {
    return false
  }
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr)
  return `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())}`
}

const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const kebab = (str) => {
  return (str || '').replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

const bytes = (byte) => {
  return humanReadableFileSize(byte)
}


export default {canUsed, formatDate, randomElement, kebab, bytes}
