import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { companyViewApi } from '../Axios';

// Async thunk to fetch companies
export const fetchCompanies = createAsyncThunk('companies/fetchCompanies', async () => {
  try {
    const response = await companyViewApi();
    console.log('Fetched Companies:', response.data.data);
    return response.data.data; // Assuming API returns an array of companies
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw new Error('Failed to fetch companies');
  }
});

const companySlice = createSlice({
  name: 'companies',
  initialState: {
    companies: [], // Array to store companies
    loading: false, // Loading state for fetching companies
    error: null, // Error message, if any
  },
  reducers: {}, // No reducers needed for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.loading = false;
        state.companies = action.payload;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});
// export CompanySlice
export default companySlice.reducer;
