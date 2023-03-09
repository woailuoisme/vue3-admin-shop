module.exports = {
  "printWidth": 140,
  "tabWidth": 2,
  "useTabs": false,
  "semi": false, // 结尾加分号
  "singleQuote": true,
  "jsxSingleQuote": false,
  "jsxBracketSameLine": false, // 在多行JSX元素的最后一行追加 >
  "quoteProps": "as-needed",
  "trailingComma": "es5", // 确保对象的最后一个属性后有逗号
  "bracketSpacing": true, // 大括号有空格 { name: 'rose' }
  "arrowParens": "avoid", // 箭头函数，单个参数添加括号
  "requirePragma": false, // 是否严格按照文件顶部的特殊注释格式化代码
  "insertPragma": false, // 是否在格式化的文件顶部插入Pragma标记，以表明该文件被prettier格式化过了
  "proseWrap": "preserve", // 按照文件原样折行
  "htmlWhitespaceSensitivity": "ignore", // html文件的空格敏感度，控制空格是否影响布局
  "endOfLine": "auto", // 结尾是 \n \r \n\r auto
}
