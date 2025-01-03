import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favoritesReducer from '../components/assignments/task-management/src/components/Slice';
import productsReducer from '../components/assignments/e-commerce/src/components/slics/productsSlice';
import authReducer from '../components/assignments/e-commerce/src/components/slics/authSlice';
import cartReducer from '../components/assignments/e-commerce/src/components/slics/cartSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favorites'] // Only persist favorites slice
};

const persistedReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    cart: cartReducer,
    favorites: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  
});

export const persistor = persistStore(store);
