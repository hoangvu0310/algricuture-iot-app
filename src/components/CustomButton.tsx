import { Text, TouchableOpacity } from 'react-native'

type CustomButtonProps = {
	otherStyle?: string
	title: string
	onPress?: () => void
}

export default function CustomButton({ otherStyle, title, onPress }: CustomButtonProps) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPress}
			className={`bg-primary h-[40px] justify-center items-center rounded-[10px] ${otherStyle}`}
		>
			<Text className="font-ptsans-bold text-[16px] text-white">{title}</Text>
		</TouchableOpacity>
	)
}
