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
  return new Promise((res, rej) => {
    const reader = new FileReader()
    reader.onload = (e) => res(e.target.result)
    reader.onerror = (e) => rej(e)
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

export default { canUsed, formatDate, randomElement, kebab, bytes, uuid, readURL, imageWidthAndHeight }
