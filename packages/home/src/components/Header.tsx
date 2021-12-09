import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Flex,
	Heading,
	Link,
	HStack,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	useDisclosure,
	Text,
	Icon,
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { FiShoppingCart, FiBookmark, FiUser } from 'react-icons/fi'
// Update: Check these awesome headers from Choc UI 👇
// https://choc-ui.tech/docs/elements/headers
const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const handleToggle = () => (isOpen ? onClose() : onOpen())

	const [show, setShow] = React.useState(false)
	const handleClick = () => setShow(!show)

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
			<Flex align="center" mr={5}>
				<Heading as="h1" size="lg" letterSpacing="tighter">
					Microfrontend Store
				</Heading>
			</Flex>

			<InputGroup size="md" flex={1}>
				<Input pr="4.5rem" placeholder="Busque aqui" />
				<InputRightElement width="4.5rem">
					<IconButton
						colorScheme="transparent"
						aria-label="search"
						onClick={handleClick}
						icon={<SearchIcon />}
					>
						{show ? 'Hide' : 'Show'}
					</IconButton>
				</InputRightElement>
			</InputGroup>

			<HStack spacing={4}>
				<IconButton
					colorScheme="teal"
					aria-label="Search database"
					icon={<FiBookmark size={20} />}
				/>
				<IconButton
					colorScheme="teal"
					aria-label="Search database"
					icon={<FiShoppingCart size={20} />}
				/>
				<Button
					leftIcon={<FiUser size={20} />}
					colorScheme="teal"
					variant="solid"
				>
					Acessar
				</Button>
			</HStack>

			{/* <Stack
				direction={{ base: 'column', md: 'row' }}
				display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
				width={{ base: 'full', md: 'auto' }}
				alignItems="center"
				flexGrow={1}
				mt={{ base: 4, md: 0 }}
			>
				<Link as={RouterLink} to="/home">
					Home
				</Link>
			</Stack> */}

			{/* <Box
				display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
				mt={{ base: 4, md: 0 }}
			>
				<Button
					variant="outline"
					_hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
				>
					Create account
				</Button>
			</Box> */}
		</HStack>
	)
}

export default Header
