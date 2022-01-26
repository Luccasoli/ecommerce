const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
	context: path.resolve(__dirname, '..'),
	devtool: 'inline-source-map',
	entry: {
		main: path.resolve(__dirname, '..', 'src', 'index.ts'),
	},
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
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
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'dts-loader',
						options: {
							name: 'home', // The name configured in ModuleFederationPlugin
							exposes: {
								// The exposes configured in ModuleFederationPlugin
								'./Home': path.resolve(__dirname, '..', 'src', 'pages', 'Home'),
							},
							typesOutputDir: 'exposed_types', // Optional, default is '.wp_federation'
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '..', 'src', 'index.html'),
		}),
		new ForkTsCheckerWebpackPlugin({
			typescript: {
				diagnosticOptions: {
					semantic: true,
					syntactic: true,
				},
				mode: 'write-references',
				configFile: './tsconfig.json',
			},
		}),
	],
}
