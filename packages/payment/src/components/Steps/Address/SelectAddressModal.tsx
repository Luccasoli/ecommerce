/* eslint-disable react/require-default-props */
import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from '@chakra-ui/react'

type Props = {
	onSave?: () => void
	isOpen: boolean
	onClose: () => void
}

const CardAddress = ({ selected }: { selected?: boolean }) => (
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
		<Text color={selected ? '' : 'gray.500'}>Rua Frei Odilon, 624</Text>
		<Text color={selected ? '' : 'gray.500'}>
			Número: 624, BL. C11, QD. 01, AP. 01
		</Text>
		<Text color={selected ? '' : 'gray.500'}>CEP 60336190 - Fortaleza, CE</Text>
	</Flex>
)

export default ({ isOpen, onClose, onSave }: Props) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay />
		<ModalContent>
			<ModalHeader>Selecionar endereço</ModalHeader>
			<ModalCloseButton />
			<ModalBody display="flex" flexDir="column" gap={4}>
				<CardAddress selected />
				<CardAddress />
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
