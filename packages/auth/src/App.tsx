import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthhPage } from './pages/Auth'

const DEFAULT_PATH = '/auth'

export const App = () => (
	<ChakraProvider>
		<BrowserRouter>
			<Routes>
				<Route path={DEFAULT_PATH} element={<AuthhPage />} />
				<Route path="*" element={<Navigate to={DEFAULT_PATH} />} />
			</Routes>
		</BrowserRouter>
	</ChakraProvider>
)
