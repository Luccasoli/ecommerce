import { ReactNode } from 'react'
import {
	ErrorBoundary as LibErrorBoundary,
	FallbackProps,
} from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<div role="alert">
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<button type="button" onClick={resetErrorBoundary}>
				Try again
			</button>
		</div>
	)
}

type TErrorHandlerProps = {
	children: ReactNode
}

export const ErrorHandler = ({ children }: TErrorHandlerProps) => (
	<LibErrorBoundary FallbackComponent={ErrorFallback}>
		{children}
	</LibErrorBoundary>
)
