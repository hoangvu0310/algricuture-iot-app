import { SplashScreen, Stack } from 'expo-router'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [fontsLoaded, error] = useFonts({
		'PTSans-Regular': require('../../assets/fonts/PTSans-Regular.ttf'),
		'PTSans-Bold': require('../../assets/fonts/PTSans-Bold.ttf'),
		'PTSans-Italic': require('../../assets/fonts/PTSans-Italic.ttf'),
		'PTSans-BoldItalic': require('../../assets/fonts/PTSans-BoldItalic.ttf'),
	})

	useEffect(() => {
		if (error) throw error

		if (fontsLoaded) SplashScreen.hideAsync()
	}, [fontsLoaded, error])

	if (!fontsLoaded && !error) return null

	return (
		<Stack initialRouteName="(onboarding)/index">
			<Stack.Screen name="(onboarding)/index" options={{ headerShown: false }} />
			<Stack.Screen name="(auth)" options={{ headerShown: false }} />
		</Stack>
	)
}
