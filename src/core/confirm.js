const inquirer = require('inquirer')
const file = require('./file')
const process = require('process')
/**
 * Confirm destination.
 */

module.exports = async (templateDir)=>{
	console.log('templateDir',templateDir)
	// resolve dest path
	let ctx ={}
	ctx.dest = templateDir

	// exist
	const exists = await file.exists(ctx.dest)

	// dist not exists
	if (exists === false) return

	// force mode

	// destination is file
	if (exists !== 'dir') throw new Error(`Cannot create ${ctx.project}: File exists.`)

	// is empty dir
	if (await file.isEmpty(ctx.dest)) return

	// is current working directory
	const isCurrent = ctx.dest === process.cwd()

	// // require node >= v8.3.0
	// console.clear()

	// confirm & choose next
	const { sure } = await inquirer.prompt([
		{
			name: 'sure',
			type: 'confirm',
			message: isCurrent ? 'Create in current directory?' : 'Target directory already exists. Continue?'
		}
	])
 
	if(!sure){
		throw new Error('You have cancelled this task.')
	}

	const {choose} = await inquirer.prompt(
		{
			name: 'choose',
			type: 'list',
			message: `${isCurrent ? 'Current' : 'Target'} directory is not empty. How to continue?`,
			hint: ' ',
			choices: [
				{ title: 'Overwrite', value: 'overwrite' },
				{ title: 'Cancel', value: 'cancel' }
			]
		})

	// Otherwise is cancel task
	if (choose == null || choose === 'cancel') 
	{ 
		throw new Error('You have cancelled this task.')
	} 

	// Overwrite require empty dest
	if (choose === 'overwrite') await file.remove(ctx.dest)

	// Merge not require any action


}

