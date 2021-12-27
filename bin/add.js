#!/usr/bin/env node
const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
//  templates.json
const tplObj = require(`${__dirname}/../templates`)

// input
const question = [
  {
    name: "name",
    type: 'input',
    message: "please input template name",
    validate (val) {
      if (val === '') {
        return 'Name is required!'
      } else if (tplObj[val]) {
        return 'Template has already existed!'
      } else {
        return true
      }
    }
  },
  {
    name: "url",
    type: 'input',
    message: "please enter template url",
    validate (val) {
      if (val === '') return 'The url is required!'
      return true
    }
  }
]

inquirer
  .prompt(question).then(answers => {
    // answers 
    let { name, url } = answers;
    // filter unicode 
    tplObj[name] = url.replace(/[\u0000-\u0019]/g, '')
    // write template
    fs.writeFile(`${__dirname}/../templates.json`, JSON.stringify(tplObj), 'utf-8', err => {
      if (err) console.log(err)
      console.log('\n')
      console.log(chalk.green(`${name} have been added successfully!\n`))
      console.log(chalk.grey('The latest template list is: \n'))
      console.log(tplObj)
      console.log('\n')
      process.exit(0);
    })
  })
