import path from "path";
import fs from "fs"
import chalk from "chalk";
import {apiContent} from "./templates/api_sevice.mjs"
import {entityFormContent} from "./templates/entity_form.mjs"
import {storeContent} from "./templates/store.mjs"
import {viewContent} from "./templates/view.mjs"
import {camelToDot, camelToKebab, camelToSnake, plural} from "./util.mjs"
import {camelCase, trim} from "lodash-es"

const _createFile = (directory, filename, content) => {
    fs.mkdirSync(directory, {recursive: true})
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
        console.log(chalk.green(`${filePath} file is deleted!!!`))
    } else {
        console.log(chalk.yellow(`${filePath} file is not exists!!!`))
    }
}

const _appendStore = () => {
}

const _appendRouter = () => {
}

const _resources = (model) => {
    const newModel = trim(model)
    const camelName = camelCase(newModel)
    const pascalName = pascale(camelName)
    const pluralName = plural(camelName)
    const pluralPascalName = plural(pascalName)
    const kebabName = camelToKebab(camelName)
    const dotName = camelToDot(camelName)
    const snakeName = camelToSnake(camelName)
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
