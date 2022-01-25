import { ChakraProvider } from '@chakra-ui/react'
import { HomePage } from '@home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { SearchPage } from 'search/Search'
// @ts-ignore
import { CartProvider } from '@host/CartProvider'
import { ErrorHandler } from './components/ErrorBoundary'

export const App = () => (
	<ChakraProvider>
		<CartProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<ErrorHandler>
								<HomePage />
							</ErrorHandler>
						}
					/>
					{/* <Route path="/search" element={<SearchPage />} /> */}
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
