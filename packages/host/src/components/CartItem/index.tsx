import { Box, Flex, IconButton, Image, Text } from '@chakra-ui/react'
import { FiMinus, FiPlus } from 'react-icons/fi'

export const CartItem = ({ product, quantity }: any) => {
	const handleAdd = () => {}
	const handleRemove = () => {}

	const priceAsNumber = parseFloat(product.price)

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
						icon={<FiMinus color="#030303" />}
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
