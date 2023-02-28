// import { format } from 'date-fns'
import { humanReadableFileSize } from 'vuetify/lib/util/helpers'
import { isPast, parseISO } from 'date-fns'

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
  return `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(
    dt.getSeconds()
  )}`
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

/**
 *  generate uuid
 * @returns {string|*}
 */
export const uuid = () => {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      const callback = (c) => {
        const num = Number(c)
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16)
      }
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, callback)
    }
  }
  let timestamp = new Date().getTime()
  let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0
      timestamp = Math.floor(timestamp / 16)
    } else {
      random = (perforNow + random) % 16 | 0
      perforNow = Math.floor(perforNow / 16)
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16)
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

// Checks if tokenExpiration in localstorage date is past, if so then trigger an update
export const checkIfTokenNeedsRefresh = () => {
  // Checks if time set in localstorage is past to check for refresh token
  if (window.localStorage.getItem('token') !== null && window.localStorage.getItem('tokenExpiration') !== null) {
    if (isPast(new Date(parseISO(JSON.parse(window.localStorage.getItem('tokenExpiration'))) * 1000))) {
      // store.dispatch('refreshToken')
    }
  }
}

export const buildPayloadPagination = (pagination, search) => {
  const { page, itemsPerPage } = pagination
  let { sortDesc, sortBy } = pagination

  // When sorting you always get both values
  if (sortBy.length === 1 && sortDesc.length === 1) {
    // Gets order
    sortDesc = sortDesc[0] === true ? -1 : 1
    // Gets column to sort on
    sortBy = sortBy ? sortBy[0] : ''
  }

  let query = {}

  // If search and fields are defined
  if (search) {
    query = {
      sort: sortBy,
      order: sortDesc,
      page,
      limit: itemsPerPage,
      filter: search.query,
      fields: search.fields,
    }
  } else {
    // Pagination with no filters
    query = {
      sort: sortBy,
      order: sortDesc,
      page,
      limit: itemsPerPage,
    }
  }
  return query
}

// function camelize(str) {
//   return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
//     return index === 0 ? word.toLowerCase() : word.toUpperCase();
//   }).replace(/\s+/g, '');
// }

/**
 *
 * hyphen -     kebab-case
 * underscore _  snake_case
 * period .
 * space
 * no space      amelCase
 * @returns {string}
 * @param str
 */
export const camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

// camelize("EquipmentClass name");
// camelize("Equipment className");
// camelize("equipment class name");
// camelize("Equipment Class Name");
// all output "equipmentClassName"
export const pascale = (text) => {
  // _.upperFirst(_.camelCase('double-barrel'))
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return word.toUpperCase()
    })
    .replace(/\s+/g, '')
}
/**
 *
 * @param str
 * @param symbol
 * @returns {*}
 */
export const nameConvert = (str, symbol = '_') => {
  return (
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((s) => s.toLowerCase())
      .join(symbol)
  )
}
// console.log(nameConvert('GeeksForGeeks'));
// console.log(nameConvert('Welcome to GeeksForGeeks'));
// console.log(nameConvert('Welcome-to-GeeksForGeeks'));
// console.log(nameConvert('Welcome_to_GeeksForGeeks'));
// console.log(nameConvert('geeks-Fo--Geeks'));

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    // alert('Copied');
  } catch ($e) {
    // alert('Cannot copy');
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
 * Return nav link props to use
 * @param {Object, String} item navigation routeName or route Object provided in navigation data
 */
// export const getComputedNavLinkToProp = computed(() => (link) => {
//   const props = {
//     target: link.target,
//     rel: link.rel,
//   }
//   // If route is string => it assumes string is route name => Create route object from route name
//   // If route is not string => It assumes it's route object => returns passed route object
//   if (link.to) props.to = typeof link.to === 'string' ? { name: link.to } : link.to
//   else props.href = link.href
//
//   return props
// })

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

export default {
  canUsed,
  formatDate,
  randomElement,
  kebab,
  bytes,
  uuid,
  readURL,
  imageWidthAndHeight,
  camelize,
  pascale,
  nameConvert,
  debounce,
  throttle,
}
