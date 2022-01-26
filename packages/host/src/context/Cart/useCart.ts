import { useContext } from 'react'
import { CartContext } from './CartProvider'
import { TCartContext } from './types'

export const useCart: () => TCartContext = () => {
	const cartContext = useContext(CartContext)

	if (cartContext === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return cartContext
}
