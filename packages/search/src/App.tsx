import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from '@host/CartProvider'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SearchPage } from './pages/Search'

export const App = () => (
	<ChakraProvider>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/search" element={<SearchPage />} />
					<Route path="*" element={<Navigate to="/search" />} />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
