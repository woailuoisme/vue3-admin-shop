const _ = require('lodash')
const pluralize = require('pluralize')
const {trim} = require("lodash/string");
exports.apiFileContent = (model, withImage = false) => {
  const newModel = trim(model.toLowerCase())
  const capName = _.capitalize(_.camelCase(newModel))
  const pluralizeName = pluralize(_.camelCase(newModel))
  const withImageFile = `
  import client from './http.client'

class ${capName}lService {
  list(data) {
    const params = {
      page: data?.page,
      per_page: data?.rowsPerPage,
      keyword: data?.keyword,
    }
    return client.instance().get('/carousels', { params })
  }

  show(id) {
    return client.instance().get(\`/${pluralizeName}/\${id}\`)
  }

  store(data) {
    let formData = new FormData()
    formData.append('order', data.order)
    formData.append('image', data.image)
    return client.instance().post(\`/${pluralizeName}\`, formData, {
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
    return client.instance().delete(\`/${pluralizeName}\`, {
      data: body,
    })
  }
}

export default new ${capName}Service()
  `

  const crudFile = `
import request from './http.client'

class ${capName}Service {
  list(data) {
    const params = {
      page: data.page,
      per_page: data.rowsPerPage,
      keyword: data?.keyword,
    }
    return request.instance().get('/${pluralizeName}', { params })
  }

  show(id) {
    return request.instance().get(\`/${pluralizeName}/\${id}\`)
  }

  store(data) {
    let body = {
      integral: data.integral,
      amount: data.amount,
    }
    return request.instance().post(\`/${pluralizeName}\`, body)
  }

  update(data) {
    let body = {
      integral: data.integral,
      amount: data.amount,
    }
    return request.instance().put(\`/${pluralizeName}/\${data.id}\`, body)
  }

  delete(id) {
    const body = {
      ids: [id],
    }
    return request.instance().delete(\`/${pluralizeName}\`, {
      data: body,
    })
  }
}

export default new ${capName}Service()
  `
  return withImage ? withImageFile : crudFile;
}
