const { ModuleFederationPlugin } = require('webpack').container
const webpackCommonConfig = require('./webpack.common')
const moduleFederationProperties = require('./shared/moduleFederationProperties')

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
			...moduleFederationProperties,
			remotes: {
				'@host': 'host@http://localhost:8080/remoteEntry.js',
			},
		})
	)

	return config
}
