import { Image, ImageSourcePropType, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { useState } from 'react'
import { icons, colors } from '@/src/constants'

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

export default function TextFormField({
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
				<Image
					className={`${otherIconStyle}`}
					source={leadingIcon}
					tintColor={isDarkMode ? colors.primary : colors.light.grey3}
				/>
			)}
			<TextInput
				className={`flex-1 mx-5 ${otherTextStyle}`}
				placeholder={placeholder}
				placeholderTextColor={isDarkMode ? colors.dark.grey2 : colors.light.grey2}
				cursorColor={colors.primary}
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
						tintColor={isDarkMode ? colors.primary : colors.light.grey3}
					/>
				)
			) : (
				<TouchableWithoutFeedback onPress={() => setSecureText(!secureText)}>
					<Image
						className={`w-[26px] h-[20px] ${otherIconStyle}`}
						source={secureText ? icons.eye : icons.eyeHide}
						tintColor={isDarkMode ? colors.primary : colors.light.grey3}
					/>
				</TouchableWithoutFeedback>
			)}
		</View>
	)
}
