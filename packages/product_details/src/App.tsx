import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ProductDetailsPage } from './pages/ProductDetails'

const DEFAULT_PATH = '/:productId'

export const App = () => (
	<ChakraProvider>
		<BrowserRouter>
			<Routes>
				<Route path={DEFAULT_PATH} element={<ProductDetailsPage />} />
				<Route path="*" element={<Navigate to={DEFAULT_PATH} />} />
			</Routes>
		</BrowserRouter>
	</ChakraProvider>
)
