import { HamburgerIcon } from '@chakra-ui/icons'
import {
	Box,
	Button,
	Flex,
	Heading,
	Link,
	Stack,
	useDisclosure,
} from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

// Update: Check these awesome headers from Choc UI 👇
// https://choc-ui.tech/docs/elements/headers
const Header = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const handleToggle = () => (isOpen ? onClose() : onOpen())

	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			padding={6}
			bg="teal.500"
			color="white"
		>
			<Flex align="center" mr={5}>
				<Heading as="h1" size="lg" letterSpacing="tighter">
					Chakra UI
				</Heading>
			</Flex>

			<Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
				<HamburgerIcon />
			</Box>

			<Stack
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
			</Stack>

			<Box
				display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
				mt={{ base: 4, md: 0 }}
			>
				<Button
					variant="outline"
					_hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
				>
					Create account
				</Button>
			</Box>
		</Flex>
	)
}

export default Header
