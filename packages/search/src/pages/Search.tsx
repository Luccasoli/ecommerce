import { Flex, Grid, HStack, IconButton, Input, Text } from '@chakra-ui/react'
import { ProductItemCard } from '@home/ProductItemCard'
import { useFetch } from '@home/useFetch'
import Header from '@host/Header'
import { useLocation } from 'react-router-dom'
import { ChevronRightIcon } from '@chakra-ui/icons'

const Filters = () => (
	<Flex
		bg="white"
		borderRadius="lg"
		borderWidth="1px"
		boxShadow="md"
		flex="1"
		flexDir="column"
		minH="50vh"
		overflow="hidden"
		p={4}
	>
		<Text fontSize="2xl">Preço</Text>
		<Flex alignItems="center" gap="2">
			<Input placeholder="Mínimo" size="sm" />
			<Input placeholder="Máximo" size="sm" />
			<IconButton
				aria-label="filter-price"
				colorScheme="teal"
				icon={<ChevronRightIcon />}
				onClick={() => {}}
				size="sm"
				variant="outline"
			/>
		</Flex>
	</Flex>
)

export const SearchPage = () => {
	const { data, loading, error } = useFetch(
		'http://localhost:3000/products?_page=1'
	)
	const location = useLocation()

	function renderSearch() {
		if (loading) {
			return <Text>Loading...</Text>
		}

		if (error) {
			return <Text>Error!</Text>
		}

		return (
			<Grid flex="4" gap={8} gridTemplateColumns="1fr 1fr 1fr" mt={8}>
				{data
					?.filter(item => {
						const params = new URLSearchParams(location.search)
						const search = params.get('query')!

						return item.name.toLowerCase().includes(search.toLowerCase())
					})
					.map(product => (
						<ProductItemCard product={product} />
					))}
			</Grid>
		)
	}

	return (
		<Flex bg="gray.50" flexDir="column">
			<Header />
			<Text fontSize="2xl" p="16px">
				Resultado da busca: <Text as="strong">aspirador de pó</Text>
			</Text>
			<HStack
				alignItems="flex-start"
				className="HStack"
				display="flex"
				px="16px"
				spacing={20}
			>
				<Filters />
				{renderSearch()}
			</HStack>
		</Flex>
	)
}

export default SearchPage
