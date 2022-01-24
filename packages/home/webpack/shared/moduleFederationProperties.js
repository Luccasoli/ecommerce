const path = require('path')
const { dependencies } = require('../../package.json')

module.exports = {
	name: 'home',
	filename: 'remoteEntry.js',
	// exposes modules (file) that should be made available to other bundles
	exposes: {
		'./Home': path.resolve(__dirname, '..', 'src', 'pages', 'Home'),
		'./Header': path.resolve(__dirname, '..', 'src', 'components', 'Header'),
	},
	shared: {
		...dependencies,
	},
}
