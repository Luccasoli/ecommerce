import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CartProvider } from '@host/CartProvider'
import { AuthPage } from './pages/Auth'

const DEFAULT_PATH = '/auth'

export const App = () => (
	<ChakraProvider>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthPage />} path={DEFAULT_PATH} />
					<Route element={<Navigate to={DEFAULT_PATH} />} path="*" />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
