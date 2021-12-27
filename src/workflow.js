const path = require('path')
const ejs = require('gulp-ejs')
const rename = require('gulp-rename')
const baseGenerator = require('./core/base-generator')
const gulp = require('gulp')
const ANSWERS = require('./answers-default')
const inquirer = require('inquirer');
const download = require('./core/download');

module.exports = class extends baseGenerator {
  constructor (questions,templates) {
      super();
    
    this.answers = {}
    inquirer.prompt(questions).then(answers => {
        console.log('answers',answers);

      //todo get resources
      // merge questions
     this.answers = Object.assign({}, ANSWERS, answers)
    // this.copyEjs(this.answers)
    // out folder name
    const dist = this.answers['outputFolderName'];
    this.downloadTemplate(templates[this.answers['appType']],dist).then(val=>{
      console.log('val',val);
    });
    })
  }

  downloadTemplate(url) {
   return download(url);
  }

  destinationPath () {
    return process.cwd()
  }

  templatePath () {
    return path.join(__dirname, '/template')
  }

  copyEjs (answers) {
    const { src, dest } = gulp
    console.log('copyEjs:',this.templatePath());
    return src(this.templatePath()+'/**', { nodir: true })
      .pipe(
        rename(path => {
          Object.keys(answers).forEach(key => {
            if (path.dirname.indexOf(key) > -1) {
              path = {
                ...path,
                dirname: path.dirname.replace(key, answers[key])
              }
            }
            if (path.basename.indexOf(key) > -1) {
              path = {
                ...path,
                basename: path.basename.replace(key, answers[key])
              }
            }
          })
          return path
        })
      )
      .pipe(ejs(this.answers))
      .pipe(dest(this.answers.outputFolderName))
  }
}
