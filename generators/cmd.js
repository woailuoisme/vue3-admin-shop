const yargs = require("yargs")
const { createFiles, deleteFiles } = require("./generate")
const { hideBin } = require("yargs/helpers")
const chalk = require("chalk")
const serve = yargs(hideBin(process.argv))
  .command(
    "make  [model] [type]",
    "crud generator generate template type,example:model,controller,etc...",
    (yargs) => {
      yargs.option("model", {
        describe: "name fo model ",
        type: "string",
      })
      yargs.option("type", {
        describe: "choose a file type ",
        choices: ["api", "store", "view", "entityModel", "all"],
        default: "all",
      })
      yargs.usage("Usage: $0 [type] [model]")
      yargs.example("$0 make Product api", "(generate a api.service.js file for product)")
      yargs.alias("h", "help")
    },
    (yargs) => {
      if (yargs.type && yargs.model) {
        // console.log(yargs.model, yargs.type)
        // console.log(yargs)
        if (!yargs.delete) createFiles(yargs.model, yargs.type)
        else deleteFiles(yargs.model, yargs.type)
      } else {
        console.log(chalk.redBright("Please input correct string...    Example: make  Post store "))
      }
    },
  )
  .option("delete", {
    alias: "d",
    type: "boolean",
    description: "Delete created file",
  })
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .help()
  .wrap(140).argv

// console.log(serve)
