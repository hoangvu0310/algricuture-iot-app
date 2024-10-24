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
import BackButton from '@/src/components/BackButton'

export default function Signup() {
	const [fullName, setFullName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const router = useRouter()

	return (
		<SafeAreaView className="flex-1 justify-start pt-[30px] bg-white">
			<TouchableWithoutFeedback className="flex-1" onPress={Keyboard.dismiss}>
				<KeyboardAvoidingView>
					<ScrollView>
						<BackButton otherStyles={'pl-[35px]'} onPress={() => router.back()} />
						<View className=" items-center mt-[10px] mb-[30px]">
							<Image source={images.auth} />
						</View>
						<View className="px-[35px]">
							<Text className="font-ptsans-bold text-[32px] mb-[20px]">Đăng Kí</Text>
							<Text className="font-ptsans text-light-grey1 text-[16px]">
								Vui lòng tạo tài khoản để tiếp tục
							</Text>

							<TextFormField
								otherStyle="mt-[30px]"
								placeholder={'Họ và tên'}
								leadingIcon={icons.avatar}
								value={fullName}
								setValue={setFullName}
							/>
							<TextFormField
								otherStyle="mt-[40px]"
								placeholder={'Email'}
								leadingIcon={icons.email}
								value={email}
								setValue={setEmail}
							/>
							<TextFormField
								otherStyle="mt-[40px]"
								isPassword={true}
								placeholder={'Mật khẩu'}
								leadingIcon={icons.lock}
								value={password}
								setValue={setPassword}
							/>
							<TextFormField
								otherStyle="mt-[40px]"
								isPassword={true}
								placeholder={'Xác nhận mật khẩu'}
								leadingIcon={icons.lock}
								value={confirmPassword}
								setValue={setConfirmPassword}
							/>

							<CustomButton
								title={'Đăng Kí'}
								otherStyle={'mt-[35px]'}
								onPress={() => router.replace('/login')}
							/>

							<View className="flex-row gap-1 justify-center mt-[20px]">
								<Text className="font-ptsans text-[16px] text-light-grey5">Đã có tài khoản?</Text>
								<TouchableOpacity activeOpacity={0.9} onPress={() => router.back()}>
									<Text className="font-ptsans-bold text-[16px] text-primary">Đăng nhập</Text>
								</TouchableOpacity>
							</View>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	)
}
