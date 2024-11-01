import AsyncStorage from '@react-native-async-storage/async-storage'

const THEME = 'theme'
const LANGUAGE = 'language'

enum ThemeOptions {
	light = 'light',
	dark = 'dark',
}
enum LanguageOptions {
	en = 'en',
	vi = 'vi',
}

export async function setSetting(key: string, value: string) {
	await AsyncStorage.setItem(key, value)
}

export async function getSetting(key: string) {
	return await AsyncStorage.getItem(key)
}

export async function deleteSetting(key: string) {
	await AsyncStorage.removeItem(key)
}

export async function clearSetting(key: string) {
	await AsyncStorage.clear()
}

export { THEME, LANGUAGE, ThemeOptions, LanguageOptions }
