const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container
const webpackCommonConfig = require('./webpack.common')
const { dependencies } = require('../package.json')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'development',
		devServer: {
			port: 8081,
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
			name: 'home',
			filename: 'remoteEntry.js',
			// exposes modules (file) that should be made available to other bundles
			exposes: {
				'./Home': path.resolve(__dirname, '..', 'src', 'pages', 'Home'),
				'./Header': path.resolve(
					__dirname,
					'..',
					'src',
					'components',
					'Header'
				),
			},
			remotes: {
				host: 'host@http://localhost:8080/remoteEntry.js',
			},
			shared: {
				...dependencies,
			},
		})
	)

	return config
}
