const { ModuleFederationPlugin } = require('webpack').container
const webpackCommonConfig = require('./webpack.common')
const moduleFederationProperties = require('./shared/moduleFederationProperties')

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
			...moduleFederationProperties,
			remotes: {
				host: 'host@http://localhost:8080/remoteEntry.js',
				home: 'home@http://localhost:8081/remoteEntry.js',
				search: 'search@http://localhost:8082/remoteEntry.js',
			},
		})
	)

	return config
}
