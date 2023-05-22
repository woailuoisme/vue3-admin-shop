import pluralize from "pluralize"
import {trim} from "lodash-es";

export const camelCase = (str) => {
    return str.replace(/[_.-](\w|$)/g, function (_, x) {
        return x.toUpperCase()
    })
}

export const pascalCase = (text) => {
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

export const dotCase = (str) => {
    if (!str) return '';
    return String(str)
        .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '')
        .replace(/([a-z])([A-Z])/g, (m, a, b) => a + '_' + b.toLowerCase())
        .replace(/[^A-Za-z0-9]+|_+/g, '.')
        .toLowerCase();
}

export const replaceAll = (str, mapObj) => {
    const re = new RegExp(Object.keys(mapObj).join("|"), "gi")

    return str.replace(re, function (matched) {
        return mapObj[matched.toLowerCase()]
    })
}

export const useNameCase = (model) => {

    const newModel = trim(model)
    const camelName = camelCase(newModel)
    const pascalName = pascalCase(camelName)
    const dotName = dotCase(camelName)
    const pluralCamelName = plural(camelName)
    const pluralPascalName = plural(pascalName)
    const kebabName = camelToKebab(camelName)
    const snakeName = camelToSnake(camelName)
    console.log(newModel, camelName, pascalName, pluralCamelName, pluralPascalName, kebabName, dotName, snakeName)
    return {
        camelName,
        pascalName,
        pluralCamelName,
        pluralPascalName,
        kebabName,
        dotName,
        snakeName
    }
}