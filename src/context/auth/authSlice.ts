/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth } from 'api/services/auth/auth';
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

const createAuthThunk = <T, U>(type: string, authMethod: (data: T) => Promise<U>) =>
	createAsyncThunk(type, async (data: T) => {
		try {
			const response = await authMethod(data);

			return response;
		} catch (error: any) {
			throw new Error(JSON.stringify(error.response?.data));
		}
	});

export const loginAsync = createAuthThunk('auth/login', auth.login);
export const refreshTokenAsync = createAuthThunk('auth/refreshToken', auth.refreshToken);
export const logoutAsync = createAuthThunk('auth/logout', auth.revokeToken);

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
			})
			.addCase(refreshTokenAsync.fulfilled, (_, { payload }) => {
				const { accessToken, refreshToken } = payload;
				localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
				localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
			})
			.addCase(refreshTokenAsync.rejected, (_, { error }) => {
				throw error;
			})
			.addCase(logoutAsync.fulfilled, (state) => {
				state.isLoggedIn = false;
				state.currentUser = null;
				localStorage.removeItem(ACCESS_TOKEN_KEY);
				localStorage.removeItem(REFRESH_TOKEN_KEY);
			})
			.addCase(logoutAsync.rejected, (_, { error }) => {
				throw error;
			});
	},
});

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
