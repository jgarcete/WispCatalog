import { apiClient } from './apiClient';
import type { Product, ProductsResponse } from '@/types/product';

export const PRODUCTS_PER_PAGE = 20;

// Obtener catalogo de productos con paginacion y busqueda/categoria
export const fetchCatalogRoute = async (page: number, query: string, category: string = ''): Promise<ProductsResponse> => {
  const skip = page * PRODUCTS_PER_PAGE;
  
  let endpoint = `/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
  
  if (category) {
    endpoint = `/products/category/${encodeURIComponent(category)}?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
  } else if (query.trim()) {
    endpoint = `/products/search?q=${encodeURIComponent(query)}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;
  }

  const { data } = await apiClient.get<ProductsResponse>(endpoint);
  return data;
};

// Obtener detalles de un producto por su ID
export const fetchProductDetailRoute = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
};
