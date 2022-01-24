/* eslint-disable import/no-extraneous-dependencies */
import React, {
	useState,
	useEffect,
	ReactChild,
	useCallback,
	useMemo,
} from 'react'
import { Product } from '@tcc-ecommerce/home/src/shared/types/Product'

type CartItem = {
	id: number
	product: Product
	price: number
	quantity: number
}

const CartContext = React.createContext<{
	cartItems: CartItem[]
	addToCart: (newItem: CartItem) => void
	removeFromCart: (id: Product['id']) => void
}>(undefined!)

type ContextProviderProps = {
	children: ReactChild
}

const CartProvider = ({ children }: ContextProviderProps) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	useEffect(() => {
		let cartItemsData: CartItem[] | null

		try {
			cartItemsData = JSON.parse(localStorage.getItem('cartItems')!)
		} catch (error) {
			cartItemsData = null
		}

		if (cartItemsData) {
			setCartItems(cartItemsData)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify(cartItems))
	}, [cartItems])

	const addToCart = useCallback((newItem: CartItem) => {
		setCartItems(prevItems => [...prevItems, newItem])
	}, [])

	const removeFromCart = useCallback((id: Product['id']) => {
		setCartItems(prevItems => prevItems.filter(item => item.product.id !== id))
	}, [])

	const providerValue = useMemo(
		() => ({
			cartItems,
			addToCart,
			removeFromCart,
		}),
		[cartItems, addToCart, removeFromCart]
	)

	return (
		<CartContext.Provider value={providerValue}>
			{children}
		</CartContext.Provider>
	)
}

export { CartProvider, CartContext }
