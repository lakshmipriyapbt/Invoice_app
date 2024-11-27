import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerGetApi } from '../Axios';
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  try {
      const response = await CustomerGetApi();   // Call the Customer API
      console.log('Fetched Customers data from customerSlice:', response.data.data);  // Log the customers data (make sure it's an array)
      return response.data.data;  // Return the data
  } catch (error) {
      console.error('Error in fetchCustomers thunk:', error);
      throw new Error('Failed to fetch customers');
  }
});
const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.loading = false;
        console.log('Action Payload (Customers):', action.payload);  // Log the payload
        state.customers = action.payload;
        console.log('Updated customers in Redux state:', state.customers);
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
export default customerSlice.reducer;