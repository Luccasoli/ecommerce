import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import { useCart } from '@host/useCart'
import { TProduct } from '@shared/types'
import { FiShoppingCart } from 'react-icons/fi'

type TProductItemCardProps = {
	product: TProduct
}

export const ProductItemCard = ({ product }: TProductItemCardProps) => {
	const context = useCart()

	return (
		<Box key={product.id}>
			<Image mb="20px" src={product.image} />
			<Flex justifyContent="space-between">
				<Box>
					<Text>{product.name}</Text>
					<Text>{product.price}</Text>
				</Box>
				<IconButton
					aria-label="add-to-cart"
					icon={<FiShoppingCart />}
					onClick={() => context.addToCart(product)}
				/>
			</Flex>
		</Box>
	)
}
