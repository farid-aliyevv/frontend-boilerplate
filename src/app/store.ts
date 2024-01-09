import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authReducer from '../context/auth/authSlice';
import counterReducer from '../context/counter/counterSlice';
import pageReducer from '../context/page/pageSlice';
import settingsReducer from '../context/settings/settingsSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		auth: authReducer,
		settings: settingsReducer,
		page: pageReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
