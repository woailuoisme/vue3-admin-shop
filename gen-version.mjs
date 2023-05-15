import fs from "fs"
import chalk from "chalk"
import dayjs from "dayjs"
import { createRequire } from "module"

const require = createRequire(import.meta.url)
const data = require("./package.json")

const jsonData = {
  version: `${data.version}`,
  date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  env: process.env.NODE_ENV,
}
console.log(jsonData)
const jsonContent = JSON.stringify(jsonData)

fs.writeFile("./public/version.json", jsonContent, "utf8", (err) => {
  if (err) {
    console.log(chalk.red("An error occured while writing JSON Object to version.json"))
    return console.log(err)
  }
  return console.log(chalk.green(`version.json file has been saved with version ${data.version}`))
})
