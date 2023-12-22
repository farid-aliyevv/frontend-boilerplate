import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from 'api/services/auth';
import { LoginRequestDto } from 'api/services/auth.dto';
import { RootState } from 'app/store';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from 'configs/constants';
import { getUserFromToken } from 'utils/get-user-from-token';

import { AuthState } from './types';

const getInitialState = (): AuthState => {
	const user = getUserFromToken();
	if (!user) return { currentUser: null, isLoggedIn: false };

	return { currentUser: user, isLoggedIn: true };
};

const initialState: AuthState = getInitialState();

export const loginAsync = createAsyncThunk('auth/login', async (data: LoginRequestDto) => {
	try {
		const response = await auth.login(data);

		return response;
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} catch (error: any) {
		throw new Error(JSON.stringify(error.response.data));
	}
});

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginAsync.fulfilled, (state, { payload }) => {
				state.isLoggedIn = true;

				const { accessToken, refreshToken } = payload;
				localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
				localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

				state.currentUser = getUserFromToken();
			})
			.addCase(loginAsync.rejected, (_, { error }) => {
				throw error;
			});
	},
});

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
