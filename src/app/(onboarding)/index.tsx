import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'
import { changeAppLanguage } from '@/src/i18n/i18n.config'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '@/src/constants'
import { useAppTheme } from '@/src/hooks/useAppTheme'

export default function Onboarding() {
	const router = useRouter()
	const { isDarkMode, updateThemeSetting } = useAppTheme()

	return (
		<SafeAreaView className={`flex-1 justify-items-center ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
			<Text className={'text-amber-200'}>O N B O A R D I N G</Text>
			<TouchableOpacity onPress={() => router.push('/(auth)/sign-in')}>
				<Text className={'text-amber-200'}>To log in</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={async () => await changeAppLanguage('vi')}>
				<Text className={'text-amber-200'}>Change language to VN</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={async () => await changeAppLanguage('en')}>
				<Text className={'text-amber-200'}>Change language to ENG</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => updateThemeSetting('light')}>
				<Text className={'text-amber-200'}>Change to light mode</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => updateThemeSetting('dark')}>
				<Text className={'text-amber-200'}>Change to dark mode</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => updateThemeSetting('system')}>
				<Text className={'text-amber-200'}>Change to system mode</Text>
			</TouchableOpacity>
			<StatusBar
				backgroundColor={isDarkMode ? COLORS.dark.background : COLORS.light.background}
				style={isDarkMode ? 'light' : 'dark'}
			/>
		</SafeAreaView>
	)
}
