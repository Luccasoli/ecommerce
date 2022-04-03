/* eslint-disable react/no-array-index-key */
import { Box, Flex, Grid, Heading, Icon, Image, Text } from '@chakra-ui/react'
import Header from '@host/Header'
import { Helmet } from 'react-helmet'
import { FiStar } from 'react-icons/fi'

export const ProductDetailsPage = () => (
	<>
		<Helmet>
			<meta charSet="utf-8" />
			<title>Nome do produto</title>
		</Helmet>
		<Flex bg="gray.50" flexDirection="column" minH="100vh">
			<Header />
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
						src="http://placeimg.com/640/480/tech?76053"
						width="100%"
					/>
				</Box>
				<Flex align="flex-start" gridColumn="9 / 13">
					<Flex align="center" gap="2">
						<Text fontSize="2xl">R$ 1.799,99</Text>
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
		</Flex>
	</>
)

export default ProductDetailsPage
