import { Box, Flex, Grid, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Helmet } from 'react-helmet'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart } from '@host/useCart'
import Header from '@host/Header'
import { Product } from '@shared-types'

type Error = {
	message: string
}

const useFetch = (url: string) => {
	const [data, setData] = React.useState<Product[]>()
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState<Error | undefined>()

	React.useEffect(() => {
		let isMounted = true
		const fetchData = async () => {
			try {
				const response = await fetch(url)
				const json = await response.json()
				if (isMounted) {
					setData(json)
					setLoading(false)
				}
			} catch (e) {
				if (isMounted) {
					setError(e as Error)
					setLoading(false)
				}
			}
		}
		fetchData()

		return () => {
			isMounted = false
		}
	}, [url])

	return { data, loading, error }
}

export const HomePage = () => {
	const { data, loading, error } = useFetch(
		'http://localhost:3000/products?_page=1'
	)

	const context = useCart()

	const renderProducts = () => {
		if (loading) {
			return <Text>Loading...</Text>
		}

		if (error) {
			return <Text>Error!</Text>
		}

		return data?.map(product => (
			<Box key={product.id}>
				<Image src={product.image} mb="20px" />
				<Flex justifyContent="space-between">
					<Box>
						<Text>{product.name}</Text>
						<Text>{product.price}</Text>
					</Box>
					<IconButton
						aria-label="add-to-cart"
						onClick={() => context.addToCart(product)}
						icon={<FiShoppingCart />}
					/>
				</Flex>
			</Box>
		))
	}

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Tela Inicial</title>
			</Helmet>
			<Flex flexDir="column">
				<Header />
				<Text p="16px" fontSize="2xl">
					Lista de produtos
				</Text>
				<Grid
					mt={8}
					px="16px"
					gap={8}
					gridTemplateColumns={{
						base: '1fr',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(3, 1fr)',
						xl: 'repeat(4, 1fr)',
					}}
				>
					{renderProducts()}
				</Grid>
			</Flex>
		</>
	)
}

export default HomePage
