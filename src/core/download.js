const download = require('download-git-repo') 
const ora = require('ora')
const file = require('./file')
const resolveTemplateUrl = (url)=>{
	console.log('resolveTemplateUrl',url)
	if(url.indexOf('git@')>-1){
		return url.replace('git@','').replace('.git','')
	}
	if(url.indexOf('https')>-1){
		console.log('url',url)
		return 'direct:'+url
	}
}

module.exports = function(tempUrl,dist){
	const url = resolveTemplateUrl(tempUrl)
	const spinner = ora(url)
	spinner.prefixText='loading...'
	return new Promise(async(resolve, reject)=>{
		const exist = await file.exists(dist)
		if(exist){
			await file.remove(dist)
		}
		spinner.start()
		download(url,dist,{clone:true},(err1)=>{
			if(err1){
				download(url, dist, { clone: false }, function (err2)
				{
					if (err2) {
						spinner.fail('download fail')
						reject(err2)
					}
					else {
						// 下载的模板存放在一个临时路径中，下载完成后，可以向下通知这个临时路径，以便后续处理
						spinner.succeed('download success')
						resolve(dist)
					}
				})
			}
			else{
				spinner.succeed('download success')
				resolve(dist)
			}
      

		})
	})
}