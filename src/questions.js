const ANSWERS  = require('./answers-default')
const templates = require('../templates.json')

module.exports = [
  {
    type: 'string',
    name: 'appName',
    messages: 'What is the application name?',
    default: ANSWERS['appName']
  },
  {
    type: 'list',
    name: 'appType',
    messages: 'What is the application type?',
    choices: Object.keys(templates)
  },
  {
    type: 'checkbox',
    name: 'area',
    messages: 'What is the application name?',
    choices: [{value:'CN',checked:true},'TW','ID','IN'],
    default: ANSWERS['area']
  }
]
