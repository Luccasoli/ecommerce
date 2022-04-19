/* eslint-disable react/no-array-index-key */
import { Box, Flex, Grid, Heading, Icon, Image, Text } from '@chakra-ui/react'
import Header from '@host/Header'
import { Helmet } from 'react-helmet'
import { FiStar } from 'react-icons/fi'
import { useQuery } from '@host/react-query'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const convertToLocalCurrency = (price: number) => {
	const localCurrency = 'BRL'
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: localCurrency,
	}).format(price / 100)
}

export const ProductDetailsPage = () => {
	const { productId } = useParams()
	const { isLoading, data } = useQuery('product', () =>
		axios.get(`http://127.0.0.1:3333/products/${productId}`)
	)

	const product = data?.data.payload as {
		id: number
		name: string
		description: string
		selling_price: number
		cost_price: number
		image_url: string
		image_alt: string
		category_id: number
		created_at: Date
		updated_at: Date
	}

	function renderContent() {
		if (isLoading) {
			return <Text>Carregando...</Text>
		}

		return (
			<Grid
				as="main"
				columnGap={2}
				flex={1}
				marginX="auto"
				maxW="100%"
				p="16px"
				templateColumns="repeat(12, 1fr)"
				templateRows="min-content 1fr"
				width="container.2xl"
			>
				<Heading as="h2" gridColumn="1 / 13" pb="36px" size="lg">
					Nome do produto muito extenso
				</Heading>
				<Box gridColumn="1 / 8">
					<Image
						alt="Dan Abramov"
						border="1px teal solid"
						height="60%"
						objectFit="contain"
						src={product?.image_url}
						width="100%"
					/>
				</Box>
				<Flex align="flex-start" gridColumn="9 / 13">
					<Flex align="center" gap="2">
						<Text fontSize="2xl">
							{convertToLocalCurrency(product?.selling_price)}
						</Text>
						<Flex align="center">
							{[...Array(5)].map((_, index) => (
								<Icon
									key={index}
									as={FiStar}
									fill="gold"
									h={5}
									outlineColor="grey"
									w={5}
								/>
							))}
						</Flex>
					</Flex>
				</Flex>
			</Grid>
		)
	}

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Nome do produto</title>
			</Helmet>
			<Flex bg="gray.50" flexDirection="column" minH="100vh">
				<Header />
				{renderContent()}
			</Flex>
		</>
	)
}
export default ProductDetailsPage
