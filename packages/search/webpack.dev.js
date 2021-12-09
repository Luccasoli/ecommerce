const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	mode: 'development',
	devServer: {
		port: 8082,
		historyApiFallback: true,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
			'Access-Control-Allow-Headers':
				'X-Requested-With, content-type, Authorization',
		},
	},
}
