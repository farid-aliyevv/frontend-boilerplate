import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { LANGUAGE_KEY } from 'configs/constants';
import { Language } from 'types/enum';

import { SettingsState } from './types';

const getInitialLanguage = (): Language => {
	let storedLanguage = localStorage.getItem(LANGUAGE_KEY);

	if (!storedLanguage || !Object.values(Language).includes(storedLanguage as Language)) {
		storedLanguage = Language.AZ;
		localStorage.setItem(LANGUAGE_KEY, storedLanguage);
	}

	return storedLanguage as Language;
};

const initialState: SettingsState = {
	language: getInitialLanguage(),
};

export const settingsSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload;
			localStorage.setItem(LANGUAGE_KEY, action.payload);
		},
	},
});

export const { setLanguage } = settingsSlice.actions;

export const selectLanguage = (state: RootState) => state.settings.language;

export default settingsSlice.reducer;
