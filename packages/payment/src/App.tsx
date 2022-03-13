import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from '@host/CartProvider'
import { PaymentPage } from './pages/Payment'

const DEFAULT_PATH = '/payment'

export const App = () => (
	<ChakraProvider>
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
