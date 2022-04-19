import {
	Button,
	Flex,
	FlexProps,
	FormControl,
	FormLabel,
	Heading,
	HeadingProps,
	Input,
	StackProps,
} from '@chakra-ui/react'
import Header from '@host/Header'
import { useUser } from '@host/useUser'
import { Helmet } from 'react-helmet'
import { useMutation } from '@host/react-query'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const SectionHeader = ({ children, ...props }: HeadingProps) => (
	<Heading
		as="h3"
		color="teal"
		py="24px"
		size="lg"
		textAlign="center"
		{...props}
	>
		{children}
	</Heading>
)

const Form = ({ children, ...props }: StackProps) => (
	<Flex as="form" flex={1} flexDir="column" gap="16px" {...props}>
		{children}
	</Flex>
)

const Card = ({ children, ...props }: FlexProps) => (
	<Flex
		as="section"
		bg="white"
		borderRadius="lg"
		borderWidth="1px"
		boxShadow="md"
		flex="1"
		flexDir="column"
		overflow="hidden"
		p="16px"
		{...props}
	>
		{children}
	</Flex>
)

const login = (args: { email: string; password: string }) =>
	axios.post('http://127.0.0.1:3333/login', args)

const register = (args: {
	firstName: string
	lastName: string
	CPF: string
	email: string
	password: string
}) => axios.post('http://127.0.0.1:3333/register', args)

export const AuthPage = () => {
	const [, setUser] = useUser()
	const navigate = useNavigate()

	const mutationLogin = useMutation(login, {
		onSuccess: response => {
			setUser({
				name: response.data.data.user.first_name,
				email: response.data.data.user.email,
				token: response.data.data.auth.token,
			})
			navigate('/')
		},
	})
	const mutationRegister = useMutation(register, {
		onSuccess: (_, variables) => {
			mutationLogin.mutate({
				email: variables.email,
				password: variables.password,
			})
		},
	})

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Tela Inicial</title>
			</Helmet>
			<Flex bg="gray.50" flexDirection="column" minH="100vh">
				<Header />
				<Flex
					as="main"
					flex={1}
					flexDirection="column"
					marginX="auto"
					maxW="100%"
					p="16px"
					width="container.lg"
				>
					<Heading as="h2" pb="36px" size="lg">
						Autenticação
					</Heading>
					<Flex
						alignItems={{ md: 'flex-start' }}
						flex={1}
						flexDirection={{
							sm: 'column',
							md: 'row',
						}}
						gap={8}
						justifyContent="center"
					>
						<Card>
							<SectionHeader>Cadastro</SectionHeader>
							<Form
								onSubmit={e => {
									e.preventDefault()

									const target = e.target as typeof e.target & {
										email: { value: string }
										password: { value: string }
										name: { value: string }
										cpf: { value: string }
										cep: { value: string }
									}

									const promise = () =>
										mutationRegister.mutateAsync({
											firstName: target.name.value.split(' ')[0],
											lastName: target.name.value.split(' ')[1] || '',
											CPF: target.cpf.value,
											email: target.email.value,
											password: target.password.value,
										})

									toast.promise(promise(), {
										loading: 'Aguarde...',
										success: 'Autenticado com sucesso!',
										error: 'Erro ao autenticar',
									})
								}}
							>
								<FormControl isRequired>
									<FormLabel htmlFor="name">Nome Completo</FormLabel>
									<Input
										id="name"
										name="name"
										placeholder="Lucas Mesquita"
										variant="filled"
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel htmlFor="email">E-mail</FormLabel>
									<Input
										id="email"
										name="email"
										placeholder="lucas.mesquita@gmail.com"
										variant="filled"
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel htmlFor="password">Senha</FormLabel>
									<Input
										id="password"
										name="password"
										placeholder="********"
										type="password"
										variant="filled"
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel htmlFor="confirmPassword">
										Repetir a Senha
									</FormLabel>
									<Input
										id="confirmPassword"
										name="confirmPassword"
										placeholder="********"
										type="password"
										variant="filled"
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel htmlFor="cpf">CPF</FormLabel>
									<Input
										id="cpf"
										name="cpf"
										placeholder="45X.XXX.XXX-7X"
										variant="filled"
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel htmlFor="cep">CEP</FormLabel>
									<Input
										id="cep"
										name="cep"
										placeholder="XXXXX-XXX"
										variant="filled"
									/>
								</FormControl>
								<Button colorScheme="teal" mt={8} type="submit" w="100%">
									Concluir
								</Button>
							</Form>
						</Card>
						<Card>
							<SectionHeader>Acesso</SectionHeader>
							<Form
								onSubmit={e => {
									e.preventDefault()

									const promise = () =>
										mutationLogin.mutateAsync({
											email: 'lucas@gmail.com',
											password: 'admin123',
										})

									toast.promise(promise(), {
										loading: 'Aguarde...',
										success: 'Autenticado com sucesso!',
										error: 'Erro ao autenticar',
									})
								}}
							>
								<FormControl isRequired>
									<FormLabel htmlFor="email">E-mail</FormLabel>
									<Input
										id="email"
										placeholder="lucas.mesquita@gmail.com"
										variant="filled"
									/>
								</FormControl>
								<FormControl isRequired>
									<FormLabel htmlFor="password">Senha</FormLabel>
									<Input
										colorScheme="teal"
										id="password"
										placeholder="****"
										type="password"
										variant="filled"
									/>
								</FormControl>
								<Button
									colorScheme="teal"
									mt={8}
									type="submit"
									variant="outline"
									w="100%"
								>
									Entrar
								</Button>
							</Form>
						</Card>
					</Flex>
				</Flex>
			</Flex>
		</>
	)
}

export default AuthPage
