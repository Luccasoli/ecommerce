import { Flex, Heading } from '@chakra-ui/react'
import Header from '@host/Header'
import React from 'react'

export const ErrorPage = () => (
	<Flex flexDir="column" h="100vh">
		<Header />
		<Flex flex={1} alignItems="center">
			<Heading p="16px">
				Ocorreu uma falha com nossos serviços, tente novamente mais tarde.
			</Heading>
		</Flex>
	</Flex>
)

export default ErrorPage
