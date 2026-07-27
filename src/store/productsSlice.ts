import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Product } from '@/types/product';
import { fetchCatalogRoute } from '@/routes/productRoutes';

interface ProductsState {
  items: Product[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; 
  error: string | null; 
  page: number; 
  hasMore: boolean; 
  searchQuery: string; 
  selectedCategory: string;
  maxPrice: string;
}

const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
  page: 0,
  hasMore: true,
  searchQuery: '',
  selectedCategory: '',
  maxPrice: '',
};

// Peticion a la API
export const fetchCatalog = createAsyncThunk(
  'products/fetchCatalog',
  async ({ page, query, category }: { page: number; query: string; category?: string }) => {
    
    const data = await fetchCatalogRoute(page, query, category);

    return { ...data, page };
  }
);

// Estado de productos
const productsSlice = createSlice({
  name: 'products',
  initialState,

  // Reducers de productos
  reducers: {
    
    resetProducts(state) {
      state.items = [];
      state.page = 0;
      state.hasMore = true;
      state.status = 'idle';
      state.error = null;
    },
    
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setMaxPrice(state, action) {
      state.maxPrice = action.payload;
    },
  },

  // Reducers para la peticion a la API
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchCatalog.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const isFirstPage = action.payload.page === 0;

        state.items = isFirstPage
          ? action.payload.products
          : [...state.items, ...action.payload.products];

        state.page = action.payload.page + 1;
        
        state.hasMore = state.items.length < action.payload.total;
      })
      
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

// Acciones exportadas
export const { resetProducts, setSearchQuery, setCategory, setMaxPrice } = productsSlice.actions;
export default productsSlice.reducer;
