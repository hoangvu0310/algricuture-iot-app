export default class AuthRequest {
	username: string
	password: string

	constructor(username: string, password: string) {
		this.username = username
		this.password = password
	}

	toJson() {
		return JSON.stringify({
			username: this.username,
			password: this.password,
		})
	}
}
