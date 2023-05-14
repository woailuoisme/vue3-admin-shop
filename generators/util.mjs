import pluralize from "pluralize";

export const camelCase = (str) => {
    return str.replace(/[_.-](\w|$)/g, function (_, x) {
        return x.toUpperCase()
    })
}

export const camelize = (str) => {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, "")
}

export const pascale = (text) => {
    // _.upperFirst(_.camelCase('double-barrel'))
    return text
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return word.toUpperCase()
        })
        .replace(/\s+/g, "")
}

export const camelToSnake = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
export const camelToDot = (str) => str.replace(/[A-Z]/g, (letter) => `.${letter.toLowerCase()}`)
export const camelToKebab = (str) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

export const plural = (value) => {
    return pluralize(value)
}

export const replaceAll = (str, mapObj) => {
    const re = new RegExp(Object.keys(mapObj).join("|"), "gi")

    return str.replace(re, function (matched) {
        return mapObj[matched.toLowerCase()]
    })
}
