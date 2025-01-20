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
import useTranslationHelper from '@/src/hooks/useTranslationHelper'
import { useAppTheme } from '@/src/hooks/useAppTheme'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch } from '@/src/hooks/useAppDispatch'
import { useAppSelector } from '@/src/hooks/useAppSelector'
import { RootState } from '../../redux/store'
import { signIn } from '@/src/redux/authSlice'
import AuthRequest from '@/src/data/request/AuthRequest'
import Loading from '@/src/components/Loading'
import Toast from 'react-native-toast-message'
import { useEffect } from 'react'

export default function SignIn() {
	const router = useRouter()
	const t = useTranslationHelper()
	const { isDarkMode } = useAppTheme()
	const dispatch = useAppDispatch()
	const { isLoading, error } = useAppSelector((state: RootState) => state.auth)

	const signInSchema = z.object({
		username: z.string().min(1, t('auth.requiredUsername')),
		password: z.string().min(1, t('auth.requiredPassword')),
	})
	const {
		control,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<z.infer<typeof signInSchema>>({ resolver: zodResolver(signInSchema) })

	const onSubmitSignIn = () => {
		const values = getValues()
		dispatch(signIn(new AuthRequest(values.username, values.password)))
	}

	const showToast = () => {
		Toast.show({
			type: 'error',
			text1: t(error || ''),
		})
	}

	useEffect(() => {
		if (error) showToast()
	}, [error])

	return (
		<SafeAreaView
			className={`flex-1 justify-start pt-[30px] ${isDarkMode ? 'bg-dark-background' : 'bg-light-background'}`}
		>
			<TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView>
					<ScrollView>
						<View className={'items-center mt-[10px] mb-[30px]'}>
							<Image source={IMAGES.Auth} />
						</View>
						<View className={'px-[35px] justify-center'}>
							<Text
								className={`font-ptsans-bold text-[32px] mb-[20px] ${isDarkMode ? 'text-primary' : 'text-black'}`}
							>
								{t('auth.signIn')}
							</Text>
							<Text
								className={`font-ptsans text-[16px] ${isDarkMode ? 'text-white' : 'text-light-grey1'}`}
							>
								{t('auth.signInMessage')}
							</Text>

							<Controller
								control={control}
								name={'username'}
								defaultValue={''}
								render={({ field: { value, onChange } }) => (
									<AuthTextFormField
										otherContainerStyle={`mt-[30px]`}
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
										otherContainerStyle={`mt-[40px]`}
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
							<View className={'w-full mt-[20px] items-end'}>
								<TouchableOpacity activeOpacity={0.9}>
									<Text className={'font-ptsans-bold text-[14px] text-primary'}>
										{t('auth.forgotPassword')}
									</Text>
								</TouchableOpacity>
							</View>
							<CustomButton
								title={t('auth.signIn')}
								otherButtonStyle={'mt-[35px]'}
								onPress={handleSubmit(onSubmitSignIn)}
							/>
							<View className={'flex-row gap-1 justify-center mt-[20px]'}>
								<Text
									className={`font-ptsans text-[16px] text-light-grey5 ${isDarkMode ? 'text-white' : 'text-light-grey5'}`}
								>
									{t('auth.dontHaveAnAccount')}
								</Text>
								<TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/sign-up')}>
									<Text className="font-ptsans-bold text-[16px] text-primary">
										{t('auth.signUpOption')}
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>

			<Loading visible={isLoading} />
		</SafeAreaView>
	)
}
