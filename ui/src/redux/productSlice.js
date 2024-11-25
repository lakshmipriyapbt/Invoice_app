// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { ProductsGetApi } from '../Axios';

// // Async thunk to fetch all product data from the server
// export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
//   try {
//     const response=await ProductsGetApi();  // Call the Customer API
//     console.log('Fetched products:', response.data.data);  // Log the customers data (make sure it's an array)
//     return response.data.data;  // Return the data
//   } catch (error) {
//     console.error('Error in fetchCustomers thunk:', error);
//     throw new Error('Failed to fetch products');
//   }
// });

// const productsSlice = createSlice({
//   name: 'products',
//   initialState: {
//     products: [],    // To store the list of all products
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllProducts.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.products = action.payload;  // Storing the list of products
//       })
//       .addCase(fetchAllProducts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export default productsSlice.reducer;


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductsGetApi } from '../Axios';

// Async thunk to fetch all product data from the server
export const fetchAllProducts = createAsyncThunk('products/fetchAll', async () => {
  try {
    const products = await ProductsGetApi();  // Call the Products API
    console.log('Fetched products data:', products.data.data);  // Log the products data
    return products.data.data;  // Return the data directly from the API
  } catch (error) {
    console.error('Error in fetchAllProducts thunk:', error);
    throw error;  // Throw the error directly
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],   // To store the list of all products
    loading: false,
    error: null,    // Error state to capture errors
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Action Payload (Products):', action.payload);  // Log the payload
        state.products = action.payload;  // Store the list of products
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';  // Provide a fallback message
      });
  },
});

export default productsSlice.reducer;

