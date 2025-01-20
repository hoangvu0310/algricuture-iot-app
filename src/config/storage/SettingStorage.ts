import AsyncStorage from '@react-native-async-storage/async-storage'

const THEME = 'theme'
const LANGUAGE = 'language'

enum ThemeOptions {
	light = 'light',
	dark = 'dark',
	system = 'system',
}
enum LanguageOptions {
	en = 'en',
	vi = 'vi',
}

export async function setTheme(value: string) {
	await AsyncStorage.setItem(THEME, value)
}

export async function getTheme() {
	return await AsyncStorage.getItem(THEME)
}

export async function setLanguage(value: string) {
	return await AsyncStorage.setItem(LANGUAGE, value)
}

export async function getLanguage() {
	return await AsyncStorage.getItem(LANGUAGE)
}

export async function clearSetting() {
	await AsyncStorage.clear()
}

export { ThemeOptions, LanguageOptions }
