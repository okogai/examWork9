import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllCategories } from '../thunks/financeThunk.ts';
import { ICategory } from '../../types';

interface tvShowsState {
  categories: ICategory[];
  fetchAllCategories: boolean;
  error: boolean;
}

const initialState: tvShowsState = {
  categories: [],
  fetchAllCategories: false,
  error: false,
};

export const financeSlice = createSlice({
  name: 'finances',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.fetchAllCategories = true;
        state.error = false;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action: PayloadAction<ICategory[]>) => {
        state.fetchAllCategories = false;
        state.categories = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state) => {
        state.fetchAllCategories = false;
        state.error = true;
      });
  },
});

export const tvShowsReducer = financeSlice.reducer;

