const workflow = require('./workflow') 
const templates = require('../templates');
const questions = require('./questions')

const app = new workflow(questions,templates);