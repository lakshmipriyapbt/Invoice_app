import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch all product data from the server
export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  const response = await axios.get('http://localhost:8002/invoice/product/all');
  return response.data.data;  // Returning the entire list of products
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],    // To store the list of all products
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;  // Storing the list of products
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
