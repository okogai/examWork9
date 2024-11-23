import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNewCategory, fetchAllCategories, fetchOneCategory } from '../thunks/financeThunk.ts';
import { ICategoryFromDB, Transaction } from '../../types';

interface FinanceState {
  transactions: Transaction[];
  categories: ICategoryFromDB[];
  categoryToEdit: ICategoryFromDB | null;
  isFetchingAllCategories: boolean;
  isFetchingOneCategory: boolean;
  isAddingNewCategory: boolean;
  error: boolean;
}

const initialState: FinanceState = {
  transactions: [],
  categories: [],
  categoryToEdit: null,
  isFetchingAllCategories: false,
  isFetchingOneCategory: false,
  isAddingNewCategory: false,
  error: false,
};

export const financeSlice = createSlice({
  name: "finances",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.isFetchingAllCategories = true;
        state.error = false;
      })
      .addCase(fetchAllCategories.fulfilled,
        (state, action: PayloadAction<ICategoryFromDB[]>) => {
          state.isFetchingAllCategories = false;
          state.categories = action.payload;
        },
      )
      .addCase(fetchAllCategories.rejected, (state) => {
        state.isFetchingAllCategories = false;
        state.error = true;
      })
      .addCase(createNewCategory.pending, (state) => {
      state.isAddingNewCategory = true;
      state.error = false;
      })
      .addCase(createNewCategory.fulfilled, (state) => {
          state.isAddingNewCategory = false;
        },
        )
      .addCase(createNewCategory.rejected, (state) => {
        state.isAddingNewCategory = false;
        state.error = true;
      })
      .addCase(fetchOneCategory.pending, (state) => {
        state.isFetchingOneCategory = true;
        state.error = false;
      })
      .addCase(fetchOneCategory.fulfilled,
        (state, action: PayloadAction<ICategoryFromDB>) => {
          state.isFetchingOneCategory = false;
          state.categoryToEdit = action.payload;
        },
      )
      .addCase(fetchOneCategory.rejected, (state) => {
        state.isFetchingOneCategory = false;
        state.error = true;
      });
  },
});

export const financeReducer = financeSlice.reducer;
