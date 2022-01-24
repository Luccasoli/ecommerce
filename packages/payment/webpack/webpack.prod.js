const { ModuleFederationPlugin } = require('webpack').container
const webpackCommonConfig = require('./webpack.common')
const moduleFederationProperties = require('./shared/moduleFederationProperties')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'production',
	}

	config.plugins.push(
		new ModuleFederationPlugin({
			...moduleFederationProperties,
		})
	)

	return config
}
