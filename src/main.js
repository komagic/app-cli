const workflow = require('./workflow') 
const templates = require('../templates')
const questions = require('./questions')

new workflow(questions,templates)