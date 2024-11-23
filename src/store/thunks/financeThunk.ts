import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import {
  ICategory,
  ICategoryFromDB,
  Transaction,
  TransactionFromDB,
} from "../../types";

export const fetchAllCategories = createAsyncThunk<ICategoryFromDB[], void>(
  "finances/fetchAllCategories",
  async () => {
    const response = await axiosAPI(`finance-categories.json`);
    if (response.data) {
      const categoriesArray: ICategoryFromDB[] = Object.keys(response.data).map(
        (key) => ({
          ...response.data[key],
          id: key,
        }),
      );
      return categoriesArray;
    } else {
      return [];
    }
  },
);

export const createNewCategory = createAsyncThunk<void, ICategory>(
  "finances/createNewCategory",
  async (category: ICategory, thunkAPI) => {
    await axiosAPI.post("finance-categories.json", category);
    thunkAPI.dispatch(fetchAllCategories());
  },
);

export const deleteCategory = createAsyncThunk<void, string>(
  "finances/deleteCategory",
  async (id: string, thunkAPI) => {
    await axiosAPI.delete(`finance-categories/${id}.json`);
    thunkAPI.dispatch(fetchAllCategories());
  },
);

export const editCategory = createAsyncThunk<void, ICategoryFromDB>(
  "finances/editCategory",
  async (category: ICategoryFromDB, thunkAPI) => {
    await axiosAPI.put(`finance-categories/${category.id}.json`, category);
    thunkAPI.dispatch(fetchAllCategories());
  },
);

export const fetchOneCategory = createAsyncThunk<ICategoryFromDB, string>(
  "finances/fetchOneCategory",
  async (id: string) => {
    const response = await axiosAPI(`finance-categories/${id}.json`);
    if (response.data) {
      return { id, ...response.data };
    }
  },
);

export const fetchAllTransactions = createAsyncThunk<TransactionFromDB[], void>(
  "finances/fetchAllTransactions",
  async () => {
    const response = await axiosAPI(`finance-transactions.json`);
    if (response.data) {
      const transactionsArray: TransactionFromDB[] = Object.keys(
        response.data,
      ).map((key) => ({
        ...response.data[key],
        id: key,
      }));
      return transactionsArray;
    } else {
      return [];
    }
  },
);

export const fetchOneTransaction = createAsyncThunk<TransactionFromDB, string>(
  "finances/fetchOneTransaction",
  async (id: string, thunkAPI) => {
    const response = await axiosAPI(`finance-transactions/${id}.json`);
    if (response.data) {
      return { id, ...response.data };
    }
    thunkAPI.dispatch(fetchAllTransactions());
  },
);

export const createNewTransaction = createAsyncThunk<void, Transaction>(
  "finances/createNewTransaction",
  async (transaction: Transaction, thunkAPI) => {
    await axiosAPI.post("finance-transactions.json", transaction);
    thunkAPI.dispatch(fetchAllTransactions());
  },
);

export const deleteTransaction = createAsyncThunk<void, string>(
  "finances/deleteTransaction",
  async (id: string, thunkAPI) => {
    await axiosAPI.delete(`finance-transactions/${id}.json`);
    thunkAPI.dispatch(fetchAllTransactions());
  },
);

export const editTransaction = createAsyncThunk<void, TransactionFromDB>(
  "finances/editTransaction",
  async (transaction: TransactionFromDB, thunkAPI) => {
    await axiosAPI.put(
      `finance-transactions/${transaction.id}.json`,
      transaction,
    );
    thunkAPI.dispatch(fetchAllTransactions());
  },
);
