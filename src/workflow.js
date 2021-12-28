const path = require('path')
const ejs = require('gulp-ejs')
const rename = require('gulp-rename')
const baseGenerator = require('./core/base-generator')
const gulp = require('gulp')
const ANSWERS = require('./answers-default')
const inquirer = require('inquirer');
const download = require('./core/download');
const tempDir = '__remote-template';
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
      let val = await this.downloadTemplate(this.templates[this.answers['appType']],tempDir);
      this.copyEjs(tempDir);
      this.clearCache(tempDir);
  }

  clearCache(tempDir){
    file.remove(tempDir);
  }

  downloadTemplate(url,tempDir) {
     return  download(url,tempDir)
  }

  completeTask(){
    this.logSuccess('completed!')
  }

  destinationPath () {
    const dest =path.resolve(process.cwd(),this.answers.outputFolderName);
    console.log('dest',dest);
    return dest
  }

  templatePath (dir) {
    console.log('templatePath:',path.join(process.cwd(), dir));
    return path.join(process.cwd(), dir)
  }

  copyEjs (answers) {
    const { src, dest } = gulp
    return src(this.templatePath(tempDir)+'/**', { nodir: true })
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
