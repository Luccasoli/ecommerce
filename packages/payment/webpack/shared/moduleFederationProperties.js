const path = require('path')
const { dependencies } = require('../../package.json')

module.exports = {
	name: 'payment',
	filename: 'remoteEntry.js',
	exposes: {
		'./Payment': path.resolve(__dirname, '..', 'src', 'pages', 'Payment'),
	},
	shared: {
		...dependencies,
	},
}
