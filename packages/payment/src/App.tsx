import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PaymentPage } from './pages/Payment'

const DEFAULT_PATH = '/pagamento'

export const App = () => (
	<ChakraProvider>
		<BrowserRouter>
			<Routes>
				<Route path={DEFAULT_PATH} element={<PaymentPage />} />
				<Route path="*" element={<Navigate to={DEFAULT_PATH} />} />
			</Routes>
		</BrowserRouter>
	</ChakraProvider>
)
