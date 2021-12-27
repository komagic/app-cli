const chalk = require('chalk')
const log = console.log;

module.exports = class {
    constructor(){

    }

    logSuccess(message){
        log(chalk.bold.green(message))
    }

    logWarning(message){
        log(chalk.keyword('orange')(message))
    }

    logError(message){
        log(chalk.bold.red(message))
    }

    copyTemplate(templateUrl){
        
    }
}