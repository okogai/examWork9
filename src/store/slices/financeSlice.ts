import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createNewCategory,
  createNewTransaction,
  fetchAllCategories,
  fetchAllTransactions,
  fetchOneCategory,
  fetchOneTransaction,
} from "../thunks/financeThunk.ts";
import { ICategoryFromDB, TransactionFromDB } from "../../types";

interface FinanceState {
  transactions: TransactionFromDB[];
  categories: ICategoryFromDB[];
  categoryToEdit: ICategoryFromDB | null;
  transactionToEdit: TransactionFromDB | null;
  isFetchingAllCategories: boolean;
  isFetchingAllTransactions: boolean;
  isFetchingOneCategory: boolean;
  isFetchingOneTransaction: boolean;
  isAddingNewCategory: boolean;
  isAddingNewTransaction: boolean;
  error: boolean;
}

const initialState: FinanceState = {
  transactions: [],
  categories: [],
  categoryToEdit: null,
  transactionToEdit: null,
  isFetchingAllCategories: false,
  isFetchingAllTransactions: false,
  isFetchingOneCategory: false,
  isFetchingOneTransaction: false,
  isAddingNewCategory: false,
  isAddingNewTransaction: false,
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
      .addCase(
        fetchAllCategories.fulfilled,
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
      })
      .addCase(createNewCategory.rejected, (state) => {
        state.isAddingNewCategory = false;
        state.error = true;
      })
      .addCase(fetchOneCategory.pending, (state) => {
        state.isFetchingOneCategory = true;
        state.error = false;
      })
      .addCase(
        fetchOneCategory.fulfilled,
        (state, action: PayloadAction<ICategoryFromDB>) => {
          state.isFetchingOneCategory = false;
          state.categoryToEdit = action.payload;
        },
      )
      .addCase(fetchOneCategory.rejected, (state) => {
        state.isFetchingOneCategory = false;
        state.error = true;
      })
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isFetchingAllTransactions = true;
        state.error = false;
      })
      .addCase(
        fetchAllTransactions.fulfilled,
        (state, action: PayloadAction<TransactionFromDB[]>) => {
          state.isFetchingAllTransactions = false;
          state.transactions = action.payload;
        },
      )
      .addCase(fetchAllTransactions.rejected, (state) => {
        state.isFetchingAllTransactions = false;
        state.error = true;
      })
      .addCase(fetchOneTransaction.pending, (state) => {
        state.isFetchingOneTransaction = true;
        state.error = false;
      })
      .addCase(
        fetchOneTransaction.fulfilled,
        (state, action: PayloadAction<TransactionFromDB>) => {
          state.isFetchingOneTransaction = false;
          state.transactionToEdit = action.payload;
        },
      )
      .addCase(fetchOneTransaction.rejected, (state) => {
        state.isFetchingOneTransaction = false;
        state.error = true;
      })
      .addCase(createNewTransaction.pending, (state) => {
        state.isAddingNewTransaction = true;
        state.error = false;
      })
      .addCase(createNewTransaction.fulfilled, (state) => {
        state.isAddingNewTransaction = false;
      })
      .addCase(createNewTransaction.rejected, (state) => {
        state.isAddingNewTransaction = false;
        state.error = true;
      });
  },
});

export const financeReducer = financeSlice.reducer;
