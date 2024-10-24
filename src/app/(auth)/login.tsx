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

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const router = useRouter()

	return (
		<SafeAreaView className="flex-1 justify-start pt-[30px] bg-white">
			<TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView>
					<ScrollView>
						<View className=" items-center mt-[10px] mb-[30px]">
							<Image source={images.auth} />
						</View>
						<View className="px-[35px]">
							<Text className="font-ptsans-bold text-[32px] mb-[20px]">Đăng Nhập</Text>
							<Text className="font-ptsans text-light-grey1 text-[16px]">
								Vui lòng đăng nhập để tiếp tục
							</Text>

							<TextFormField
								otherStyle="mt-[30px]"
								placeholder={'Email'}
								leadingIcon={icons.email}
								value={email}
								setValue={setEmail}
							/>
							<TextFormField
								otherStyle="mt-[40px]"
								isPassword={true}
								placeholder={'Password'}
								leadingIcon={icons.lock}
								value={password}
								setValue={setPassword}
							/>
							<View className="w-full mt-[20px] items-end">
								<TouchableOpacity activeOpacity={0.9}>
									<Text className="font-ptsans-bold text-[14px] text-primary">Quên mật khẩu</Text>
								</TouchableOpacity>
							</View>

							<CustomButton title={'Đăng Nhập'} otherStyle={'mt-[35px]'} />

							<View className="flex-row gap-1 justify-center mt-[20px]">
								<Text className="font-ptsans text-[16px] text-light-grey5">Chưa có tài khoản?</Text>
								<TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/signup')}>
									<Text className="font-ptsans-bold text-[16px] text-primary">Đăng kí</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	)
}
