const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container
const webpackCommonConfig = require('./webpack.common')
const { dependencies } = require('../package.json')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'development',
		devServer: {
			port: 8085,
			historyApiFallback: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods':
					'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers':
					'X-Requested-With, content-type, Authorization',
			},
		},
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
