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
				templateColumns="repeat(12, 1fr)"
				templateRows="min-content 1fr"
				columnGap={2}
				flex={1}
				marginX="auto"
				maxW="100%"
				p="16px"
				width="container.2xl"
			>
				<Heading gridColumn="1 / 13" as="h2" pb="36px" size="lg">
					Nome do produto muito extenso
				</Heading>
				<Box gridColumn="1 / 8">
					<Image
						border="1px teal solid"
						height="60%"
						objectFit="contain"
						width="100%"
						src="http://placeimg.com/640/480/tech?76053"
						alt="Dan Abramov"
					/>
				</Box>
				<Flex gridColumn="9 / 13" align="flex-start">
					<Flex align="center" gap="2">
						<Text fontSize="2xl">R$ 1.799,99</Text>
						<Flex align="center">
							{[...Array(5)].map((_, index) => (
								<Icon
									w={5}
									h={5}
									key={index}
									as={FiStar}
									fill="gold"
									outlineColor="grey"
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
