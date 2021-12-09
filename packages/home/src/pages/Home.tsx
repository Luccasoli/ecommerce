import { Flex, Image, Text, Grid, Box, VStack } from '@chakra-ui/react'
import Header from '../components/Header'

export const HomePage = () => (
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
		<Text px="16px" fontSize="2xl">
			Mais vendidos
		</Text>
		<Grid mt={8} px="16px" gap={8} gridTemplateColumns="1fr 1fr 1fr 1fr">
			{new Array(14).fill(0).map((_, index) => (
				<VStack spacing={8} key={index.toString()}>
					<Box height={100} width="100%" backgroundColor="teal" />
					<Text>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora,
						recusandae!
					</Text>
				</VStack>
			))}
		</Grid>
	</Flex>
)

export default HomePage
