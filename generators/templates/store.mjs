import {camelToDot, camelToKebab, camelToSnake, pascalCase, plural, useNameCase} from "../util.mjs"
import {camelCase, trim} from "lodash-es"

export const storeContent = (model) => {
    const result = useNameCase(model);
    const camelName = result.camelName
    const pascalName = result.pascalName
    const pluralCamelName = result.pluralCamelName
    const kebabName = result.kebabName
    const dotName = result.dotName

    return `
import ${pascalName}Service from '@/api/${dotName}.service'
import Toast from '@/utils/toast'
import { defineStore } from 'pinia'
import i18n from '@/plugins/i18n'
const { t } = i18n.global

export default defineStore('${kebabName}', {
  state: () => ({
    ${pluralCamelName}: [],
    meta: {},
    ${camelName}: {},
    loading: false,
    editedIndex: -1,
    editedItem: {},
    defaultItem: {
      id: -1,
      integral: 0,
      ${camelName}: 0,
    },
  }),
  getters: {
    total(state) {
      return state?.${pluralCamelName}.length ?? 0
    },
    isHideFooter(state) {
      return state.meta=== undefined||Object.keys(state.meta).length === 0
    },
    isNew(state) {
      return state.editedIndex === -1
    },
    findById: (state) => (id) => {
      return state.${pluralCamelName}.find((p) => p.id === id)
    },
    findIndexById: (state) => (id) => {
      return state.${pluralCamelName}.findIndex((p) => p.id === id)
    },
    hasData(state) {
      return !!state.${pluralCamelName}.length
    },
  },
  actions: {
    setEditedIndex(id) {
      this.editedIndex = this.${pluralCamelName}.findIndex((m) => m.id === id)
    },
    resetEdited() {
      this.editedIndex = -1
      this.editedItem = Object.assign({}, this.defaultItem)
    },
    findAndSetItem(item) {
      this.editedIndex = this.${pluralCamelName}.findIndex((m) => m.id === item.id)
      this.editedItem = Object.assign({}, item)
    },

    async loadAll${pluralPascalName}(payload) {
      const res = await ${pascalName}Service.list(payload)
      if (res.data.success) {
        this.${pluralCamelName} = res.data.data
        this.meta = res.data?.meta
        Toast.success(t('response.success'))
      }
    },

    async load${pascalName}(payload) {
      const res = await ${pascalName}Service.show(payload)
      if (res.data.success) {
        this.${camelName} = res.data?.data
        Toast.success(t('response.success'))
      }
    },

    async create${pascalName}(payload) {
      const res = await ${pascalName}Service.store(payload)
      const ${model} = res.data?.data
      this.${pluralCamelName}.unshift(${model})
      Toast.success(t('response.success'))
    },

    async update${pascalName}(payload) {
      const res = await ${pascalName}Service.update(payload)
      const ${model} = res.data?.data
      if (res.data.success) {
        const index = this.${pluralCamelName}.findIndex((p) => p.id === payload.id)
        Object.assign(this.${pluralCamelName}[index], ${model})
        Toast.success(t('response.success'))
      } else {
        Toast.error(t('response.failed'))
      }
    },

    async delete${pascalName}(id) {
      const res = await ${pascalName}Service.delete(id)
      if (res.data.success) {
        const index = this.${pluralCamelName}.findIndex((p) => p.id === id)
        this.${pluralCamelName}.splice(index, 1)
        Toast.success(t('response.success'))
      } else {
        Toast.error(t('response.failed'))
      }
    },
  },
})
  `
}
