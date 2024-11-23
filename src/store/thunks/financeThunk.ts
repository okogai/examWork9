import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosAPI from '../../utils/axiosAPI.ts';
import { ICategory } from '../../types';

export const fetchAllCategories = createAsyncThunk<ICategory[], void>(
  'finances/fetchAllCategories',
  async () => {
    const response = await axiosAPI<{ [key: string]: ICategory }>(`finance-categories.json`);

    if (response.data) {
      const categoriesArray: ICategory[] = Object.keys(response.data).map((key) => ({
        id: key,
        ...response.data[key],
      }));
      return categoriesArray;
    } else {
      return [];
    }
  }
);
