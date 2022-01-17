const webpackCommonConfig = require('./webpack.common')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'development',
		devServer: {
			port: 8081,
			historyApiFallback: true,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods':
					'GET, POST, PUT, DELETE, PATCH, OPTIONS',
				'Access-Control-Allow-Headers':
					'X-Requested-With, content-type, Authorization',
			},
		},
	}

	return config
}
