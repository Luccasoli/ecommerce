import { ChevronRightIcon } from '@chakra-ui/icons'
import {
	Divider,
	Flex,
	Grid,
	HStack,
	IconButton,
	Input,
	Text,
} from '@chakra-ui/react'
import { ProductItemCard } from '@home/ProductItemCard'
import { useFetch } from '@home/useFetch'
import Header from '@host/Header'
import { SyntheticEvent } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

const Filters = () => {
	const [searchParams, setSearchParams] = useSearchParams()

	const onFilterPrice = (e: SyntheticEvent) => {
		e.preventDefault()
		const target = e.target as typeof e.target & {
			min: { value?: string }
			max: { value?: string }
		}

		searchParams.delete('min')
		searchParams.delete('max')

		if (target.min.value) {
			searchParams.set('min', target.min.value)
		}

		if (target.max.value) {
			searchParams.set('max', target.max.value)
		}

		setSearchParams(searchParams)
	}

	return (
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
			<Flex alignItems="center" mb="2">
				<Text fontSize="lg">Preço</Text>{' '}
				<Divider borderTop="1px solid teal" ml="2" />
			</Flex>
			<Flex alignItems="center" as="form" gap="2" onSubmit={onFilterPrice}>
				<Input defaultValue="25" name="min" placeholder="Mínimo" size="sm" />
				<Input
					defaultValue="123.23"
					name="max"
					placeholder="Máximo"
					size="sm"
				/>
				<IconButton
					aria-label="filter-price"
					colorScheme="teal"
					icon={<ChevronRightIcon />}
					size="sm"
					type="submit"
					variant="outline"
				/>
			</Flex>
		</Flex>
	)
}

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
						const search = params.get('query') || ''

						return item.name.toLowerCase().includes(search.toLowerCase())
					})
					.map(product => (
						<ProductItemCard key={product.id} product={product} />
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
