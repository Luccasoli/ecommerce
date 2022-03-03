import { TProduct } from '@shared/types'
import React from 'react'

type Error = {
	message: string
}

export const useFetch = (url: string) => {
	const [data, setData] = React.useState<TProduct[]>()
	const [loading, setLoading] = React.useState(true)
	const [error, setError] = React.useState<Error | undefined>()

	React.useEffect(() => {
		let isMounted = true
		const fetchData = async () => {
			try {
				const response = await fetch(url)
				const json = await response.json()
				if (isMounted) {
					setData(json)
					setLoading(false)
				}
			} catch (e) {
				if (isMounted) {
					setError(e as Error)
					setLoading(false)
				}
			}
		}
		fetchData()

		return () => {
			isMounted = false
		}
	}, [url])

	return { data, loading, error }
}
