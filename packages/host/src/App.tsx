import { ChakraProvider } from '@chakra-ui/react'
import { HomePage } from 'home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SearchPage } from 'search/Search'

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
