import * as yup from 'yup'
import { imageWidthAndHeight } from '@/utils/util'
// import printValue from './printValue'
const typeStr = (val) => {
  if (val === 'number') return '数值'
  if (val === 'boolean') return '布尔'
  if (val === 'string') return '字符'
  if (val === 'date') return '时间'
  if (val === 'array') return '数组'
  if (val === 'object') return '对象'
  return val
}

yup.setLocale({
  mixed: {
    default: '${path} 无效',
    required: '${path} 必填',
    oneOf: '${path} 必须是 ${values} 其中之一',
    notOneOf: '${path} 非 ${values} 其中之一',
    // notType: ({ path, type, value, originalValue }) => {
    //   const castMsg = originalValue != null && originalValue !== value ? ` (从 \`${printValue(originalValue, true)}\` 转换).` : '.'
    //   return type !== 'mixed'
    //     ? `${path} 必须是 \`${typeStr(type)}\` 类型，` + ` 但最终值为： \`${printValue(value, true)}\`` + castMsg
    //     : `${path} 必须匹配配置的类型。 ` + `验证值是： \`${printValue(value, true)}\`` + castMsg
    // },
    notType: ({ path, type, value, originalValue }) => {
      return type !== 'mixed' ? `${path} 必须是 \`${typeStr(type)}\` 类型` : `${path} 必须是匹配的类型`
    },
  },
  string: {
    length: '${path} 长度必须等于 ${length} 个字符',
    min: '${path} 至少 ${min} 个字符',
    max: '${path} 最多 ${max} 个字符',
    matches: '${path} 必须匹配 "${regex}"',
    email: '${path} 必须是一个有效的email格式',
    url: '${path} 必须是一个有效的url',
    trim: '${path} 必须是一个去除空格的字符',
    lowercase: '${path} 必须是小写字符串',
    uppercase: '${path} 必须是大写字符串',
  },
  number: {
    min: '${path} 必须大于等于 ${min}',
    max: '${path} 必须小于等于 ${max}',
    lessThan: '${path} 必须小于 ${less}',
    moreThan: '${path} 必须大于 ${more}',
    positive: '${path} 必须是正数',
    negative: '${path} 必须是负数',
    integer: '${path} 必须是整数',
  },
  date: {
    min: '${path} 必须晚于 ${min}',
    max: '${path} 必须早于 ${max}',
  },
  array: {
    min: '${path} 字段必须至少有 ${min} 个项目',
    max: '$${path} 字段必须小于或等于 ${max} 个项目',
  },
  object: {
    noUnknown: '${path} 字段不能有未在对象中指定的键',
  },
})
yup.addMethod(yup.string, 'name', function nameMethod(message) {
  const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/
  // eslint-disable-next-line no-template-curly-in-string
  return this.test('name', locale.string.name, function nameTest() {
    return nameRegex.test(this.options.originalValue) || this.createError({ message })
  })
})

yup.addMethod(yup.mixed, 'imageDimensionCheck', function (message, requiredWidth, requiredHeight) {
  return this.test('image-width-height-check', message, async function (value) {
    const { path, createError } = this

    if (!value) return

    const imgDimensions = await imageWidthAndHeight(value)

    if (imgDimensions.width !== requiredWidth) {
      return createError({ path, message: `The file width needs to be the ${requiredWidth}px!` })
    }

    if (imgDimensions.height !== requiredHeight) {
      return createError({ path, message: `The file height needs to be the ${requiredHeight}px!` })
    }

    return true
  })
})

yup.addMethod(yup.mixed, 'fileRequired', function () {
  return this.test('file-required', function (value) {
    const { path, createError } = this
    if (!value) return
    if (value instanceof File || value[0] instanceof File) {
      return true
    }
    return createError({ path, message: `文件 必填!` })
  })
})

yup.addMethod(yup.mixed, 'fileSize', function (fileSize) {
  return this.test('file-size', fileSize, function (value) {
    const { path, createError } = this
    if (!value) return
    if (value instanceof File) {
      const size = value.size / 1024 / 1024
      if (size > fileSize) {
        return createError({ path, message: `文件大小需要小于${fileSize}M !` })
      }
    } else if (value[0] instanceof File) {
      const size = value[0].size / 1024 / 1024
      if (size > fileSize) {
        return createError({ path, message: `文件大小需要小于${fileSize}M !` })
      }
    }
    return true
  })
})

yup.addMethod(yup.mixed, 'imageType', function (types) {
  return this.test('file-type', types, function (value) {
    if (!types) types = ['image/jpg', 'image/jpeg', 'image/png']
    const exes = types.map((type) => type.split('/')[1]).join(' ')
    const { path, createError } = this
    if (!value) return
    if (value instanceof File && !types.includes(value?.type)) {
      return createError({ path, message: `仅接收: ${exes} 文件!` })
    } else if (value[0] instanceof File && !types.includes(value[0]?.type)) {
      return createError({ path, message: `仅接收: ${exes} 文件!` })
    }
    return true
  })
})

export default yup
