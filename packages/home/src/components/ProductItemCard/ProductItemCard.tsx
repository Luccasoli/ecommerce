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
		<Box key={product.id}>
			<LinkBox as={RouterLink} to={`/product_details/${product.id}`}>
				<Image mb="20px" src={product.image} />
			</LinkBox>
			<Flex justifyContent="space-between">
				<LinkBox as={RouterLink} to={`/product_details/${product.id}`}>
					<Text>{product.name}</Text>
					<Text>{product.price}</Text>
				</LinkBox>
				<IconButton
					aria-label="add-to-cart"
					icon={<FiShoppingCart />}
					onClick={() => context.addToCart(product)}
				/>
			</Flex>
		</Box>
	)
}
