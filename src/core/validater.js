module.exports = {

	email: input => {
		const valid = /[^\s]+@[^\s]+\.[^\s]+/.test(input)
		return valid || `The \`${input}\` is not a email address.`
	},

	url: input => {
		const valid = /https?:\/\/[^\s]+/.test(input)
		return valid || `The \`${input}\` is not a url address.`
	}
}