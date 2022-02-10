import { Flex, Text } from '@chakra-ui/react'
import Header from '@host/Header'

export const AuthhPage = () => (
	<Flex flexDir="column">
		<Header />
		<Text p="16px" fontSize="2xl">
			Autenticação
		</Text>
	</Flex>
)

export default AuthhPage
