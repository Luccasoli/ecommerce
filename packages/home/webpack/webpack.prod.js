const webpackCommonConfig = require('./webpack.common')

module.exports = () => {
	const config = {
		...webpackCommonConfig,
		mode: 'production',
	}

	return config
}
