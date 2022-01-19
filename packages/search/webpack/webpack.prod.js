const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container
const webpackCommonConfig = require('./webpack.common')
const { dependencies } = require('../package.json')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'production',
	}

	config.plugins.push(
		new ModuleFederationPlugin({
			name: 'search',
			filename: 'remoteEntry.js',
			exposes: {
				'./Search': path.resolve(__dirname, '..', 'src', 'pages', 'Search'),
			},
			remotes: {
				home: 'home@https://home-tcc-ecommerce.netlify.app/remoteEntry.js',
			},
			shared: {
				...dependencies,
			},
		})
	)

	return config
}
