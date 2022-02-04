/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/require-default-props */
import { ReactElement, ReactNode } from 'react'
import { ErrorBoundary as LibErrorBoundary } from 'react-error-boundary'

const DefaultError = (
	<div role="alert">
		<p>Something went wrong :\</p>
	</div>
)

type TErrorHandlerProps = {
	children: ReactNode
	errorFallback?: ReactElement<any>
}

export const ErrorHandler = ({
	children,
	errorFallback = DefaultError,
}: TErrorHandlerProps) => (
	<LibErrorBoundary fallback={errorFallback}>{children}</LibErrorBoundary>
)
