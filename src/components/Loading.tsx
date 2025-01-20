import { ActivityIndicator, Modal, View } from 'react-native'
import { COLORS } from '@/src/constants'

type LoadingProps = {
	visible: boolean
}

export default function Loading({ visible }: LoadingProps) {
	return (
		<Modal visible={visible} transparent={true} animationType={'fade'} className={'flex-1'}>
			<View className={'flex-1 bg-white/50 justify-center items-center'}>
				<ActivityIndicator color={COLORS.white} />
			</View>
		</Modal>
	)
}
