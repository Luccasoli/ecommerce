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
				host: 'host@https://host-tcc-ecommerce.netlify.app/remoteEntry.js',
			},
			shared: {
				...dependencies,
			},
		})
	)

	return config
}
