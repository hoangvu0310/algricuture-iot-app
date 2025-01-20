import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import AuthRequest from '@/src/data/request/AuthRequest'
import AuthService from '@/src/data/service/AuthService'
import AuthorizedModel from '@/src/data/model/AuthorizedModel'
import { Success } from '@/src/data/result/Result'
import {
	saveAccessToken,
	savePassword,
	saveRefreshToken,
	saveUserId,
	saveUsername,
} from '@/src/config/storage/SecureStorage'

interface AuthState {
	authorizedModel: AuthorizedModel
	isLoading: boolean
	error: string | null
}

export const signIn = createAsyncThunk<AuthorizedModel, AuthRequest, { rejectValue: string }>(
	'auth/signin',
	async (request, { rejectWithValue }) => {
		const res = await AuthService.signIn(request)
		if (res instanceof Success) {
			const data = res.data
			await Promise.all([
				saveAccessToken(data.token),
				saveRefreshToken(data.refreshToken),
				saveUsername(request.username),
				savePassword(request.password),
				saveUserId(data.userId),
			])
			return data
		} else {
			const message = res.error.message
			return rejectWithValue(message)
		}
	},
)

export const signUp = createAsyncThunk<AuthorizedModel, AuthRequest, { rejectValue: string }>(
	'auth/signup',
	async (request, { rejectWithValue }) => {
		const res = await AuthService.signUp(request)
		if (res instanceof Success) {
			const data = res.data
			await Promise.all([
				saveAccessToken(data.token),
				saveRefreshToken(data.refreshToken),
				saveUsername(request.username),
				savePassword(request.password),
				saveUserId(data.userId),
			])
			return data
		} else {
			const message = res.error.message
			return rejectWithValue(message)
		}
	},
)

const initialState: AuthState = {
	authorizedModel: {
		userId: '',
		token: '',
		role: '',
		refreshToken: '',
	},
	isLoading: false,
	error: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		// Sign In
		builder.addCase(signIn.pending, (state) => {
			state.isLoading = true
			state.error = null
		})
		builder.addCase(signIn.fulfilled, (state, action) => {
			state.authorizedModel = action.payload
			state.isLoading = false
			state.error = null
		})
		builder.addCase(signIn.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload || null
		})
		// Sign up
		builder.addCase(signUp.pending, (state) => {
			state.isLoading = true
			state.error = null
		})
		builder.addCase(signUp.fulfilled, (state, action) => {
			state.authorizedModel = action.payload
			state.isLoading = false
			state.error = null
		})
		builder.addCase(signUp.rejected, (state, action) => {
			state.isLoading = false
			state.error = action.payload || null
		})
	},
})

export default authSlice.reducer
