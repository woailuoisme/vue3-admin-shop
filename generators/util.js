const pluralize = require('pluralize')

exports.camelCase=(str)=> {
  return str.replace(/[_.-](\w|$)/g, function (_, x) {
    return x.toUpperCase()
  })
}

exports.camelize = (str) => {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

exports.pascale = (text) => {
  // _.upperFirst(_.camelCase('double-barrel'))
  return text
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return word.toUpperCase()
    })
    .replace(/\s+/g, '')
}

exports.camelToSnake = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
exports.camelToDot = (str) => str.replace(/[A-Z]/g, (letter) => `.${letter.toLowerCase()}`)
exports.camelToKebab = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

exports.plural = (value) => {
  return pluralize(value)
}

exports.replaceAll = (str, mapObj) => {
  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi')

  return str.replace(re, function (matched) {
    return mapObj[matched.toLowerCase()]
  })
}


