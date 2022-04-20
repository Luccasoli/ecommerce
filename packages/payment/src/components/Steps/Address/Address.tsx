import {
	Box,
	Button,
	Flex,
	Heading,
	Text,
	useDisclosure,
} from '@chakra-ui/react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import SaveAddressModal from './SaveAddressModal'
import SelectAddressModal from './SelectAddressModal'

const SelectedAddress = ({
	address,
	onSelectAddressModalOpen,
	onSaveAddressModalOpen,
}: any) => {
	const renderAddress = () => {
		if (!address) {
			return <Text>Nenhum endereço cadastrado</Text>
		}

		return (
			<>
				<Text>Rua Frei Odilon, 624</Text>
				<Text>Número: 624, BL. C11, QD. 01, AP. 01</Text>
				<Text>CEP 60336190 - Fortaleza, CE</Text>
			</>
		)
	}

	return (
		<Flex
			position="relative"
			minH="150px"
			bg="white"
			borderRadius="lg"
			overflow="hidden"
			my={4}
			px={12}
			justifyContent="center"
			flexDir="column"
		>
			<Box
				position="absolute"
				h="100%"
				bg="teal"
				width="4px"
				top="0"
				left="0"
			/>
			{renderAddress()}
			<Flex justifyContent="flex-end" gap={4}>
				<Button size="sm" disabled variant="ghost" colorScheme="teal">
					Editar
				</Button>
				<Button
					onClick={onSelectAddressModalOpen}
					size="sm"
					// disabled
					variant="ghost"
					colorScheme="teal"
				>
					Selecionar outro
				</Button>
				<Button
					onClick={onSaveAddressModalOpen}
					size="sm"
					variant="ghost"
					colorScheme="teal"
				>
					Adicionar endereço
				</Button>
			</Flex>
		</Flex>
	)
}

export default () => {
	const {
		isOpen: isSaveAddressModalOpen,
		onOpen: onSaveAddressModalOpen,
		onClose: onSaveAddressModalClose,
	} = useDisclosure()
	const {
		isOpen: isSelectAddressModalOpen,
		onOpen: onSelectAddressModalOpen,
		onClose: onSelectAddressModalClose,
	} = useDisclosure()

	return (
		<>
			<SaveAddressModal
				isOpen={isSaveAddressModalOpen}
				onClose={onSaveAddressModalClose}
			/>
			<SelectAddressModal
				isOpen={isSelectAddressModalOpen}
				onClose={onSelectAddressModalClose}
			/>
			<Box p={6}>
				<Heading
					display="flex"
					alignItems="center"
					gap={4}
					as="h1"
					letterSpacing="tighter"
					size="lg"
				>
					<FaMapMarkerAlt size={20} /> Selecionar endereço:
				</Heading>

				<SelectedAddress
					onSelectAddressModalOpen={onSelectAddressModalOpen}
					onSaveAddressModalOpen={onSaveAddressModalOpen}
				/>
			</Box>
		</>
	)
}
