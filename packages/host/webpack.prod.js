const { ModuleFederationPlugin } = require('webpack').container
const webpackCommonConfig = require('./webpack.common')
const { dependencies } = require('./package.json')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'production',
	}
	config.plugins.push(
		new ModuleFederationPlugin({
			name: 'host',
			remotes: {
				home: 'home@https://home-tcc-ecommerce.netlify.app/remoteEntry.js',
				search:
					'search@https://search-tcc-ecommerce.netlify.app/remoteEntry.js',
			},
			shared: {
				...dependencies,
			},
		})
	)

	return config
}
