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
import { Helmet } from 'react-helmet'

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

export const AuthPage = () => (
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
						<Form>
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
								<FormLabel htmlFor="confirmPassword">Repetir a Senha</FormLabel>
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
						<Form>
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

export default AuthPage
