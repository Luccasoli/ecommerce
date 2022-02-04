import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { HomePage } from '@home/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import { SearchPage } from 'search/Search'
import { CartProvider } from '@host/CartProvider'
import { ErrorHandler } from './components/ErrorBoundary'

const theme = extendTheme({
	components: {
		Popover: {
			variants: {
				responsive: {
					popper: {
						maxWidth: 'unset',
						width: 'unset',
					},
				},
			},
		},
	},
})

export const App = () => (
	<ChakraProvider theme={theme}>
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
