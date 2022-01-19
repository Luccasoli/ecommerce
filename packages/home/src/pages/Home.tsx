import { Box, Flex, Grid, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { Helmet } from 'react-helmet'
import Header from '../components/Header'

const useFetch = (url: string) => {
	const [data, setData] = React.useState<any>()
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState<any>()

	React.useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url)
				const json = await response.json()
				setData(json)
				setLoading(false)
			} catch (e) {
				setError(e)
				setLoading(false)
			}
		}
		fetchData()
	}, [url])

	return { data, loading, error }
}

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

		return data.map((product: any) => (
			<Box key={product.id}>
				<Image src={product.image} />
				<Text>{product.name}</Text>
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
				<Image
					my="16px"
					px="16px"
					height="200px"
					width="100%"
					objectFit="cover"
					src="https://www.dommen.com.br/image/cache/catalog/banners_top/banner_novoano-2000x500w.jpg"
					alt="Dan Abramov"
				/>
				<Text p="16px" fontSize="2xl">
					Mais vendidos
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
