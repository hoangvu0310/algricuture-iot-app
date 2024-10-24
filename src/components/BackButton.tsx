import { Image, TouchableOpacity, View } from 'react-native'
import { icons } from '@/src/constants'

type BackButtonProps = {
	onPress: () => void
	otherStyles?: string
}

export default function BackButton({ onPress, otherStyles }: BackButtonProps) {
	return (
		<View className={`absolute top-[10px] ${otherStyles}`}>
			<TouchableOpacity activeOpacity={0.9} onPress={onPress}>
				<Image className="h-[20px] w-[12px]" source={icons.back} />
			</TouchableOpacity>
		</View>
	)
}
