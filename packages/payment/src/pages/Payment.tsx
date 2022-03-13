import { Flex, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'

export const PaymentPage = () => (
	<>
		<Helmet>
			<meta charSet="utf-8" />
			<title>Nome do produto</title>
		</Helmet>
		<Flex flexDir="column">
			<Text p="16px" fontSize="2xl">
				Detalhes de produto
			</Text>
		</Flex>
	</>
)

export default PaymentPage
