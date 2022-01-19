const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container
const webpackCommonConfig = require('./webpack.common')
const { dependencies } = require('../package.json')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'production',
	}

	config.plugins.push(
		new ModuleFederationPlugin({
			name: 'payment',
			filename: 'remoteEntry.js',
			exposes: {
				'./Payment': path.resolve(__dirname, '..', 'src', 'pages', 'Payment'),
			},
			shared: {
				...dependencies,
			},
		})
	)

	return config
}
