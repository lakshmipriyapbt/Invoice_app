import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { InvoiceGetApi } from '../Axios';

export const fetchInvoices = createAsyncThunk('invoices/fetchInvoices', async () => {
  try {
      const response = await InvoiceGetApi();  // Call the Customer API
      console.log('Fetched Invoices:', response.data.data);  // Log the customers data (make sure it's an array)
      return response.data.data;  // Return the data
  } catch (error) {
      console.error('Error in fetchInvoices thunk:', error);
      throw new Error('Failed to fetch Invoices');
  }
});

const invoiceSlice = createSlice({
  name: 'invoices',
  initialState: {
    invoices: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.invoices = action.payload || [];;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default invoiceSlice.reducer;
