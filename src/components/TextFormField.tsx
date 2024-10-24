import { Image, ImageSourcePropType, TextInput, TouchableWithoutFeedback, View } from 'react-native'
import { useState } from 'react'
import { icons } from '@/src/constants'

type TextFormFieldProps = {
	otherStyle?: string
	placeholder?: string
	leadingIcon?: ImageSourcePropType
	trailingIcon?: ImageSourcePropType
	isPassword?: boolean
	value?: string
	setValue: (value: string) => void
}

export default function TextFormField({
	otherStyle,
	placeholder,
	leadingIcon,
	trailingIcon,
	isPassword = false,
	value = '',
	setValue,
}: TextFormFieldProps) {
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const [secureText, setSecureText] = useState(false)

	return (
		<View
			className={`w-full flex-row pb-1 border-b ${isFocused ? 'border-b-light-grey3' : 'border-b-light-grey1'} ${otherStyle}`}
		>
			{leadingIcon && <Image source={leadingIcon} />}
			<TextInput
				className={`flex-1 mx-5 text-light-grey3`}
				placeholder={placeholder}
				placeholderTextColor={'#9A9595'}
				cursorColor={'#333333'}
				value={value}
				secureTextEntry={isPassword ? !secureText : secureText}
				onChangeText={setValue}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
			/>
			{!isPassword ? (
				trailingIcon && <Image source={trailingIcon} />
			) : (
				<TouchableWithoutFeedback onPress={() => setSecureText(!secureText)}>
					<Image
						className="w-[26px] h-[20px]"
						source={secureText ? icons.eye : icons.eyeHide}
						tintColor={'#333333'}
					/>
				</TouchableWithoutFeedback>
			)}
		</View>
	)
}
