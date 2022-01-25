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
			name: 'product_details',
			filename: 'remoteEntry.js',
			exposes: {
				'./ProductDetails': path.resolve(
					__dirname,
					'..',
					'src',
					'pages',
					'ProductDetails'
				),
			},
			remotes: {
				'@home': 'home@https://home-tcc-ecommerce.netlify.app/remoteEntry.js',
			},
			shared: {
				...dependencies,
			},
		})
	)

	return config
}
