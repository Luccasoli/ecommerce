import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '@host/useCart'
import { TCartItem, TCartContext } from '@shared/types'

export const CartItem = ({ product, quantity }: TCartItem) => {
	const context = useCart() as TCartContext

	const priceAsNumber = product.price

	const handleAdd = () => {
		context.addToCart(product)
	}
	const handleRemove = () => {
		context.removeFromCart(product.id)
	}

	return (
		<Flex alignItems="center" mb="8px">
			<Box mr="8px">
				<Image src={product.image} />
			</Box>
			<Text flex="1" px="32px">
				{product.name}
			</Text>
			<Flex flexDirection="column">
				R$ {(priceAsNumber * quantity).toFixed(2)}
				<Flex alignItems="center">
					<IconButton
						aria-label="search"
						colorScheme="transparent"
						icon={
							quantity > 1 ? (
								<FiMinus color="#030303" />
							) : (
								<FiTrash2 color="#030303" />
							)
						}
						onClick={handleRemove}
						size="sm"
					/>
					<Text mx="8px">{quantity}</Text>
					<IconButton
						aria-label="search"
						colorScheme="transparent"
						icon={<FiPlus color="#030303" />}
						onClick={handleAdd}
						size="sm"
					/>
				</Flex>
			</Flex>
		</Flex>
	)
}
