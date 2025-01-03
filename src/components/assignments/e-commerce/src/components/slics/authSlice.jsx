import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../../services/e-commerce_api';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password
      });
      
      // Store token only if login is successful
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        return response.data;
      } else {
        return rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      // Handle specific error cases
      if (error.response?.status === 401) {
        return rejectWithValue('Invalid email or password');
      }
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);
export const signup = createAsyncThunk(
    'auth/signup',
    async (userData, { rejectWithValue }) => {
      try {
        const signupData = {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          avatar: 'https://picsum.photos/800',
          role: 'customer'
        };
  
        const response = await api.post('/users', signupData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Registration failed');
      }
    }
  );
  
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'),
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.error = null;
    })
    .addCase(login.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    })
    .addCase(signup.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(signup.fulfilled, (state, action) => {
      state.status = 'succeeded';
    })
    .addCase(signup.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
