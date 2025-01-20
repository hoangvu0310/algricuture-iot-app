import { AxiosError } from 'axios'

export abstract class AppError extends Error {
	protected constructor(message: string) {
		super(message)
		this.message = message
	}

	public message: string
}

export class CommonError extends Error {
	constructor() {
		super('error.commonError')
	}
}

export class NetworkError extends AppError {
	constructor() {
		super('error.networkError')
	}
}

export class ServerError extends AppError {
	constructor() {
		super('error.serverError')
	}
}

export class ApiCallError extends AppError {
	constructor(errorType: string) {
		let message: string
		switch (errorType) {
			case 'NOTFOUND':
				message = 'error.notFoundError'
				break
			case 'Unauthorized':
				message = 'error.wrongPasswordError'
				break
			case 'DUPLICATE':
				message = 'error.duplicateError'
				break
			default:
				message = 'error.commonError'
		}
		super(message)
		this.errorType = errorType
	}

	public errorType: string
}

export function handleError(error: any): AppError {
	if (error instanceof AxiosError) {
		if (error.response && error.response.data) {
			const responseErrorType = error.response.data.error
			return new ApiCallError(responseErrorType)
		} else if (error.request) {
			return new ServerError()
		}
		return new CommonError()
	}
	return new CommonError()
}
