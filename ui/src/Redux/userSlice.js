import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UsersGetApi } from '../Axios';


// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  try {
    const response = await UsersGetApi();
    console.log('Fetched Users:', response.data);
    return response.data; // Assuming API returns an array of users
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
});

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [], // Array to store users
    loading: false, // Loading state for fetching users
    error: null, // Error message, if any
  },
  reducers: {}, // No reducers needed for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
