import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// @ts-ignore
import { CartProvider } from '@host/CartProvider'
import { HomePage } from './pages/Home'

export const App = () => (
	<ChakraProvider>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
