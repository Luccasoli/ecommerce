import React, {
	useState,
	useEffect,
	ReactChild,
	useCallback,
	useMemo,
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TCartItem, TProduct, TCartContext } from '@shared-types'

const CartContext = React.createContext<TCartContext>(undefined!)

type ContextProviderProps = {
	children: ReactChild
}

const CartProvider = ({ children }: ContextProviderProps) => {
	const [cartItems, setCartItems] = useState<TCartItem[]>([])

	useEffect(() => {
		let cartItemsData: TCartItem[] | null

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
		(newItem: TProduct) => {
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

	const removeFromCart = useCallback(
		(id: TProduct['id']) => {
			const existingItem = cartItems.find(item => item.product.id === id)

			if (existingItem && existingItem.quantity > 1) {
				setCartItems(prevItems =>
					prevItems.map(item =>
						item.product.id === id
							? {
									...item,
									quantity: item.quantity - 1,
							  }
							: item
					)
				)
			} else {
				setCartItems(prevItems =>
					prevItems.filter(item => item.product.id !== id)
				)
			}
		},
		[cartItems]
	)

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
