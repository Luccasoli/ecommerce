const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	mode: 'development',
	devServer: {
		port: 8080,
		historyApiFallback: true,
	},
}
