export type TProduct = {
	id: string
	name: string
	price: number
	image: string
}

export type TCartItem = {
	id: string
	product: TProduct
	quantity: number
}

export type TCartContext = {
	cartItems: TCartItem[]
	addToCart: (newItem: TProduct) => void
	removeFromCart: (id: TProduct['id']) => void
}
