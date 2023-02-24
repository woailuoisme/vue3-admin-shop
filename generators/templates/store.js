const _ = require('lodash')
const pluralize = require('pluralize')
const { trim } = require('lodash/string')
const path = require('path')
const fs = require('fs')

const insertToFile = (filePath, searchString = '', addContent = '') => {
  // let logPath = path.join(__dirname, '../src/stores.index.js')
  const contentString = fs.readFileSync(filePath).toString()
  const index = contentString.lastIndexOf(searchString)
  const newContent = contentString.slice(0, index) + addContent + contentString.slice(index)
  fs.writeFileSync(filePath, newContent)
}

exports.storeFileContent = (model, withImage = false) => {}
