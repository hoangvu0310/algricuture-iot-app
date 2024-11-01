import {
	Image,
	Keyboard,
	KeyboardAvoidingView,
	ScrollView,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '@/src/constants'
import TextFormField from '@/src/components/TextFormField'
import { useState } from 'react'
import CustomButton from '@/src/components/CustomButton'
import { useRouter } from 'expo-router'
import useTranslationHelper from '@/src/hooks/useTranslationHelper'
import '../../i18n/i18n.config'
import { useAppTheme } from '@/src/context/appThemeContext'
import { ThemeOptions } from '@/src/config/storage/settingStorage'

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()
	const t = useTranslationHelper()

	const isDarkMode = useAppTheme().theme === ThemeOptions.dark

	return (
		<SafeAreaView
			className={`flex-1 justify-start pt-[30px] ${isDarkMode ? 'bg-dark-background' : 'bg-light-background'}`}
		>
			<TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView>
					<ScrollView>
						<View className={'items-center mt-[10px] mb-[30px]'}>
							<Image source={images.auth} />
						</View>
						<View className={'px-[35px]'}>
							<Text
								className={`font-ptsans-bold text-[32px] mb-[20px] ${isDarkMode ? 'text-primary' : 'text-black'}`}
							>
								{t('auth.login')}
							</Text>
							<Text
								className={`font-ptsans text-[16px] ${isDarkMode ? 'text-white' : 'text-light-grey1'}`}
							>
								{t('auth.loginMessage')}
							</Text>

							<TextFormField
								otherContainerStyle={'mt-[30px]'}
								otherTextStyle={`${isDarkMode ? 'text-white' : 'text-light-grey3'}`}
								isDarkMode={isDarkMode}
								placeholder={t('auth.email')}
								leadingIcon={icons.email}
								value={email}
								setValue={setEmail}
							/>
							<TextFormField
								otherContainerStyle={'mt-[40px]'}
								otherTextStyle={`${isDarkMode ? 'text-white' : 'text-light-grey3'}`}
								isDarkMode={isDarkMode}
								isPassword={true}
								placeholder={t('auth.password')}
								leadingIcon={icons.lock}
								value={password}
								setValue={setPassword}
							/>
							<View className={'w-full mt-[20px] items-end'}>
								<TouchableOpacity activeOpacity={0.9}>
									<Text className={'font-ptsans-bold text-[14px] text-primary'}>
										{t('auth.forgotPassword')}
									</Text>
								</TouchableOpacity>
							</View>

							<CustomButton title={t('auth.login')} otherButtonStyle={'mt-[35px]'} />

							<View className={'flex-row gap-1 justify-center mt-[20px]'}>
								<Text
									className={`font-ptsans text-[16px] text-light-grey5 ${isDarkMode ? 'text-white' : 'text-light-grey5'}`}
								>
									{t('auth.dontHaveAnAccount')}
								</Text>
								<TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/signup')}>
									<Text className="font-ptsans-bold text-[16px] text-primary">
										{t('auth.signupOption')}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	)
}
