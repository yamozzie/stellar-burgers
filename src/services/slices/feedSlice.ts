import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  isError: boolean;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  isError: false
};

export const fetchFeed = createAsyncThunk(
  'feed/fetchfeed',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      });
  }
});

export default feedSlice.reducer;
