import Pluralize from 'pluralize'

export function camelCase(str) {
  return str.replace(/[_.-](\w|$)/g, function (_, x) {
    return x.toUpperCase()
  })
}

export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

export function pascal(string) {
  return `${string}`
    .toLowerCase()
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(new RegExp(/\s+(.)(\w*)/, 'g'), ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
    .replace(new RegExp(/\w/), s => s.toUpperCase())
}

export const camelToSnake = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
export const camelToDot = str => str.replace(/[A-Z]/g, letter => `.${letter.toLowerCase()}`)
export const camelToKebab = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

export function plural(value) {
  return Pluralize(value)
}

export function replaceAll(str, mapObj) {
  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi')

  return str.replace(re, function (matched) {
    return mapObj[matched.toLowerCase()]
  })
}

export const pascale = text => {
  // _.upperFirst(_.camelCase('double-barrel'))
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return word.toUpperCase()
    })
    .replace(/\s+/g, '')
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
