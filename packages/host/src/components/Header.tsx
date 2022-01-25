import { SearchIcon } from '@chakra-ui/icons'
import {
	Button,
	Flex,
	Heading,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	LinkBox,
	LinkOverlay,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverHeader,
	PopoverTrigger,
	Portal,
	Text,
} from '@chakra-ui/react'
// @ts-ignore
import { useCart } from 'host/useCart'
import React from 'react'
import { FiBookmark, FiUser } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { CartItem } from './CartItem'
import { CartWithBadge } from './CartWithBadge'

const Header = () => {
	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)
	const context = useCart()

	return (
		<HStack
			as="nav"
			display="flex"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding={6}
			bg="teal.500"
			color="white"
			spacing={20}
		>
			<LinkBox>
				<Flex align="center" mr={5}>
					<Heading as="h1" size="lg" letterSpacing="tighter">
						<LinkOverlay as={RouterLink} to="/">
							Microfrontend Store
						</LinkOverlay>
					</Heading>
				</Flex>
			</LinkBox>

			<InputGroup size="md" flex={1}>
				<Input pr="4.5rem" placeholder="Busque aqui" />
				<InputRightElement width="4.5rem">
					<LinkBox>
						<LinkOverlay as={RouterLink} to="/search">
							<IconButton
								colorScheme="transparent"
								aria-label="search"
								onClick={handleClick}
								icon={<SearchIcon />}
							/>
						</LinkOverlay>
					</LinkBox>
				</InputRightElement>
			</InputGroup>

			<HStack spacing={4}>
				<IconButton
					colorScheme="teal"
					aria-label="Search database"
					icon={<FiBookmark size={20} />}
				/>
				<Popover>
					<PopoverTrigger>
						<CartWithBadge count={context.cartItems.length} />
					</PopoverTrigger>
					<Portal>
						<PopoverContent>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader>Seu carrinho</PopoverHeader>
							<PopoverBody>
								{context.cartItems.length > 0 ? (
									context.cartItems.map((item: any) => (
										<CartItem
											key={item.id}
											id={item.id}
											product={item.product}
											quantity={item.quantity}
										/>
									))
								) : (
									<Text>Não há itens no carrinho</Text>
								)}
							</PopoverBody>
						</PopoverContent>
					</Portal>
				</Popover>
				<Button
					leftIcon={<FiUser size={20} />}
					colorScheme="teal"
					variant="solid"
				>
					Acessar
				</Button>
			</HStack>
		</HStack>
	)
}

export default Header
