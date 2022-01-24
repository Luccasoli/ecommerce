const { ModuleFederationPlugin } = require('webpack').container
const path = require('path')
const webpackCommonConfig = require('./webpack.common')
const { dependencies } = require('../package.json')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'production',
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
				host: 'home@https://host-tcc-ecommerce.netlify.app/remoteEntry.js',
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
