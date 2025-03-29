import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

interface IngredientState {
  items: TIngredient[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: IngredientState = {
  items: [],
  isLoading: false,
  isError: false
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getIngredientsApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const ingredientSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  }
});

export default ingredientSlice.reducer;
