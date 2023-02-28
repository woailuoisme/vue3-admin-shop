// import validate from "validate.js";
// import isEmail from 'validator/lib/isEmail'

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

// let email = (propertyType) => {
//   return (v) => isEmail(v) || `${propertyType} 必须是正确的email格式`
// }

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
}
