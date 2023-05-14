<template>
  <v-row>
    <v-col cols="12">
      <v-card v-for="(value, key) in pageData" :key="key">
        <v-card-title>{{ toName[key] }}</v-card-title>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { reactive } from "vue"
import { chunk, flatten } from "lodash-es"
import packageJson from "../../package.json"
const pageData = reactive({ info: {}, dependencies: {}, devDependencies: {} })

const primary = ref("rgb(var(--v-theme-primary))")
const secondary = ref("rgb(var(--v-theme-secondary))")

const toName = {
  info: "项目信息",
  dependencies: "生产依赖",
  devDependencies: "开发依赖",
}
pageData.info = {
  name: packageJson.name,
  version: packageJson.version,
}
pageData.dependencies = packageJson.dependencies
pageData.devDependencies = packageJson.devDependencies
console.log(packageJson)
</script>

<style scoped></style>
