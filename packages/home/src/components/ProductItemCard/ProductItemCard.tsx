import { Box, Flex, IconButton, Image, LinkBox, Text } from '@chakra-ui/react'
import { useCart } from '@host/useCart'
import { TProduct } from '@shared/types'
import { FiShoppingCart } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'

type TProductItemCardProps = {
	product: TProduct
}

export const ProductItemCard = ({ product }: TProductItemCardProps) => {
	const context = useCart()

	return (
		<LinkBox
			key={product.id}
			as={RouterLink}
			to={`/product_details/${product.id}`}
		>
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
		</LinkBox>
	)
}
