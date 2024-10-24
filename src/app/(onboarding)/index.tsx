import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { Text } from 'react-native'

export default function Index() {
	return (
		<SafeAreaView className="flex-1 justify-items-center">
			<Text>O N B O A R D I N G</Text>
			<Link href={'/(auth)/login'}>To Log In</Link>
		</SafeAreaView>
	)
}
