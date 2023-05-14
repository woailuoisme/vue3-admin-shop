import * as yup from "yup"

const typeStr = (val) => {
  if (val === "number") return "数字"
  if (val === "boolean") return "布尔"
  if (val === "string") return "字符"
  if (val === "date") return "时间"
  if (val === "array") return "数组"
  if (val === "object") return "对象"
  return val
}

yup.setLocale({
  mixed: {
    default: "${path}无效",
    required: "${path}是必填项",
    oneOf: "${path}必须是以下值之一：${values}",
    notOneOf: "${path}不能是以下值之一：${values}",
    // notType: ({ path, type, value, originalValue }) => {
    //   const castMsg = originalValue != null && originalValue !== value ? ` (从 \`${printValue(originalValue, true)}\` 转换).` : '.'
    //   return type !== 'mixed'
    //     ? `${path} 必须是 \`${typeStr(type)}\` 类型，` + ` 但最终值为： \`${printValue(value, true)}\`` + castMsg
    //     : `${path} 必须匹配配置的类型。 ` + `验证值是： \`${printValue(value, true)}\`` + castMsg
    // },
    notType: ({ path, type, value, originalValue }) => {
      return type !== "mixed" ? `${path} 必须是 \`${typeStr(type)}\` 类型` : `${path} 必须是匹配的类型`
    },
  },
  string: {
    length: "${path}必须是${length}个字符",
    min: "${path}不能少于${min}个字符",
    max: "${path}不能超过${max}个字符",
    email: "${path}必须是一个有效的电子邮件地址",
    matches: '${path} 必须匹配 "${regex}"',
    url: "${path}必须是一个有效的URL",
    trim: "${path}不能有前导或尾随空格",
    lowercase: "${path}必须是小写",
    uppercase: "${path}必须是大写",
  },
  number: {
    min: "${path}必须大于或等于${min}",
    max: "${path}必须小于或等于${max}",
    lessThan: "${path}必须小于${less}",
    moreThan: "${path}必须大于${more}",
    positive: "${path}必须是一个正数",
    negative: "${path}必须是一个负数",
    integer: "${path}必须是一个整数",
  },
  date: {
    min: "${path}字段必须在${min}之后",
    max: "${path}字段必须在${max}之前",
  },
  array: {
    min: "${path}字段必须至少有${min}项",
    max: "${path}字段不能超过${max}项",
  },
  object: {
    noUnknown: "${path}字段不能包含未知的键",
  },
})

yup.addMethod(yup.string, "name", function () {
  return this.matches(/^[a-zA-Z0-9_]{4,16}$/, "名字必须包含4到16个字符，只能包含字母、数字和下划线")
})

yup.addMethod(yup.mixed, "image", function (message = "请上传图片") {
  return this.test("fileType", message, function (value) {
    return value && value[0] && /^image\/(png|jpe?g|gif)$/.test(value[0].type)
  })
})

yup.addMethod(yup.number, "maxFileSize", function (maxSize, message = "文件大小超过限制") {
  return this.test("maxFileSize", message, (value) => !value || value.size <= maxSize)
})

yup.addMethod(yup.object, "imageDimension", function () {
  return this.shape({
    width: yup.number().min(100).max(2000).required(),
    height: yup.number().min(100).max(2000).required(),
  })
})

export default yup
