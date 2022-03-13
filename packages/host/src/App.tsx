import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from '@host/CartProvider'
import { lazy, Suspense } from 'react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { ErrorHandler } from './components/ErrorBoundary'
import { ErrorPage } from './pages/ErrorPage'

const HomePage = lazy(() => import('@home/Home'))
const SearchPage = lazy(() => import('@search/Search'))
const AuthPage = lazy(() => import('@auth/Auth'))
const ProductDetailsPage = lazy(() => import('@product_details/ProductDetails'))
const PaymentPage = lazy(() => import('@payment/Payment'))

const breakpoints = createBreakpoints({
	sm: '320px',
	md: '768px',
	lg: '960px',
	xl: '1200px',
	'2xl': '1536px',
})

const theme = extendTheme({
	breakpoints,
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
	sizes: {
		container: {
			'2xl': '1920px',
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
					<Route
						element={
							<ErrorHandler errorFallback={<ErrorPage />}>
								<Suspense fallback={<div>Carregando...</div>}>
									<PaymentPage />
								</Suspense>
							</ErrorHandler>
						}
						path="/payment"
					/>
					<Route
						element={
							<ErrorHandler errorFallback={<ErrorPage />}>
								<Suspense fallback={<div>Carregando...</div>}>
									<ProductDetailsPage />
								</Suspense>
							</ErrorHandler>
						}
						path="/product_details/:productId"
					/>
				</Routes>
			</BrowserRouter>
		</CartProvider>
	</ChakraProvider>
)
