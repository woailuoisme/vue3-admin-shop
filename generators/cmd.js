const yargs = require('yargs')
const { createApiFile } = require('./generate')
const { hideBin } = require('yargs/helpers')
const { trim } = require('lodash/string')
const serve = yargs(hideBin(process.argv))
  .command(
    'make [type] [modelName]',
    'crud generator generate template type,example:model,controller,etc...',
    (yargs) => {
      yargs.option('type', {
        describe: 'choose a type file ',
        choices: ['model', 'controller', 'router', 'all'],
      })
      yargs.option('modelName', {
        describe: 'name fo model ',
        type: 'string',
      })
      yargs.usage('Usage: $0 [type] [modelName]')
      yargs.example('$0 make model blog', 'generate a blog.js model file')
      yargs.alias('h', 'help')
    },
    (yargs) => {
      if (yargs.type && yargs.modelName) {
        // generate(yargs.modelName, yargs.type);
        createApiFile(trim(yargs.modelName))
        console.log('Generated successfully !!!')
      } else {
        console.log('Please input correct string... ')
      }
    }
  )
  .command('get <username|email> [password]', 'fetch a user by username or email.')
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .help()
  .wrap(140).argv

console.log(serve)
