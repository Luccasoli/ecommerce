/* eslint-disable react/require-default-props */
import {
	Button,
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
} from '@chakra-ui/react'

type Props = {
	onSave?: () => void
	isOpen: boolean
	onClose: () => void
}

export default ({ isOpen, onClose, onSave }: Props) => (
	<Modal isOpen={isOpen} onClose={onClose}>
		<ModalOverlay />
		<ModalContent
			as="form"
			onSubmit={e => {
				e.preventDefault()

				const target = e.target as typeof e.target & {
					zipcode: { value: string }
					street: { value: string }
					number: { value: string }
					complement: { value: string }
					neighborhood: { value: string }
					city: { value: string }
					state: { value: string }
				}

				onSave?.()
			}}
		>
			<ModalHeader>Adicionando endereço</ModalHeader>
			<ModalCloseButton />
			<ModalBody
				display="grid"
				gridGap={4}
				gridTemplateColumns="repeat(4, 1fr)"
			>
				<FormControl gridColumn="1 / span 4">
					<FormLabel htmlFor="zipcode">CEP</FormLabel>
					<Input
						id="zipcode"
						name="zipcode"
						placeholder="00000-000"
						variant="filled"
					/>
				</FormControl>
				<FormControl gridColumn="1 / span 3" isRequired>
					<FormLabel htmlFor="street">Logradouro</FormLabel>
					<Input
						id="street"
						name="street"
						placeholder="Rua Alameda"
						variant="filled"
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="number">Número</FormLabel>
					<Input id="number" name="number" placeholder="120" variant="filled" />
				</FormControl>
				<FormControl gridColumn="1 / span 4">
					<FormLabel htmlFor="complement">Complemento</FormLabel>
					<Input
						id="complement"
						name="complement"
						placeholder="Bloco A"
						variant="filled"
					/>
				</FormControl>
				<FormControl gridColumn="1 / span 4">
					<FormLabel htmlFor="neighborhood">Bairro</FormLabel>
					<Input
						id="neighborhood"
						name="neighborhood"
						placeholder="Centro"
						variant="filled"
					/>
				</FormControl>
				<FormControl gridColumn="1 / span 3">
					<FormLabel htmlFor="city" gridColumn="1 / span 3">
						Cidade
					</FormLabel>
					<Input
						id="city"
						name="city"
						placeholder="São Paulo"
						variant="filled"
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="state">UF</FormLabel>
					<Input id="state" name="state" placeholder="SP" variant="filled" />
				</FormControl>
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
