import { Flex, Grid, Heading, Text } from '@chakra-ui/react'
import Header from '@host/Header'
import { Helmet } from 'react-helmet'
import { ProductItemCard } from '@home/ProductItemCard'
import { useFetch } from '../hooks/useFetch'

export const HomePage = () => {
	const { data, loading, error } = useFetch(
		'http://localhost:3000/products?_page=1'
	)

	const renderProducts = () => {
		if (loading) {
			return <Text>Loading...</Text>
		}

		if (error) {
			return <Text>Error!</Text>
		}

		return data?.map(product => <ProductItemCard product={product} />)
	}

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Tela Inicial</title>
			</Helmet>
			<Flex flexDir="column" minH="100vh">
				<Header />
				<Heading as="h2" p="16px" size="lg">
					Lista de produtos
				</Heading>
				<Grid
					gap={8}
					gridTemplateColumns={{
						base: '1fr',
						md: 'repeat(2, 1fr)',
						lg: 'repeat(3, 1fr)',
						xl: 'repeat(4, 1fr)',
					}}
					mt={8}
					px="16px"
				>
					{renderProducts()}
				</Grid>
			</Flex>
		</>
	)
}

export default HomePage
