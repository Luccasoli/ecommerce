import {
	Box,
	Button,
	Flex,
	Heading,
	Skeleton,
	Text,
	useDisclosure,
} from '@chakra-ui/react'
import axios from 'axios'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { useQuery } from '@host/react-query'
import { useUser } from '@host/useUser'
import SaveAddressModal from './SaveAddressModal'
import SelectAddressModal from './SelectAddressModal'
import AddressTextStructure from './AddressTextStructure'

const SelectedAddress = ({
	onSelectAddressModalOpen,
	onSaveAddressModalOpen,
}: any) => {
	const [user] = useUser()
	const { isLoading, data } = useQuery('activeAddress', () =>
		axios.get(`http://127.0.0.1:3333/address/active`, {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		})
	)

	const renderAddress = () => {
		if (isLoading) {
			return (
				<>
					<Skeleton height="20px" />
					<Skeleton height="20px" />
					<Skeleton height="20px" />
				</>
			)
		}

		if (!data) {
			return <Text>Nenhum endereço cadastrado</Text>
		}

		const {
			identification,
			address,
			number,
			complement,
			neighborhood,
			city,
			state,
			postal_code: postalCode,
		} = data.data.payload

		return (
			<AddressTextStructure
				address={{
					identification,
					street: address,
					number,
					complement,
					neighborhood,
					city,
					state,
					postalCode,
				}}
			/>
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
