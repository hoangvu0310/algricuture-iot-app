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
import { ICONS, IMAGES } from '@/src/constants'
import AuthTextFormField from '@/src/components/textfields/AuthTextFormField'
import CustomButton from '@/src/components/buttons/CustomButton'
import { useRouter } from 'expo-router'
import BackButton from '@/src/components/buttons/BackButton'
import useTranslationHelper from '@/src/hooks/useTranslationHelper'
import '../../i18n/i18n.config'
import { useAppTheme } from '@/src/hooks/useAppTheme'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export default function SignUp() {
	const router = useRouter()
	const t = useTranslationHelper()
	const { isDarkMode } = useAppTheme()

	const signUpSchema = z
		.object({
			username: z.string().min(4, t('auth.usernameMin')).max(48, t('auth.usernameMax')),
			password: z.string().min(6, t('auth.passwordMin')).max(32, t('auth.passwordMax')),
			confirmPassword: z.string().min(1, t('auth.requiredConfirmPassword')),
		})
		.refine((data) => data.confirmPassword === data.password, {
			message: t('auth.confirmPasswordWrong'),
			path: ['confirmPassword'],
		})
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof signUpSchema>>({ resolver: zodResolver(signUpSchema) })

	const onSubmitSignUp = () => {}

	return (
		<SafeAreaView
			className={`flex-1 justify-start pt-[30px] ${isDarkMode ? 'bg-dark-background' : 'bg-light-background'}`}
		>
			<TouchableWithoutFeedback className={'flex-1'} onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView>
					<ScrollView>
						<BackButton
							otherStyles={`pl-[35px]`}
							isDarkMode={isDarkMode}
							onPress={() => router.back()}
						/>
						<View className={'items-center mt-[10px] mb-[30px]'}>
							<Image source={IMAGES.Auth} />
						</View>
						<View className={'px-[35px]'}>
							<Text
								className={`font-ptsans-bold text-[32px] mb-[20px] ${isDarkMode ? 'text-primary' : 'text-black'}`}
							>
								{t('auth.signUp')}
							</Text>
							<Text
								className={`font-ptsans text-[16px] ${isDarkMode ? 'text-white' : 'text-light-grey1'}`}
							>
								{t('auth.signUpMessage')}
							</Text>

							<Controller
								control={control}
								name={'username'}
								defaultValue={''}
								render={({ field: { value, onChange } }) => (
									<AuthTextFormField
										otherContainerStyle={'mt-[40px]'}
										otherTextStyle={`${isDarkMode ? 'text-white' : 'text-light-grey3'}`}
										isDarkMode={isDarkMode}
										placeholder={t('auth.username')}
										leadingIcon={ICONS.Avatar}
										value={value}
										setValue={(value) => onChange(value)}
									/>
								)}
							/>
							{errors.username && (
								<Text className={'text-error mt-[5px]'}>{errors.username.message}</Text>
							)}

							<Controller
								control={control}
								name={'password'}
								defaultValue={''}
								render={({ field: { value, onChange } }) => (
									<AuthTextFormField
										otherContainerStyle={'mt-[40px]'}
										otherTextStyle={`${isDarkMode ? 'text-white' : 'text-light-grey3'}`}
										isDarkMode={isDarkMode}
										isPassword={true}
										placeholder={t('auth.password')}
										leadingIcon={ICONS.Lock}
										value={value}
										setValue={(value) => onChange(value)}
									/>
								)}
							/>
							{errors.password && (
								<Text className={'text-error mt-[5px]'}>{errors.password.message}</Text>
							)}

							<Controller
								control={control}
								name={'confirmPassword'}
								defaultValue={''}
								render={({ field: { value, onChange } }) => (
									<AuthTextFormField
										otherContainerStyle={'mt-[40px]'}
										otherTextStyle={`${isDarkMode ? 'text-white' : 'text-light-grey3'}`}
										isDarkMode={isDarkMode}
										isPassword={true}
										placeholder={t('auth.confirmPassword')}
										leadingIcon={ICONS.Lock}
										value={value}
										setValue={(value) => onChange(value)}
									/>
								)}
							/>
							{errors.confirmPassword && (
								<Text className={'text-error mt-[5px]'}>{errors.confirmPassword.message}</Text>
							)}

							<CustomButton
								title={t('auth.signUp')}
								otherButtonStyle={'mt-[40px]'}
								onPress={handleSubmit(onSubmitSignUp)}
							/>

							<View className={'flex-row gap-1 justify-center mt-[20px]'}>
								<Text
									className={`font-ptsans text-[16px] ${isDarkMode ? 'text-white' : 'text-light-grey5'}`}
								>
									{t('auth.alreadyHaveAnAccount')}
								</Text>
								<TouchableOpacity activeOpacity={0.9} onPress={() => router.back()}>
									<Text className={'font-ptsans-bold text-[16px] text-primary'}>
										{t('auth.signInOption')}
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
