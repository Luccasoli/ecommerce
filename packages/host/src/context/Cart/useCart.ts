import { useContext } from 'react'
// @ts-ignore
import { CartContext } from './CartProvider'

export const useCart = () => {
	const cartContext = useContext(CartContext)

	if (cartContext === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return cartContext
}
