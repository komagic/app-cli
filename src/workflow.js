const path = require('path')
const ejs = require('gulp-ejs')
const rename = require('gulp-rename')
const baseGenerator = require('./core/base-generator')
const gulp = require('gulp')
const ANSWERS = require('./answers-default')
const inquirer = require('inquirer');
const download = require('./core/download');
const tempDist = '__remote-template';
const file = require('./core/file');
const confirm = require('./core/confirm');
const { fsyncSync } = require('fs')

module.exports = class extends baseGenerator {
  constructor (questions,templates) {
    super();
    this.answers = {}
    this.templates = templates;
    inquirer.prompt(questions).then(answers => {
    // 1
    this.answers = Object.assign({}, ANSWERS, answers)
    // confirm

    // 2
    this.main();
 
    })
  }

   async main(){
      let con = await confirm(this.answers.outputFolderName);
      let val = await this.downloadTemplate(this.templates[this.answers['appType']],tempDist);
      this.copyEjs(tempDist);
      this.clearCache(tempDist);
  }

  clearCache(dist){
    file.remove(dist);
  }

  downloadTemplate(url,dist) {
     return  download(url,dist)
  }

  completeTask(){
    this.logSuccess('completed!')
  }

  destinationPath () {
    return process.cwd()
  }

  templatePath (dir) {
    console.log('path:',path.join(__dirname,'../', dir));
    return path.join(__dirname,'../', dir)
  }

  copyEjs (answers) {
    const { src, dest } = gulp
    return src(this.templatePath(tempDist)+'/**', { nodir: true })
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
