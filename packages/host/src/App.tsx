import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from '@host/CartProvider'
import { lazy, Suspense } from 'react'
import { ErrorHandler } from './components/ErrorBoundary'
import { ErrorPage } from './pages/ErrorPage'

const HomePage = lazy(() => import('@home/Home'))
const SearchPage = lazy(() => import('@search/Search'))
const AuthPage = lazy(() => import('@auth/Auth'))

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
						element={
							<ErrorHandler errorFallback={<ErrorPage />}>
								<Suspense fallback={<div>Carregando...</div>}>
									<HomePage />
								</Suspense>
							</ErrorHandler>
						}
						path="/"
					/>
					<Route
						element={
							<ErrorHandler errorFallback={<ErrorPage />}>
								<Suspense fallback={<div>Carregando...</div>}>
									<SearchPage />
								</Suspense>
							</ErrorHandler>
						}
						path="/search"
					/>
					<Route
						element={
							<ErrorHandler errorFallback={<ErrorPage />}>
								<Suspense fallback={<div>Carregando...</div>}>
									<AuthPage />
								</Suspense>
							</ErrorHandler>
						}
						path="/auth"
					/>
					{/* <Route path="/search" element={<SearchPage />} /> */}
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
