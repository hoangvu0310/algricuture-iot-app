import axios from 'axios/index'
import { getAccessToken } from '@/src/config/storage/SecureStorage'
import { errorLogger, requestLogger, responseLogger } from 'axios-logger'

const axiosClient = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:3000/',
	timeout: 10000,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

const loggerConfig = {
	dateFormat: 'HH:MM:ss',
	status: true,
	headers: true,
	data: true,
	prefixText: 'API',
	method: true,
	url: true,
}

axiosClient.interceptors.request.use(
	async (config) => {
		requestLogger(config, loggerConfig)

		if (config.headers.authorization) {
			delete config.headers.authorization
			return config
		}

		const accessToken = await getAccessToken()
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		errorLogger(error)
		return Promise.reject(error)
	},
)

axiosClient.interceptors.response.use(
	(response) => {
		responseLogger(response, loggerConfig)
		return response
	},
	(error) => {
		errorLogger(error)
		Promise.reject(error)
	},
)

export default axiosClient
