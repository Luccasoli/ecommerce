/* eslint-disable react/require-default-props */
import {
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	Text,
} from '@chakra-ui/react'
import { useQuery, useQueryClient } from '@host/react-query'
import { useUser } from '@host/useUser'
import axios from 'axios'
import AddressTextStructure from './AddressTextStructure'

type Props = {
	onSave?: () => void
	isOpen: boolean
	onClose: () => void
}

const CardAddress = ({
	address,
}: {
	address: {
		identification: string
		address: string
		number: string
		complement?: string
		neighborhood: string
		city: string
		state: string
		postalCode: string
		isActive: boolean
	}
}) => {
	const {
		isActive: selected,
		address: street,
		city,
		identification,
		neighborhood,
		number,
		postalCode,
		state,
		complement,
	} = address
	return (
		<Flex
			as="button"
			borderWidth={selected ? '4px' : '0px'}
			borderColor={selected ? 'teal' : ''}
			position="relative"
			bg="gray.50"
			borderRadius="lg"
			overflow="hidden"
			p={4}
			justifyContent="center"
			flexDir="column"
		>
			<AddressTextStructure
				address={{
					identification,
					street,
					number,
					complement,
					neighborhood,
					city,
					state,
					postalCode,
				}}
			/>
		</Flex>
	)
}

export default ({ isOpen, onClose, onSave }: Props) => {
	const [user] = useUser()
	const queryClient = useQueryClient()

	// FIXME
	const id = (queryClient.getQueryData('activeAddress') as any)?.data?.data
		?.payload.id

	const { isLoading, data } = useQuery('addresses', () =>
		axios.get(`http://127.0.0.1:3333/address`, {
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		})
	)

	const addresses = data?.data?.payload

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Selecionar endereço</ModalHeader>
				<ModalCloseButton />
				<ModalBody display="flex" flexDir="column" gap={4}>
					{isLoading ? (
						<>
							<Skeleton height="20px" />
							<Skeleton height="20px" />
							<Skeleton height="20px" />
						</>
					) : (
						addresses.map((item: any) => (
							<CardAddress
								key={item.id}
								address={{ ...item, isActive: item.id === id }}
							/>
						))
					)}
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="teal" type="submit" mr={3}>
						Salvar
					</Button>
					<Button variant="ghost" onClick={onClose}>
						Cancelar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
