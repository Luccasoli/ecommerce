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
			remotes: {
				host: 'host@https://host-tcc-ecommerce.netlify.app/remoteEntry.js',
			},
		})
	)

	return config
}
