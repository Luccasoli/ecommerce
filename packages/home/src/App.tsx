import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from '@host/CartProvider'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home'

export const App = () => (
	<ChakraProvider>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<HomePage />} path="/" />
					<Route element={<Navigate to="/" />} path="*" />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
