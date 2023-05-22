import { humanReadableFileSize } from "vuetify/lib/util/helpers"

export const canUsed = function (data) {
  return typeof data !== "undefined" && data !== null && !!data
}

const formatDate = (dt) => {
  if (typeof dt?.getMonth !== "function") {
    return false
  }
  const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr)
  return `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(
    dt.getSeconds(),
  )}`
}

const randomElement = (arr = []) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

const kebab = (str) => {
  return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

const bytes = (byte) => {
  return humanReadableFileSize(byte)
}

function formatTimeDiff(diff) {
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  const secondsRemainder = seconds % 60
  const minutesRemainder = minutes % 60

  const hourStr = hours > 0 ? `${hours}小时` : ""
  const minuteStr = minutesRemainder > 0 ? `${minutesRemainder}分钟` : ""
  const secondStr = secondsRemainder > 0 ? `${secondsRemainder}秒` : ""

  return `${hourStr}${minuteStr}${secondStr}`
}

function timeDiff(start, end) {
  const diff = new Date(end) - new Date(start)
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${days} year${days > 1 ? "s" : ""} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else {
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`
  }
}

function timeAgo(time) {}

export const bytesToSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
  if (bytes === 0) return "0 Bytes"
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i]
}

/**
 *  generate uuid
 * @returns {string|*}
 */
export const uuid = () => {
  if (typeof crypto === "object") {
    if (typeof crypto.randomUUID === "function") {
      return crypto.randomUUID()
    }
    if (typeof crypto.getRandomValues === "function" && typeof Uint8Array === "function") {
      const callback = (c) => {
        const num = Number(c)
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16)
      }
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, callback)
    }
  }
  let timestamp = new Date().getTime()
  let perforNow = (typeof performance !== "undefined" && performance.now && performance.now() * 1000) || 0
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    let random = Math.random() * 16
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0
      timestamp = Math.floor(timestamp / 16)
    } else {
      random = (perforNow + random) % 16 | 0
      perforNow = Math.floor(perforNow / 16)
    }
    return (c === "x" ? random : (random & 0x3) | 0x8).toString(16)
  })
}

/**
 * convert file to a base64 url
 * @param file
 * @returns {Promise<unknown>}
 */
export const readURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = (e) => reject(e)
    reader.readAsDataURL(file)
  })
}

export const imageWidthAndHeight = (provideFile) => {
  // take the given file (which should be an image) and return the width and height
  const imgDimensions = { width: null, height: null }

  return new Promise((resolve) => {
    const reader = new FileReader()

    reader.readAsDataURL(provideFile)
    reader.onload = function () {
      const img = new Image()
      img.src = reader.result

      img.onload = function () {
        imgDimensions.width = img.width
        imgDimensions.height = img.height

        resolve(imgDimensions)
      }
    }
  })
}

export async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    // alert('Copied');
  } catch ($e) {
    // alert('Cannot toCopy');
  }
}

export function debounce(fn, wait) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer) // clear any pre-existing timer
    }
    const context = this // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args) // call the function if time expires
    }, wait)
  }
}

export function throttle(fn, wait) {
  let throttled = false
  return function (...args) {
    if (!throttled) {
      fn.apply(this, args)
      throttled = true
      setTimeout(() => {
        throttled = false
      }, wait)
    }
  }
}

/**
 * Convert Hex color to rgb
 * @param hex
 */
export const hexToRgb = (hex) => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (m, r, g, b) => {
    return r + r + g + g + b + b
  })
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null
}
