import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import { getSetting, LANGUAGE } from '@/src/config/storage/settingStorage'
import { changeAppLanguage } from '@/src/i18n/i18n.config'
import AppThemeProvider from '@/src/context/appThemeContext'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [fontsLoaded, error] = useFonts({
		'PTSans-Regular': require('../../assets/fonts/PTSans-Regular.ttf'),
		'PTSans-Bold': require('../../assets/fonts/PTSans-Bold.ttf'),
		'PTSans-Italic': require('../../assets/fonts/PTSans-Italic.ttf'),
		'PTSans-BoldItalic': require('../../assets/fonts/PTSans-BoldItalic.ttf'),
	})

	const loadLanguage = async () => {
		const language = await getSetting(LANGUAGE)
		await changeAppLanguage(language || 'en')
	}

	useEffect(() => {
		loadLanguage().then(() => {
			if (error) throw error
			if (fontsLoaded) SplashScreen.hideAsync()
		})
	}, [fontsLoaded, error])

	if (!fontsLoaded && !error) return null

	return (
		<AppThemeProvider>
			<Provider store={store}>
				<Stack initialRouteName="(onboarding)/index">
					<Stack.Screen name="(onboarding)/index" options={{ headerShown: false }} />
					<Stack.Screen name="(auth)" options={{ headerShown: false }} />
				</Stack>
			</Provider>
		</AppThemeProvider>
	)
}
