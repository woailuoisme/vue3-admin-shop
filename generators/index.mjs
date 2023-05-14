import {Command} from 'commander';
import {resolve} from 'path';
import chalk from 'chalk';
import {$} from 'execa';
import {existsSync} from 'fs';

const $$ = $({stdio: 'inherit'});
const program = new Command();

import clear from 'clear'
// import figlet from 'figlet'

const log = console.log;
const appPath = process.cwd();

clear();
// console.log(
//   chalk.red(
//     figlet.textSync('Hello, world', { horizontalLayout: 'full' })
//   )
// );
program
    .version('0.0.1')
    .name('Custom docker command line')
    .description("An example CLI for ordering pizza's")
    .option('-C, --no-cheese', 'You do not want any cheese')
program
    .command('api')
    .description('docker-compose up services')
    .action(async str => {
        await $$`apidoc -c ${appPath}/apidoc.json i  ${appPath}/src/controllers/ -o  ${appPath}/public/docs/`;
        log(chalk.green(`api docs published in ${appPath}/public/docs`));
    });

program
    .command('clear')
    .description('clear ')
    .action(async str => {
        const path = resolve(appPath, '/logs');
        if (existsSync(path)) {
            await $$`rimraf ${path}/*`;
            log(chalk.green(`${path}/* has been cleared`));
        }
    });

program
    .command('router')
    .description('router ')
    .action(async str => {
        // const path = resolve(appPath, '/logs');
        expressListRoutes(new App([new UserRoute(), new AuthRoute(), new WebRoute()]).app, {prefix: '/'});
    });

program.parse(process.argv);
