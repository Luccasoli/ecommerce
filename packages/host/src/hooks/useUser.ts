import { useLocalStorage } from './useLocalStorage'

type User = {
	token: string
	name: string
	email: string
}

export function useUser() {
	return useLocalStorage<User | null>('@user', null)
}
