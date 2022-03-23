import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { CartProvider } from '@host/CartProvider'
import { StepsStyleConfig as Steps } from '@payment/Stepper'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { PaymentPage } from './pages/Payment'

const DEFAULT_PATH = '/payment'

const theme = extendTheme({
	components: {
		Steps,
		Popover: {
			variants: {
				responsive: {
					popper: {
						maxWidth: 'unset',
						width: 'unset',
					},
				},
			},
		},
	},
	sizes: {
		container: {
			'2xl': '1920px',
		},
	},
})

export const App = () => (
	<ChakraProvider theme={theme}>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route path={DEFAULT_PATH} element={<PaymentPage />} />
					<Route path="*" element={<Navigate to={DEFAULT_PATH} />} />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
