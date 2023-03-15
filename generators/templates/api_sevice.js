const { camelCase, trim } = require("lodash-es")
const pluralize = require("pluralize")
const { plural, camelToKebab, camelToDot, camelToSnake, pascale } = require("../util")
exports.apiContent = (model, withImage = false) => {
  const newModel = trim(model)
  const camelModel = camelCase(newModel)
  const pascalName = pascale(camelModel)
  const pluralName = plural(camelModel)
  const pluralPascalName = plural(pascalName)
  const kebabName = camelToKebab(camelModel)
  const dotName = camelToDot(camelModel)
  const snakeName = camelToSnake(camelModel)
  console.log(newModel, camelModel, pascalName, pluralName, pluralPascalName, kebabName, dotName, snakeName)

  const withImageFile = `
import client from './http.client'

class ${pascalName}lService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
    }
    if (data?.sortBy) params.sortBy = data.sortBy
    if (data?.sortType) params.sortType = data.sortType
    if (data?.keyword) params.keyword = data.keyword
    return client.instance().get('/carousels', { params })
  }

  show(id) {
    return client.instance().get(\`/${snakeName}/\${id}\`)
  }

  store(data) {
    let formData = new FormData()
    formData.append('order', data.order)
    formData.append('image', data.image)
    return client.instance().post(\`/${snakeName}\`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  update(data) {
    let formData = new FormData()
    formData.append('order', data.order)
    if (data.image) {
      formData.append('image', data.image)
    }
    return client.instance().post(\`/${model}_update/\${data.id}\`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return client.instance().delete(\`/${snakeName}\`, {
      data: body,
    })
  }
}

export default new ${pascalName}Service()
  `

  const crudFile = `
import request from './http.client'

class ${pascalName}Service {
  list(data) {
    const params = {
      page: data.page,
      per_page: data.rowsPerPage,
    }
    if (data?.sortBy) params.sortBy = data.sortBy
    if (data?.sortType) params.sortType = data.sortType
    if (data?.keyword) params.keyword = data.keyword
    return request.instance().get('/${snakeName}', { params })
  }

  show(id) {
    return request.instance().get(\`/${snakeName}/\${id}\`)
  }

  store(data) {
    let body = {
      integral: data.integral,
      amount: data.amount,
    }
    return request.instance().post(\`/${snakeName}\`, body)
  }

  update(data) {
    let body = {
      integral: data.integral,
      amount: data.amount,
    }
    return request.instance().put(\`/${snakeName}/\${data.id}\`, body)
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return request.instance().delete(\`/${snakeName}\`, {
      data: body,
    })
  }
}

export default new ${pascalName}Service()
  `
  return withImage ? withImageFile : crudFile
}
