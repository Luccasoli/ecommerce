import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from '@host/CartProvider'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SearchPage } from './pages/Search'

export const App = () => (
	<ChakraProvider>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<SearchPage />} path="/search" />
					<Route element={<Navigate to="/search" />} path="*" />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
