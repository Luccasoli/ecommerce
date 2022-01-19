const { ModuleFederationPlugin } = require('webpack').container
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
			remotes: {
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
