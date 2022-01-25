import { Box, Flex, Grid, Text, VStack, HStack } from '@chakra-ui/react'
// @ts-ignore
import Header from '@home/Header'

export const SearchPage = () => (
	<Flex flexDir="column">
		<Header />
		<Text p="16px" fontSize="2xl">
			Resultado da busca: <Text as="strong">aspirador de pó</Text>
		</Text>
		<HStack
			px="16px"
			className="HStack"
			display="flex"
			alignItems="flex-start"
			spacing={20}
		>
			<Flex p={4} border="1px solid black" flex="1" minH="50vh">
				<Text>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi eum
					nam dolores veritatis, deserunt quia quisquam, ex tenetur explicabo
					magnam saepe, dolorem dicta rem dolorum laudantium provident animi
					rerum at quod fugiat. Pariatur illo nostrum ipsa quam quidem? Error
					aut eveniet dignissimos magni hic laborum repellat animi ipsum impedit
					molestiae.
				</Text>
			</Flex>
			<Grid flex="4" mt={8} gap={8} gridTemplateColumns="1fr 1fr 1fr">
				{new Array(5).fill(0).map((_, index) => (
					<VStack spacing={8} key={index.toString()}>
						<Box height={100} width="100%" backgroundColor="teal" />
						<Text>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora,
							recusandae!
						</Text>
					</VStack>
				))}
			</Grid>
		</HStack>
	</Flex>
)

export default SearchPage
