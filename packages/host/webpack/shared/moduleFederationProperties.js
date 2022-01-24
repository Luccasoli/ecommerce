const path = require('path')
const { dependencies } = require('../../package.json')

module.exports = {
	name: 'host',
	filename: 'remoteEntry.js',
	exposes: {
		'./useCart': path.resolve(
			__dirname,
			'..',
			'src',
			'context',
			'Cart',
			'useCart'
		),
		'./CartProvider': path.resolve(
			__dirname,
			'..',
			'src',
			'context',
			'Cart',
			'CartProvider'
		),
		'./Header': path.resolve(__dirname, '..', 'src', 'components', 'Header'),
	},
	shared: {
		...dependencies,
	},
}
