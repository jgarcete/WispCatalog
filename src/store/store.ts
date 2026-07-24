import { configureStore } from '@reduxjs/toolkit';

import productsReducer from '@/store/productsSlice';
import favoritesReducer, { STORAGE_KEY } from '@/store/favoritesSlice';

// Configuracion del store central
export const store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
  },
});

// Middleware para persistir favoritos en localstorage
store.subscribe(() => {
  
  if (typeof window !== 'undefined') {
    try {
      const state = store.getState().favorites;
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      
    }
  }
});

// Exportamos tipos para permitir autocompletado en useSelector y useDispatch en toda la app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
