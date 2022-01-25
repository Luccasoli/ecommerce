import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
// @ts-ignore
import { useCart } from 'host/useCart'

export const CartItem = ({ product, quantity }: any) => {
	const context = useCart()

	const priceAsNumber = parseFloat(product.price)

	const handleAdd = () => {
		context.addToCart(product)
	}
	const handleRemove = () => {
		context.removeFromCart(product.id)
	}

	return (
		<Flex mb="8px" alignItems="center">
			<Box mr="8px">
				<Image src={product.image} />
			</Box>
			<Text flex="1">{product.name}</Text>
			<Flex flexDirection="column">
				R$ {(priceAsNumber * quantity).toFixed(2)}
				<Flex alignItems="center">
					<IconButton
						size="sm"
						colorScheme="transparent"
						aria-label="search"
						onClick={handleRemove}
						icon={
							quantity > 1 ? (
								<FiMinus color="#030303" />
							) : (
								<FiTrash2 color="#030303" />
							)
						}
					/>
					<Text mx="8px">{quantity}</Text>
					<IconButton
						size="sm"
						colorScheme="transparent"
						aria-label="search"
						onClick={handleAdd}
						icon={<FiPlus color="#030303" />}
					/>
				</Flex>
			</Flex>
		</Flex>
	)
}
