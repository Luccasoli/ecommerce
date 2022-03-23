/* eslint-disable @typescript-eslint/no-shadow */
import { Button, Flex, Heading, LinkBox, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import { Link as RouterLink } from 'react-router-dom'
import { Step, Steps, useSteps } from '@payment/Stepper'

const content = (
	<Flex py={4} flex={1}>
		<Text>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita in
			quod, illum modi non autem dolore reiciendis aspernatur architecto rem
			placeat qui harum aliquid ipsam, labore consequuntur quia vel temporibus.
		</Text>
	</Flex>
)

const steps = [
	{ label: 'Carrinho', content },
	{ label: 'Identificação', content },
	{ label: 'Pagamento', content },
	{ label: 'Confirmação', content },
	{ label: 'Conclusão', content },
]

export const PaymentPage = () => {
	const { nextStep, prevStep, reset, activeStep } = useSteps({
		initialStep: 2,
	})

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Nome do produto</title>
			</Helmet>
			<Flex px={6} bg="gray.50" flexDirection="column" minH="100vh">
				<Flex py={6}>
					<LinkBox as={RouterLink} to="/">
						<Heading as="h1" letterSpacing="tighter" size="lg">
							Microfrontend Store
						</Heading>
					</LinkBox>
				</Flex>
				<Steps activeStep={activeStep}>
					{steps.map(({ label, content }) => (
						<Step flex={1} label={label} key={label}>
							{content}
						</Step>
					))}
				</Steps>
				{activeStep === steps.length ? (
					<Flex p={4}>
						<Button mx="auto" size="sm" onClick={reset}>
							Reset
						</Button>
					</Flex>
				) : (
					<Flex width="100%" justify="flex-end">
						<Button
							isDisabled={activeStep === 0}
							mr={4}
							onClick={prevStep}
							size="sm"
							variant="ghost"
						>
							Prev
						</Button>
						<Button size="sm" onClick={nextStep}>
							{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
						</Button>
					</Flex>
				)}
			</Flex>
		</>
	)
}

export default PaymentPage
