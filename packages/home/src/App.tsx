import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from '@host/CartProvider'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/Home'
import { ProductDetailsPage } from './pages/ProductDetails'
import { SearchPage } from './pages/Search'

export const App = () => (
	<ChakraProvider>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<HomePage />} path="/" />
					<Route
						element={<ProductDetailsPage />}
						path="/product_details/:productId"
					/>
					<Route element={<SearchPage />} path="/search" />
					<Route element={<Navigate to="/" />} path="*" />
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
