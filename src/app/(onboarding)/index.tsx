import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity } from 'react-native'
import { changeAppLanguage } from '@/src/i18n/i18n.config'
import { useAppTheme } from '@/src/context/appThemeContext'
import { ThemeOptions } from '@/src/config/storage/settingStorage'

export default function Onboarding() {
	const router = useRouter()
	const { theme, updateThemeSetting } = useAppTheme()

	return (
		<SafeAreaView
			className={`flex-1 justify-items-center ${theme === ThemeOptions.dark ? 'bg-black' : 'bg-white'}`}
		>
			<Text className={'text-amber-200'}>O N B O A R D I N G</Text>
			<TouchableOpacity onPress={() => router.push('/(auth)/login')}>
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
		</SafeAreaView>
	)
}
