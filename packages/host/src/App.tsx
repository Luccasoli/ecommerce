import { HomePage } from 'home/Home'
import { SearchPage } from 'search/Search'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => (
	<ChakraProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/search" element={<SearchPage />} />
			</Routes>
		</BrowserRouter>
	</ChakraProvider>
)
