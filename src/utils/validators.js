// import validate from "validate.js";
import isEmail from 'validator/lib/isEmail'

let required = (propertyType) => {
  return (v) => !!v || `必须输入 ${propertyType}`
}

let moreThan = (propertyType, max) => {
  return (value) => {
    return value >= max || `${propertyType} 必须大于等于${max}`
  }
}

let lessThan = (propertyType, min) => {
  return (value) => {
    return value <= min || `${propertyType} 必须小于等于${min}`
  }
}

let isNumber = (propertyType) => {
  return (v) => (typeof v === 'number' && !isNaN(v)) || `${propertyType} 必须是数字`
}

let email = (propertyType) => {
  return (v) => isEmail(v) || `${propertyType} 必须是正确的email格式`
}

let isInteger = (propertyType) => {
  return (value) => {
    return (typeof value === 'number' && !isNaN(value) && value % 1 === 0) || `${propertyType} 必须是整数`
  }
}

let moreThanLength = (propertyType, minLength) => {
  return (v) => (v && v.length >= minLength) || `${propertyType} 必须大于 ${minLength} 字符`
}

let lessThanLength = (propertyType, maxLength) => {
  return (v) => (v && v.length <= maxLength) || `${propertyType} 必须少于 ${maxLength} 字符`
}

let emailFormat = () => {
  /* eslint-disable no-useless-escape */
  let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
  return (v) => (v && regex.test(v)) || '必须是有效的 E-mail'
}

// let file = files => !files || !files.some(file => file.size > 2e6) || 'Avatar size should be less than 2 MB!';
let image = (propertyType) => {
  return (files) => !files || !files.some((file) => file.size > 2e6) || `${propertyType} 文件大小2MB!`
}

let fileSize = () => {
  return (v) => v.size < 2 * 1024 * 1024 || '文件大小必须小于2m'
}

let imageType = () => {
  return (v) => v.type.indexOf(['image/jpeg', 'image/jpg', 'image/png']) !== -1 || '文件类型需是jpeg,jpg,png'
}

let comparedPwd = (first) => {
  return (v) => v === first || '两次密码不一致'
}

// let v = validate;
// const vl = {
//     isNumber: function (value) {
//         return typeof value === 'number' && !isNaN(value);
//     },
//
// // Returns false if the object is not a function
//     isFunction: function (value) {
//         return typeof value === 'function';
//     },
//
// // A simple check to verify that the value is an integer. Uses `isNumber`
// // and a simple modulo check.
//     isInteger: function (value) {
//         return v.isNumber(value) && value % 1 === 0;
//     },
//
// // Checks if the value is a boolean
//     isBoolean: function (value) {
//         return typeof value === 'boolean';
//     },
//
// // Uses the `Object` function to check if the given argument is an object.
//     isObject: function (obj) {
//         return obj === Object(obj);
//     },
//
// // Simply checks if the object is an instance of a date
//     isDate: function (obj) {
//         return obj instanceof Date;
//     },
//
// // Returns false if the object is `null` of `undefined`
//     isDefined: function (obj) {
//         return obj !== null && obj !== undefined;
//     },
//
// // Checks if the given argument is a promise. Anything with a `then`
// // function is considered a promise.
//     isPromise: function (p) {
//         return !!p && v.isFunction(p.then);
//     },
// }

export default {
  required,
  lessThanLength,
  image,
  moreThanLength,
  lessThan,
  moreThan,
  emailFormat,
  comparedPwd,
  fileSize,
  imageType,
  isInteger,
  isNumber,
  email,
}
