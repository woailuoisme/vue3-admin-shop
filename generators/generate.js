const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const pluralize = require('pluralize')

const { apiFileContent } = require('./templates/api_sevice')

const createSyncFile = (directory, filename, content) => {
  fs.mkdirSync(directory, { recursive: true })
  fs.writeFileSync(path.join(directory, filename), content, 'UTF8')
}

exports.createApiFile = (model) => {
  createSyncFile(path.join(__dirname, '../src/api'), `${model.toLowerCase()}.service.js`, apiFileContent(model))
}

// const make = (modelName = '', type = '') => {
//   if (!modelName && !type) {
//     console.log(`modelName and type is not empty...`.red.inverse)
//     return
//   }
// switch (type) {
//   case 'model':
//     createFile(modelContent, outputModePath)
//     break
//   case 'controller':
//     createFile(controllerContent, outputControllerPath)
//     break
//   case 'router':
//     createFile(routerContent, outputRouterPath)
//     break
//   case 'test':
//     createFile(modelContent, outputModePath)
//     break
//   case 'request':
//     createFile(requestContent, outputRequestPath)
//     break
//   case 'all':
//     createFile(modelContent, outputModePath)
//     createFile(controllerContent, outputControllerPath)
//     createFile(routerContent, outputRouterPath)
//     break
//   default:
//     console.log(`please input the type...`)
// }
// }

// module.exports = make
