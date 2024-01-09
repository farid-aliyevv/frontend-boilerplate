import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

import { PageState } from './types';

const initialState: PageState = {
	title: '',
};

export const pageSlice = createSlice({
	name: 'page',
	initialState,
	reducers: {
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload;
		},
	},
});

export const { setTitle } = pageSlice.actions;

export const selectTitle = (state: RootState) => state.page.title;

export default pageSlice.reducer;
