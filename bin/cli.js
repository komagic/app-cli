#!/usr/bin/env node
const program = require('commander')
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





  program.parse(process.argv)
