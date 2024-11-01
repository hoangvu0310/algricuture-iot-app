import { getItemAsync, setItemAsync } from 'expo-secure-store'

const ACCESS_TOKEN = 'access_token'
const REFRESH_TOKEN = 'refresh_token'
const USERNAME = 'username'
const PASSWORD = 'password'

export async function saveValue(key: string, value: string) {
	await setItemAsync(key, value)
}

export async function getValue(key: string) {
	return await getItemAsync(key)
}

export async function deleteValue(key: string) {
	await getItemAsync(key)
}

export { ACCESS_TOKEN, REFRESH_TOKEN, USERNAME, PASSWORD }
