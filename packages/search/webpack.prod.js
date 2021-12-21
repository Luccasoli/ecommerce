const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpackCommonConfig = require('./webpack.common')
const { dependencies } = require('./package.json')

module.exports = {
	...webpackCommonConfig,
	mode: 'production',
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src', 'index.html'),
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
				mode: 'write-references',
			},
		}),
		new ModuleFederationPlugin({
			name: 'search',
			filename: 'remoteEntry.js',
			exposes: {
				'./Search': './src/pages/Search',
			},
			remotes: {
				home: 'home@https://home-tcc-ecommerce.netlify.app/remoteEntry.js',
			},
			shared: {
				...dependencies,
			},
		}),
	],
}
