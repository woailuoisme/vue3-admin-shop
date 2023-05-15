import { Command, Option, Argument } from "commander"
import { resolve } from "path"
import chalk from "chalk"
import { $ } from "execa"
import { existsSync } from "fs"

const $$ = $({ stdio: "inherit" })
const program = new Command()

import clear from "clear"
import { createFiles, deleteFiles } from "./generate.mjs"

const log = console.log
const appPath = process.cwd()

clear()
program.version("0.0.1").name("admin command line").description("The vue3 vuetify2 admin command line tool")

program
  .command("make")
  .description("generate templates")
  .addArgument(new Argument("[model]", "model name").argRequired())
  .addOption(new Option("-t, --type <type>", "type template").choices(["all", "api", "form", "store", "view"]).default("all"))
  .addOption(new Option("-d, --remove", "delete template"))
  .action((model, opt) => {
    console.log(model, opt)
    if (opt.type && model) {
      if (!opt.remove) createFiles(model, opt.type)
      else deleteFiles(model, opt.type)
    } else {
      console.log(chalk.redBright("Please input correct string... Example: make  Post store "))
    }
  })

program
  .command("clear")
  .description("clear ")
  .action(async (str) => {
    const path = resolve(appPath, "/logs")
    if (existsSync(path)) {
      await $$`rimraf ${path}/*`
      log(chalk.green(`${path}/* has been cleared`))
    }
  })

program.parse(process.argv)
