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
import {
	Link as RouterLink,
	useNavigate,
	useSearchParams,
} from 'react-router-dom'
import { useUser } from '../hooks/useUser'
import { CartItem } from './CartItem'
import { CartWithBadge } from './CartWithBadge'

const Header = () => {
	const context = useCart() as TCartContext
	const [user, setUser] = useUser()

	const inputRef = React.useRef<HTMLInputElement>(null!)
	const navigate = useNavigate()
	const hasCartItems = context.cartItems.length > 0
	const [searchParams] = useSearchParams()

	const quantityCartItems = useMemo(
		() =>
			context.cartItems.reduce(
				(acc: number, item: any) => acc + item.quantity,
				0
			) || 0,
		[context.cartItems]
	)

	const onSearch = () =>
		navigate(`/search?query=${inputRef.current?.value || ''}`)

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
			<LinkBox as={RouterLink} to="/">
				<Heading as="h1" letterSpacing="tighter" size="lg">
					Microfrontend Store
				</Heading>
			</LinkBox>

			<InputGroup flex={1} size="md">
				<Input
					ref={inputRef}
					_placeholder={{
						color: 'gray.50',
					}}
					defaultValue={searchParams.get('query') || ''}
					focusBorderColor="white"
					onKeyUp={event => {
						if (event.code === 'Enter') {
							event.preventDefault()
							onSearch()
						}
					}}
					placeholder="Busque aqui"
					pr="4.5rem"
				/>
				<InputRightElement width="4.5rem">
					<LinkBox>
						<IconButton
							aria-label="search"
							colorScheme="transparent"
							icon={<SearchIcon />}
							onClick={onSearch}
						/>
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
									<Text>N??o h?? itens no carrinho</Text>
								)}
							</PopoverBody>
							{hasCartItems && (
								<Button as={RouterLink} colorScheme="orange" to="/payment">
									Fechar pedido
								</Button>
							)}
						</PopoverContent>
					</Portal>
				</Popover>

				{user ? (
					<Flex align="center" gap={2}>
						<FiUser size={25} />
						<Flex flexDir="column">
							<Text fontSize="sm" fontWeight="bold">
								Ol??, Lucas
							</Text>
							<Flex align="baseline" gap={1}>
								<Text as={RouterLink} fontSize="sm" to="/">
									Minha conta
								</Text>{' '}
								|
								<Text
									cursor="pointer"
									fontSize="sm"
									onClick={() => setUser(null)}
								>
									Sair
								</Text>
							</Flex>
						</Flex>
					</Flex>
				) : (
					<Button
						as={RouterLink}
						colorScheme="teal"
						leftIcon={<FiUser size={20} />}
						to="/auth"
						variant="solid"
					>
						Acessar
					</Button>
				)}
			</HStack>
		</HStack>
	)
}

export default Header
