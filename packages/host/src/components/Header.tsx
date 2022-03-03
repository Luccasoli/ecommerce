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
import { useCart } from '@host/useCart'
import { TCartContext } from '@shared/types'
import React, { useMemo } from 'react'
import { FiBookmark, FiUser } from 'react-icons/fi'
import { Link as RouterLink } from 'react-router-dom'
import { CartItem } from './CartItem'
import { CartWithBadge } from './CartWithBadge'

const Header = () => {
	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)
	const context = useCart() as TCartContext

	const hasCartItems = context.cartItems.length > 0

	const quantityCartItems = useMemo(
		() =>
			context.cartItems.reduce(
				(acc: number, item: any) => acc + item.quantity,
				0
			) || 0,
		[context.cartItems]
	)

	return (
		<HStack
			align="center"
			as="nav"
			bg="teal.500"
			color="white"
			display="flex"
			justify="space-between"
			padding={6}
			spacing={20}
			wrap="wrap"
		>
			<LinkBox>
				<Flex align="center" mr={5}>
					<Heading as="h1" letterSpacing="tighter" size="lg">
						<LinkOverlay as={RouterLink} to="/">
							Microfrontend Store
						</LinkOverlay>
					</Heading>
				</Flex>
			</LinkBox>

			<InputGroup flex={1} size="md">
				<Input placeholder="Busque aqui" pr="4.5rem" />
				<InputRightElement width="4.5rem">
					<LinkBox>
						<LinkOverlay as={RouterLink} to="/search">
							<IconButton
								aria-label="search"
								colorScheme="transparent"
								icon={<SearchIcon />}
								onClick={handleClick}
							/>
						</LinkOverlay>
					</LinkBox>
				</InputRightElement>
			</InputGroup>

			<HStack spacing={4}>
				<IconButton
					aria-label="Search database"
					colorScheme="teal"
					icon={<FiBookmark size={20} />}
				/>
				<Popover variant="responsive">
					<PopoverTrigger>
						<CartWithBadge count={quantityCartItems} />
					</PopoverTrigger>
					<Portal>
						<PopoverContent>
							<PopoverArrow />
							<PopoverCloseButton />
							<PopoverHeader>Seu carrinho</PopoverHeader>
							<PopoverBody>
								{hasCartItems ? (
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
							{hasCartItems && (
								<Button as={RouterLink} colorScheme="orange" to="/">
									Fechar pedido
								</Button>
							)}
						</PopoverContent>
					</Portal>
				</Popover>

				<Button
					as={RouterLink}
					colorScheme="teal"
					leftIcon={<FiUser size={20} />}
					to="/auth"
					variant="solid"
				>
					Acessar
				</Button>
			</HStack>
		</HStack>
	)
}

export default Header
