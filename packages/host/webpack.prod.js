const webpackCommonConfig = require('./webpack.common')

module.exports = {
	...webpackCommonConfig,
	mode: 'production',
}
