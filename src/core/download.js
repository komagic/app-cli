const download = require('download-git-repo'); 
const ora = require('ora');


const resolveTemplateUrl = (url)=>{

  if(url.indexOf('git@')>-1){
    return url.replace('git@','').replace('.git','');
  }
  if(url.indexOf('https')>-1){
    console.log('url',url);
    return 'direct:'+url;
  }
}

 module.exports = function(tempUrl,dist='app-template'){
  const url = resolveTemplateUrl(tempUrl);
   const spinner = ora('downloading.. '+url);

   return new Promise((resolve, reject)=>{
     spinner.start();
     download(url,dist,{clone:true},(err)=>{
        if(err){
          download(url, dist, { clone: false }, function (err)
          {
            if (err) {
              spinner.fail('unable download template');
              reject(err)
            }
            else {
              // 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
              spinner.succeed('downloading success')
              resolve(dist)
            }
          })
        }
        else{
          spinner.succeed();
          resolve(dist);
        }
      

     })
   })
 }