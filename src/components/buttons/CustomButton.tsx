import { Text, TouchableOpacity } from 'react-native'

type CustomButtonProps = {
	otherButtonStyle?: string
	otherTextStyle?: string
	title: string
	onPress?: () => void
}

export default function CustomButton({
	otherButtonStyle,
	otherTextStyle,
	title,
	onPress,
}: CustomButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPress}
			className={`bg-primary h-[40px] justify-center items-center rounded-[10px] ${otherButtonStyle}`}
		>
			<Text className={`font-ptsans-bold text-[16px] text-white ${otherTextStyle}`}>{title}</Text>
		</TouchableOpacity>
	)
}
