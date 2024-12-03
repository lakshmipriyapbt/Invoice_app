import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsGetApi } from '../Axios';
// Async thunk to fetch all product data from the server
export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  try {
    const response=await ProductsGetApi();  // Call the Customer API
    console.log('Fetched Customers:', response.data.data);  // Log the customers data (make sure it's an array)
    return response.data.data;  // Return the data
  } catch (error) {
    console.error('Error in fetchCustomers thunk:', error);
    throw new Error('Failed to fetch products');
  }
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
