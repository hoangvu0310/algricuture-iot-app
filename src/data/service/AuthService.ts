import AuthResponse from '@/src/data/response/AuthResponse'
import AuthRequest from '@/src/data/request/AuthRequest'
import axiosClient from '@/src/config/api/api.config'
import { Result, runCatchingAsync } from '@/src/data/result/Result'
import AuthorizedModel from '@/src/data/model/AuthorizedModel'
import { APIS } from '@/src/constants'

export default class AuthService {
	public static async signIn(authRequest: AuthRequest): Promise<Result<AuthorizedModel>> {
		return await runCatchingAsync<AuthResponse, AuthorizedModel>(
			() =>
				axiosClient
					.post(APIS.SignIn, authRequest.toJson(), {
						headers: {
							authorization: true,
						},
					})
					.then((res) => AuthResponse.fromJson(res.data)),
			(response) => response.toModel(),
		)
	}

	public static async signUp(authRequest: AuthRequest): Promise<Result<AuthorizedModel>> {
		return await runCatchingAsync<AuthResponse, AuthorizedModel>(
			() =>
				axiosClient
					.post(APIS.SignUp, authRequest.toJson())
					.then((res) => AuthResponse.fromJson(res.data)),
			(response) => response.toModel(),
		)
	}
}
