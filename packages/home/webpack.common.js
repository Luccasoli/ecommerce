const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { dependencies } = require('./package.json')

module.exports = {
	devtool: 'inline-source-map',
	entry: {
		main: path.resolve(__dirname, 'src', 'index.ts'),
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.[contenthash].js',
		clean: true,
	},
	resolve: {
		extensions: ['.ts', '.tsx', '...'],
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				use: ['babel-loader'],
				exclude: /node_modules/,
			},
		],
	},

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
			name: 'home',
			filename: 'remoteEntry.js',
			exposes: {
				'./Page': './src/App',
			},
			shared: {
				...dependencies,
			},
		}),
	],
}
