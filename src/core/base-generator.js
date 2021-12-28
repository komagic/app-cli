const chalk = require('chalk')
const process = require('process')
const log = console.log

module.exports = class {
	constructor () {
		this.middlewares = []
	}

	use (middleware) {
		if (typeof middleware === 'function') {
			this.middlewares.push(middleware)
		} else {
			this.logError('middleware not supported!')
			process.exit(1)
		}
		return this
	}

	run (state) {
		return this.middlewares.reduce(
			(prev, current) => prev.then(() => current(state)),
			Promise.resolve()
		)
	}

	logSuccess (message) {
		log(chalk.bold.green(message))
	}

	logWarning (message) {
		log(chalk.keyword('orange')(message))
	}

	logError (message) {
		log(chalk.bold.red(message))
	}

}
