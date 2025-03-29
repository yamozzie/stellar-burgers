import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { orderBurgerApi } from '@api';

interface IOrderState {
  orderNumber: number | null;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IOrderState = {
  orderNumber: null,
  isLoading: false,
  isError: false
};

export const createOrder = createAsyncThunk<
  number,
  string[],
  { rejectValue: string }
>('order/createOrder', async (ids, { rejectWithValue }) => {
  try {
    const response = await orderBurgerApi(ids);
    return response.order.number;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderNumber = null;
      state.isLoading = false;
      state.isError = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderNumber = action.payload;
      })
      .addCase(createOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
