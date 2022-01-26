import { Product } from '@shared-types'

export type CartItem = {
	id: string
	product: Product
	quantity: number
}

export type TCartContext = {
	cartItems: CartItem[]
	addToCart: (newItem: Product) => void
	removeFromCart: (id: Product['id']) => void
}
