import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: []
  },
  reducers: {
    toggleFavorite: (state, action) => {
      const taskExists = state.items.find(task => task.id === action.payload.id);
      if (!taskExists) {
        state.items.push(action.payload);
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    }
  }
});

const persistConfig = {
  key: 'favorites',
  storage,
  whitelist: ['items']
};

const persistedFavoritesReducer = persistReducer(persistConfig, favoritesSlice.reducer);

export const { toggleFavorite, removeFromFavorites } = favoritesSlice.actions;
export default persistedFavoritesReducer;
