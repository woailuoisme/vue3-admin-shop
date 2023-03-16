const fs = require("fs")
// import fs  from 'fs'
const packageJson = require("./package.json")
// import * as packageJson from './package.json';
const chalk = require("chalk")
// import chalk from "chalk";

const appVersion = packageJson.version
const dt = new Date()
const padL = (nr, len = 2, chr = `0`) => `${nr}`.padStart(2, chr)
const dFormat = `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())} ${padL(dt.getHours())}:${padL(
  dt.getMinutes(),
)}:${padL(dt.getSeconds())}`
const versionEnd = `${dt.getFullYear()}${padL(dt.getMonth() + 1)}${padL(dt.getDate())}${padL(dt.getHours())}${padL(dt.getMinutes())}${padL(
  dt.getSeconds(),
)}`
const jsonData = {
  version: `${appVersion}`,
  date: dFormat,
  env: process.env.NODE_ENV,
}
console.log(jsonData)
const jsonContent = JSON.stringify(jsonData)
// fs.mkdirSync(path.dirname(__dirname))

fs.writeFile("./public/version.json", jsonContent, "utf8", (err) => {
  if (err) {
    console.log(chalk.green("An error occured while writing JSON Object to version.json"))
    return console.log(err)
  }
  return console.log(chalk.red(`version.json file has been saved with version ${appVersion}`))
})

fs.writeFile("./data/version.json", jsonContent, "utf8", (err) => {
  if (err) {
    console.log("An error occured while writing JSON Object to version.json")
    return console.log(err)
  }
  return console.log(`version.json file has been saved with version ${appVersion}`)
})
