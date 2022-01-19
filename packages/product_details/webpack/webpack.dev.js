const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container
const webpackCommonConfig = require('./webpack.common')
const { dependencies } = require('../package.json')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'development',
		devServer: {
			port: 8084,
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
			name: 'product_details',
			filename: 'remoteEntry.js',
			exposes: {
				'./ProductDetails': path.resolve(
					__dirname,
					'..',
					'src',
					'pages',
					'ProductDetails'
				),
			},
			remotes: {
				home: 'home@http://localhost:8081/remoteEntry.js',
			},
			shared: {
				...dependencies,
			},
		})
	)

	return config
}