import { apiClient } from './apiClient';
import type { Product, ProductsResponse } from '@/types/product';

export const PRODUCTS_PER_PAGE = 20;

// Obtener catalogo de productos con paginacion y busqueda
export const fetchCatalogRoute = async (page: number, query: string): Promise<ProductsResponse> => {
  const skip = page * PRODUCTS_PER_PAGE;
  const endpoint = query.trim()
    ? `/products/search?q=${encodeURIComponent(query)}&limit=${PRODUCTS_PER_PAGE}&skip=${skip}`
    : `/products?limit=${PRODUCTS_PER_PAGE}&skip=${skip}`;

  const { data } = await apiClient.get<ProductsResponse>(endpoint);
  return data;
};

// Obtener detalles de un producto por su ID
export const fetchProductDetailRoute = async (id: string): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
};
