import {
	Box,
	Flex,
	Grid,
	Text,
	VStack,
	HStack,
	Image,
	IconButton,
} from '@chakra-ui/react'
import Header from '@host/Header'
import { useFetch } from '@home/useFetch'
import { TCartContext } from '@shared/types'
import { useCart } from '@host/useCart'
import { FiShoppingCart } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

export const SearchPage = () => {
	const { data, loading, error } = useFetch(
		'http://localhost:3000/products?_page=1'
	)
	const context = useCart() as TCartContext
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
						<Box key={product.id}>
							<Image mb="20px" src={product.image} />
							<Flex justifyContent="space-between">
								<Box>
									<Text>{product.name}</Text>
									<Text>{product.price}</Text>
								</Box>
								<IconButton
									aria-label="add-to-cart"
									icon={<FiShoppingCart />}
									onClick={() => context.addToCart(product)}
								/>
							</Flex>
						</Box>
					))}
			</Grid>
		)
	}

	return (
		<Flex flexDir="column">
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
				<Flex border="1px solid black" flex="1" minH="50vh" p={4}>
					<Text>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi eum
						nam dolores veritatis, deserunt quia quisquam, ex tenetur explicabo
						magnam saepe, dolorem dicta rem dolorum laudantium provident animi
						rerum at quod fugiat. Pariatur illo nostrum ipsa quam quidem? Error
						aut eveniet dignissimos magni hic laborum repellat animi ipsum
						impedit molestiae.
					</Text>
				</Flex>
				{renderSearch()}
			</HStack>
		</Flex>
	)
}

export default SearchPage
