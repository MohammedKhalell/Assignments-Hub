import { createSlice } from '@reduxjs/toolkit';
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
      items: JSON.parse(localStorage.getItem('favoriteTasksRedux')) || []
    },
    reducers: {
      toggleFavorite: (state, action) => {
        const taskExists = state.items.find(task => task.id === action.payload.id);
        if (!taskExists) {
          state.items.push(action.payload);
          localStorage.setItem('favoriteTasksRedux', JSON.stringify(state.items));
        }
      },
      removeFromFavorites: (state, action) => {
        state.items = state.items.filter(task => task.id !== action.payload);
        localStorage.setItem('favoriteTasksRedux', JSON.stringify(state.items));
      }
    }
  });
  

export const { toggleFavorite, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;