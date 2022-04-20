/* eslint-disable react/require-default-props */
import { Text } from '@chakra-ui/react'

type Props = {
	address: {
		identification: string
		street: string
		number: string
		complement?: string
		neighborhood: string
		city: string
		state: string
		postalCode: string
	}
}

export default ({
	address: {
		identification,
		street,
		number,
		complement,
		neighborhood,
		city,
		state,
		postalCode,
	},
}: Props) => (
	<>
		<Text fontWeight="bold">Identificador: {identification}</Text>
		<Text>{street}</Text>
		<Text>
			Número: {number}
			{complement ? `, ${complement} ` : ', '}
			{neighborhood}
		</Text>
		<Text>
			CEP {postalCode} - {city}, {state}
		</Text>
	</>
)
