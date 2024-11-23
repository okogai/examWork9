import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import { ICategory, ICategoryFromDB } from '../../types';

export const fetchAllCategories = createAsyncThunk<ICategoryFromDB[], void>(
  "finances/fetchAllCategories",
  async () => {
    const response = await axiosAPI(
      `finance-categories.json`
    );
    if (response.data) {
      const categoriesArray: ICategoryFromDB[] = Object.keys(response.data).map(
        (key) => ({
          id: key,
          ...response.data[key],
        })
      );
      return categoriesArray;
    } else {
      return [];
    }
  }
);

export const createNewCategory = createAsyncThunk<void, ICategory>(
  "finances/createNewCategory",
  async (category: ICategory, thunkAPI) => {
    await axiosAPI.post('finance-categories.json', category);
    thunkAPI.dispatch(fetchAllCategories());
  }
);

export const deleteCategory = createAsyncThunk<void, string>(
  "finances/deleteCategory",
  async (id: string, thunkAPI) => {
    await axiosAPI.delete(`finance-categories/${id}.json`);
    thunkAPI.dispatch(fetchAllCategories());
  }
);

export const editCategory = createAsyncThunk<void, ICategoryFromDB>(
  "finances/editCategory",
  async (category: ICategoryFromDB, thunkAPI) => {
    await axiosAPI.put(`finance-categories/${category.id}.json`, {name: category.name, type: category.type});
    thunkAPI.dispatch(fetchAllCategories());
  }
);

export const fetchOneCategory = createAsyncThunk<ICategoryFromDB, string>(
  "finances/fetchOneCategory",
  async (id: string) => {
    const response = await axiosAPI(`finance-categories/${id}.json`);
    if (response.data) {
      return { id, ...response.data };
    }
  }
);

