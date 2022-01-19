import { Flex, Text } from '@chakra-ui/react'
// @ts-ignore
import Header from 'home/Header'

export const ProductDetailsPage = () => (
	<Flex flexDir="column">
		<Header />
		<Text p="16px" fontSize="2xl">
			Detalhes de produto
		</Text>
	</Flex>
)

export default ProductDetailsPage
