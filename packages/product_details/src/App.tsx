import { ChakraProvider } from '@chakra-ui/react'
import { CartProvider } from '@host/CartProvider'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProductDetailsPage } from './pages/ProductDetails'

const DEFAULT_PATH = '/product_details/:productId'

export const App = () => (
	<ChakraProvider>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route path={DEFAULT_PATH} element={<ProductDetailsPage />} />
					<Route
						path="*"
						element={
							<Navigate to={DEFAULT_PATH.replace(':productId', '123')} />
						}
					/>
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
