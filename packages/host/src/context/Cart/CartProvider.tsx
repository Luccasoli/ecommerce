/* eslint-disable import/no-extraneous-dependencies */
import React, {
	useState,
	useEffect,
	ReactChild,
	useCallback,
	useMemo,
} from 'react'
import { Product } from '@tcc-ecommerce/home/src/shared/types/Product'
import { v4 as uuidv4 } from 'uuid'

type CartItem = {
	id: string
	product: Product
	quantity: number
}

const CartContext = React.createContext<{
	cartItems: CartItem[]
	addToCart: (newItem: Product) => void
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

	const addToCart = useCallback(
		(newItem: Product) => {
			const existingItem = cartItems.find(
				item => item.product.id === newItem.id
			)

			if (existingItem) {
				setCartItems(prevItems =>
					prevItems.map(item =>
						item.product.id === newItem.id
							? {
									...item,
									quantity: item.quantity + 1,
							  }
							: item
					)
				)
			} else {
				setCartItems(prevItems => [
					...prevItems,
					{ id: uuidv4(), product: newItem, quantity: 1 },
				])
			}
		},
		[cartItems]
	)

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
