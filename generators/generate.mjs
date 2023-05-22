import path from "path"
import fs from "fs"
import chalk from "chalk"
import { apiContent } from "./templates/api_sevice.mjs"
import { entityFormContent } from "./templates/entity_form.mjs"
import { storeContent } from "./templates/store.mjs"
import { viewContent } from "./templates/view.mjs"
import { fileURLToPath } from "url"
import { useNameCase } from "./util.mjs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const _createFile = (directory, filename, content) => {
  fs.mkdirSync(directory, { recursive: true })
  const p = path.join(directory, filename)
  if (fs.existsSync(p)) {
    console.log(chalk.yellow(`${p} file is overwritten!!!`))
  } else {
    console.log(chalk.green(`${p} file is created!!!`))
  }
  fs.writeFileSync(p, content, "UTF8")
}

const _deleteFile = (directory, filename) => {
  const filePath = path.join(directory, filename)
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
    console.log(chalk.green(`${filePath} file is`) + chalk.red(" deleted!!!"))
  } else {
    console.log(chalk.yellow(`${filePath} file is not exists!!!`))
  }
}

const _resources = (model) => {
  const result = useNameCase(model)
  const camelName = result.camelName
  const pascalName = result.pascalName
  const dotName = result.dotName
  return [
    {
      type: "api",
      path: path.join(__dirname, "../src/api"),
      name: `${dotName}.service.js`,
      content: apiContent(model),
    },
    {
      type: "store",
      path: path.join(__dirname, "../src/stores"),
      name: `${pascalName}Store.js`,
      content: storeContent(model),
    },
    {
      type: "view",
      path: path.join(__dirname, "../src/views/"),
      name: `${pascalName}Page.vue`,
      content: viewContent(model),
    },
    {
      type: "entityForm",
      path: path.join(__dirname, `../src/views/components/${camelName}`),
      name: `Entity.vue`,
      content: entityFormContent(model),
    },
  ]
}

export const createFiles = (model, type = "all") => {
  const resources = _resources(model)
  if (type === "all") {
    resources.forEach((v) => {
      _createFile(v.path, v.name, v.content)
    })
    return true
  }
  if (["api", "store", "view", "entityForm"].includes(type)) {
    const v = _resources().find((v) => v.type === type)
    _createFile(v.path, v.name, v.content)
  } else {
    console.log(`type must one of ['api', 'store', 'view', 'entityForm']`)
  }
}

export const deleteFiles = (model, type = "all") => {
  const resources = _resources(model)
  if (type === "all") {
    resources.forEach((v) => {
      _deleteFile(v.path, v.name, v.content)
    })
    return true
  }
  if (["api", "store", "view", "entityForm"].includes(type)) {
    const v = _resources().find((v) => v.type === type)
    _deleteFile(v.path, v.name, v.content)
  } else {
    console.log(`type must one of ['api', 'store', 'view', 'entityForm']`)
  }
}
