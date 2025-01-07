import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import favoritesReducer from '../components/assignments/task-management/src/components/Slice';
import productsReducer from '../slics/productsSlice';
import authReducer from '../slics/authSlice';
import cartReducer from '../slics/cartSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  auth: authReducer,
  cart: cartReducer,
  favorites: favoritesReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites', 'auth', 'cart'] // Persist these slices
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
