#!/usr/bin/env node
const program = require('commander')
const chalk= require('chalk')
console.log('cli','');
program
  .version(require('../package').version)
  .usage('<command>')


  program
  .command('create')
  .description('  Create a project with template already created.')
  .action((name, cmd) => {
    require('../src/main')
  })

  program
  .command('add')
  .description('  Create a project from a template url')
  .action((name, cmd) => {
    require('./add')
  })


  const onError = (err) => {
    // output detail when exception occurs
    console.error('Exception occurred: ' + err.message)
    console.log(chalk.bold.red(err.message))
    process.exit(1)
  }
  
  process.on('uncaughtException', onError)
  process.on('unhandledRejection', onError)


  program.parse(process.argv)
