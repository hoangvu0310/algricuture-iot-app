import NetInfo from '@react-native-community/netinfo'

export default async function checkConnection(): Promise<boolean> {
	NetInfo.fetch().then((state) => {
		return state.isConnected
	})
	return false
}
