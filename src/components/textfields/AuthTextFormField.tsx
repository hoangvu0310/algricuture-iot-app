import { Image, ImageSourcePropType, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { useState } from 'react'
import { ICONS, COLORS } from '@/src/constants'

type TextFormFieldProps = {
	otherContainerStyle?: string
	otherTextStyle?: string
	otherIconStyle?: string
	placeholder?: string
	leadingIcon?: ImageSourcePropType
	trailingIcon?: ImageSourcePropType
	isPassword?: boolean
	isDarkMode: boolean
	value?: string
	setValue: (value: string) => void
}

export default function AuthTextFormField({
	otherContainerStyle,
	otherTextStyle,
	otherIconStyle,
	placeholder,
	leadingIcon,
	trailingIcon,
	isPassword = false,
	isDarkMode,
	value = '',
	setValue,
}: TextFormFieldProps) {
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const [secureText, setSecureText] = useState(false)

	return (
		<View
			className={`w-full flex-row pb-1 border-b ${otherContainerStyle} 
				${
					isFocused && isDarkMode
						? 'border-b-white'
						: isFocused && !isDarkMode
							? 'border-b-light-grey3'
							: 'border-b-light-grey1'
				} 
			`}
		>
			{leadingIcon && (
				<View className={'min-w-[45px]'}>
					<Image
						className={`${otherIconStyle}`}
						source={leadingIcon}
						tintColor={isDarkMode ? COLORS.primary : COLORS.light.grey3}
					/>
				</View>
			)}
			<TextInput
				className={`flex-1 ${otherTextStyle}`}
				placeholder={placeholder}
				placeholderTextColor={isDarkMode ? COLORS.dark.grey2 : COLORS.light.grey2}
				cursorColor={COLORS.primary}
				value={value}
				secureTextEntry={isPassword ? !secureText : secureText}
				onChangeText={setValue}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			{!isPassword ? (
				trailingIcon && (
					<Image
						className={`${otherIconStyle}`}
						source={trailingIcon}
						tintColor={isDarkMode ? COLORS.primary : COLORS.light.grey3}
					/>
				)
			) : (
				<TouchableWithoutFeedback onPress={() => setSecureText(!secureText)}>
					<Image
						className={`w-[26px] h-[20px] ${otherIconStyle}`}
						source={secureText ? ICONS.Eye : ICONS.EyeHide}
						tintColor={isDarkMode ? COLORS.primary : COLORS.light.grey3}
					/>
				</TouchableWithoutFeedback>
			)}
		</View>
	)
}
