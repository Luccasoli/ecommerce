const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const { ModuleFederationPlugin } = require('webpack').container
const { dependencies } = require('./package.json')

module.exports = env => {
	const devMode = !!env.development && !env.production

	return {
		context: path.resolve(__dirname),
		devtool: 'inline-source-map',
		entry: {
			main: path.resolve('src', 'index.ts'),
		},
		output: {
			path: path.resolve('dist'),
			filename: 'bundle.[contenthash].js',
			publicPath: '/',
			clean: true,
		},
		mode: devMode ? 'development' : 'production',
		devServer: {
			port: 8080,
			historyApiFallback: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods':
					'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers':
					'X-Requested-With, content-type, Authorization',
			},
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
				template: path.resolve('src', 'index.html'),
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
			new ModuleFederationPlugin({
				name: 'host',
				filename: 'remoteEntry.js',
				exposes: {
					'./useCart': path.resolve('src', 'context', 'Cart', 'useCart'),
					'./CartProvider': path.resolve(
						'src',
						'context',
						'Cart',
						'CartProvider'
					),
					'./Header': path.resolve('src', 'components', 'Header'),
				},
				shared: {
					...dependencies,
				},
				remotes: devMode
					? {
							'@host': 'host@http://localhost:8080/remoteEntry.js',
							'@home': 'home@http://localhost:8081/remoteEntry.js',
							'@search': 'search@http://localhost:8082/remoteEntry.js',
							'@auth': 'auth@http://localhost:8083/remoteEntry.js',
							'@product_details':
								'product_details@http://localhost:8084/remoteEntry.js',
					  }
					: {
							'@host':
								'home@https://host-tcc-ecommerce.netlify.app/remoteEntry.js',
							'@home':
								'home@https://home-tcc-ecommerce.netlify.app/remoteEntry.js',
							'@search':
								'search@https://search-tcc-ecommerce.netlify.app/remoteEntry.js',
							'@auth':
								'auth@https://auth-tcc-ecommerce.netlify.app/remoteEntry.js',
							'@product_details':
								'product_details@https://product_details-tcc-ecommerce.netlify.app/remoteEntry.js',
					  },
			}),
		],
	}
}
