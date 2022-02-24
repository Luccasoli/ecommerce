import {
	Button,
	Center,
	Divider,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	HeadingProps,
	Input,
	StackProps,
	VStack,
} from '@chakra-ui/react'
import Header from '@host/Header'
import { Helmet } from 'react-helmet'

const SectionHeader = ({ children, ...props }: HeadingProps) => (
	<Heading as="h3" pb="24px" size="md" textAlign="center" {...props}>
		{children}
	</Heading>
)

const Form = ({ children, ...props }: StackProps) => (
	<VStack as="form" flex={1} flexDir="column" spacing="16px" {...props}>
		{children}
	</VStack>
)

export const AuthPage = () => (
	<>
		<Helmet>
			<meta charSet="utf-8" />
			<title>Tela Inicial</title>
		</Helmet>
		<Flex flexDirection="column" minH="100vh">
			<Header />
			<Flex as="main" flex={1} flexDirection="column" p="16px">
				<Heading as="h2" pb="36px" size="lg">
					Autenticação
				</Heading>
				<Flex flex={1} justifyContent="center" mx="10%">
					<Flex as="section" flex="1" flexDir="column" px="16px">
						<SectionHeader>Cadastro</SectionHeader>
						<Form>
							<FormControl isRequired>
								<FormLabel htmlFor="name">Nome Completo</FormLabel>
								<Input id="name" name="name" placeholder="" />
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor="email">E-mail</FormLabel>
								<Input id="email" name="email" placeholder="" />
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor="password">Senha</FormLabel>
								<Input
									id="password"
									name="password"
									placeholder=""
									type="password"
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor="confirmPassword">Repetir a Senha</FormLabel>
								<Input
									id="confirmPassword"
									name="confirmPassword"
									placeholder=""
									type="password"
								/>
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor="cpf">CPF</FormLabel>
								<Input id="cpf" name="cpf" placeholder="" />
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor="cep">CEP</FormLabel>
								<Input id="cep" name="cep" placeholder="" />
							</FormControl>
							<Button bg="teal" color="white" type="submit">
								Concluir
							</Button>
						</Form>
					</Flex>
					<Center flex={1} px="24px">
						<Divider orientation="vertical" />
					</Center>
					<Flex as="section" flex="1" flexDir="column" px="16px">
						<SectionHeader>Acesso</SectionHeader>
						<Form>
							<FormControl isRequired>
								<FormLabel htmlFor="email">E-mail</FormLabel>
								<Input id="email" placeholder="" />
							</FormControl>
							<FormControl isRequired>
								<FormLabel htmlFor="password">Senha</FormLabel>
								<Input id="password" placeholder="****" type="password" />
							</FormControl>
							<Button bg="pink" type="submit">
								Entrar
							</Button>
						</Form>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	</>
)

export default AuthPage
