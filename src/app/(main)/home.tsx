import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native'

export default function Home() {
	return (
		<SafeAreaView className={'flex-1'}>
			<View className={'flex-1 justify-center items-center'}>
				<Text>Home Screen</Text>
			</View>
		</SafeAreaView>
	)
}
