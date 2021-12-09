// @ts-ignore
import { HomePage } from 'home/Home'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => (
	<ChakraProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	</ChakraProvider>
)
