module.exports = {
  printWidth: 140,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,
  quoteProps: "as-needed",
  trailingComma: "all",
  bracketSpacing: true,
  arrowParens: "always", //  箭头函数，只有一个参数的时候，也需要括号
  requirePragma: false, // 是否严格按照文件顶部的特殊注释格式化代码
  insertPragma: false, // 是否在格式化的文件顶部插入Pragma标记 @prettier，以表明该文件被prettier格式化过了
  proseWrap: "preserve", // 按照文件原样折行
  htmlWhitespaceSensitivity: "ignore", // html文件的空格敏感度，控制空格是否影响布局 根据显示样式决定 html 要不要折行
  endOfLine: "auto", // 结尾是 \n \r \n\r auto
  rangeStart: 0, // 每个文件格式化的范围是文件的全部内容
  rangeEnd: Infinity,
  bracketSameLine: false, // jsx 标签的反尖括号需要换行
  vueIndentScriptAndStyle: false, // vue 文件中的 script 和 style 内不用缩进
  embeddedLanguageFormatting: "auto", // 格式化内嵌代码
}
