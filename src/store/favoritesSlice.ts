import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';

export const STORAGE_KEY = 'wisp_favorites_v1';

// Estado normalizado de favoritos
export interface FavoritesState {
  ids: number[]; 
  entities: Record<number, Product>; 
}

const initialState: FavoritesState = {
  ids: [],
  entities: {},
};

// Cargar el estado de forma segura desde LocalStorage
export function loadFromStorage(): FavoritesState {
  
  if (typeof window === 'undefined') return initialState;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;

    const parsed = JSON.parse(raw) as FavoritesState;
    
    if (!Array.isArray(parsed.ids) || typeof parsed.entities !== 'object') {
      return initialState;
    }
    return parsed;
  } catch {
    
    return initialState;
  }
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  // Reducers de favoritos
  reducers: {
    
    initializeFavorites(state, action: PayloadAction<FavoritesState>) {
      state.ids = action.payload.ids;
      state.entities = action.payload.entities;
    },
    
    toggleFavorite(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const index = state.ids.indexOf(product.id);
      
      if (index >= 0) {
        
        state.ids.splice(index, 1);
        delete state.entities[product.id];
      } else {
        
        state.ids.push(product.id);
        state.entities[product.id] = product;
      }
    },
    
    removeFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      state.ids = state.ids.filter((fid) => fid !== id);
      delete state.entities[id];
    },
  },
});

// Acciones exportadas
export const { initializeFavorites, toggleFavorite, removeFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
