import { ChakraProvider } from '@chakra-ui/react'
import { HomePage } from 'home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { SearchPage } from 'search/Search'
// @ts-ignore
import { CartProvider } from 'host/CartProvider'

export const App = () => (
	<ChakraProvider>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					{/* <Route path="/search" element={<SearchPage />} /> */}
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
