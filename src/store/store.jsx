import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../components/assignments/task-management/src/components/Slice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  }
});