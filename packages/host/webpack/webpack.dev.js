const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')
const webpackCommonConfig = require('./webpack.common')
const { dependencies } = require('../package.json')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'development',
		devServer: {
			port: 8080,
			historyApiFallback: true,
		},
	}
	config.plugins.push(
		new ModuleFederationPlugin({
			name: 'host',
			filename: 'remoteEntry.js',
			exposes: {
				'./useCart': path.resolve(
					__dirname,
					'..',
					'src',
					'context',
					'Cart',
					'useCart'
				),
				'./CartProvider': path.resolve(
					__dirname,
					'..',
					'src',
					'context',
					'Cart',
					'CartProvider'
				),
			},
			remotes: {
				host: 'host@http://localhost:8080/remoteEntry.js',
				home: 'home@http://localhost:8081/remoteEntry.js',
				search: 'search@http://localhost:8082/remoteEntry.js',
			},
			shared: {
				...dependencies,
			},
		})
	)

	return config
}
