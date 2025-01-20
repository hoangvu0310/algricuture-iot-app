export default class AuthorizedModel {
	userId: string
	role: string
	token: string
	refreshToken: string

	constructor({ userId, role, token, refreshToken }: AuthorizedModel) {
		this.userId = userId
		this.role = role
		this.token = token
		this.refreshToken = refreshToken
	}
}
