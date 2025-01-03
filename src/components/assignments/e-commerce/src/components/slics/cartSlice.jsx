import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalAmount: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        item => item.id === action.payload.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        item => item.id !== action.payload
      );
      
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
