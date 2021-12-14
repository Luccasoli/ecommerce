import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { SearchPage } from './pages/Search'

export const App = () => (
	<ChakraProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/search" element={<SearchPage />} />
				<Route path="*" element={<Navigate to="/search" />} />
			</Routes>
		</BrowserRouter>
	</ChakraProvider>
)
