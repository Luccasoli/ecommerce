/* eslint-disable @typescript-eslint/no-shadow */
import { Button, Flex, Heading, LinkBox, Text } from '@chakra-ui/react'
import { Helmet } from 'react-helmet'
import { Link as RouterLink } from 'react-router-dom'
import { Step, Steps, useSteps } from '@payment/Stepper'

const content = (
	<Flex py={4}>
		<Text>
			Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita in
			quod, illum modi non autem dolore reiciendis aspernatur architecto rem
			placeat qui harum aliquid ipsam, labore consequuntur quia vel temporibus.
		</Text>
	</Flex>
)

const steps = [
	{ label: 'Step 1', content },
	{ label: 'Step 2', content },
	{ label: 'Step 3', content },
]

export const PaymentPage = () => {
	const { nextStep, prevStep, reset, activeStep } = useSteps({
		initialStep: 0,
	})

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>Nome do produto</title>
			</Helmet>
			<Flex bg="gray.50" flexDirection="column" minH="100vh">
				<Flex padding={6}>
					<LinkBox as={RouterLink} to="/">
						<Heading as="h1" letterSpacing="tighter" size="lg">
							Microfrontend Store
						</Heading>
					</LinkBox>
				</Flex>
				<Steps activeStep={activeStep}>
					{steps.map(({ label, content }) => (
						<Step label={label} key={label}>
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
