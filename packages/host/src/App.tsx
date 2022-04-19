import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'
import { CartProvider } from '@host/CartProvider'
import { StepsStyleConfig } from '@payment/Stepper'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@host/react-query'
import { ErrorHandler } from './components/ErrorBoundary'
import { ErrorPage } from './pages/ErrorPage'

const queryClient = new QueryClient()

const HomePage = lazy(() => import('@home/Home'))
const SearchPage = lazy(() => import('@home/Search'))
const ProductDetailsPage = lazy(() => import('@home/ProductDetails'))
const AuthPage = lazy(() => import('@auth/Auth'))
const PaymentPage = lazy(() => import('@payment/Payment'))

const breakpoints = createBreakpoints({
	sm: '320px',
	md: '768px',
	lg: '960px',
	xl: '1200px',
	'2xl': '1536px',
})

const CustomSteps = {
	...StepsStyleConfig,
	baseStyle: (props: any) => ({
		...StepsStyleConfig.baseStyle(props),
		steps: {
			...StepsStyleConfig.baseStyle(props).steps,
			flex: 0,
		},
	}),
}

const theme = extendTheme({
	breakpoints,
	components: {
		Steps: CustomSteps,
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
			<QueryClientProvider client={queryClient}>
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
			</QueryClientProvider>
		</CartProvider>
	</ChakraProvider>
)
