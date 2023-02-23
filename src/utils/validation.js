import * as yup from 'yup'
import printValue from './printValue'

yup.setLocale({
  mixed: {
    default: '${path} 无效',
    required: '${path} 必填',
    oneOf: '${path} 必须是 ${values} 其中之一',
    notOneOf: '${path} 非 ${values} 其中之一',
    notType: ({path, type, value, originalValue}) => {
      const castMsg =
        originalValue != null && originalValue !== value ? ` (从 \`${printValue(originalValue, true)}\` 转换).` : '.'
      return type !== 'mixed'
        ? `${path} 必须是 \`${type}\` 类型，` + ` 但最终值为： \`${printValue(value, true)}\`` + castMsg
        : `${path} 必须匹配配置的类型。 ` + `验证值是： \`${printValue(value, true)}\`` + castMsg
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
    uppercase: '${path} 必须是大写字符串'
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
  const nameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
  // eslint-disable-next-line no-template-curly-in-string
  return this.test('name', locale.string.name, function nameTest() {
    return nameRegex.test(this.options.originalValue) || this.createError({message});
  });
});

export default yup
