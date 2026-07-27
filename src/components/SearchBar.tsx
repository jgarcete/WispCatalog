'use client';

import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { resetProducts, setSearchQuery, setCategory, setMaxPrice } from '@/store/productsSlice';
import { Search, X, SlidersHorizontal, ArrowDownUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterDropdown from './FilterDropdown';

const SHOW_CATEGORY_FILTER = true; // Flag oculto para habilitar
const SHOW_PRICE_FILTER = true; // Flag oculto para precio

const CATEGORY_OPTIONS = [
  { value: '', label: 'Todas' },
  { value: 'smartphones', label: 'Teléfonos' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'fragrances', label: 'Perfumes' },
  { value: 'skincare', label: 'Cuidado de piel' },
  { value: 'home-decoration', label: 'Decoración' },
  { value: 'furniture', label: 'Muebles' },
  { value: 'womens-dresses', label: 'Ropa de mujer' },
  { value: 'mens-shirts', label: 'Ropa de hombre' },
  { value: 'sunglasses', label: 'Lentes' },
  { value: 'automotive', label: 'Automotriz' },
];

const PRICE_OPTIONS = [
  { value: '', label: 'Sin orden' },
  { value: 'asc', label: 'Menor a mayor' },
  { value: 'desc', label: 'Mayor a menor' },
];

interface SearchBarProps {
  onSearch: (query: string, category?: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery);
  const selectedCategory = useSelector((state: RootState) => state.products.selectedCategory);
  const maxPrice = useSelector((state: RootState) => state.products.maxPrice);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));

    // Si el usuario escribe algo, limpiamos la categoria seleccionada
    if (value.trim() !== '') {
      dispatch(setCategory(''));
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dispatch(resetProducts());
      onSearch(value, '');
    }, 300);
  };

  const handleClear = () => {
    dispatch(setSearchQuery(''));
    dispatch(resetProducts());
    onSearch('', selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    dispatch(setCategory(category));

    // Si el usuario elige una categoria, limpiamos el texto de busqueda
    if (category !== '') {
      dispatch(setSearchQuery(''));
      if (timerRef.current) clearTimeout(timerRef.current);
    }

    dispatch(resetProducts());
    onSearch('', category);
  };

  const handlePriceChange = (value: string) => {
    dispatch(setMaxPrice(value));
  };

  const showFilters = SHOW_CATEGORY_FILTER || SHOW_PRICE_FILTER;

  return (
    <div className="search-bar-wrapper">
      {/* Barra de busqueda principal */}
      <div className="search">
        <Search className="search__icon" size={20} />
        <input
          className="search__input"
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleChange}
          aria-label="Buscar productos"
        />
        <AnimatePresence>
          {searchQuery.length > 0 && (
            <motion.button
              className="search__clear"
              onClick={handleClear}
              type="button"
              aria-label="Limpiar búsqueda"
              initial={{ opacity: 0, scale: 0.5, y: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%' }}
              exit={{ opacity: 0, scale: 0.5, y: '-50%' }}
              transition={{ duration: 0.15 }}
            >
              <X size={16} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Selectores de filtro */}
      {showFilters && (
        <div className="search-filters">
          {SHOW_CATEGORY_FILTER && (
            <FilterDropdown
              icon={<SlidersHorizontal size={16} />}
              options={CATEGORY_OPTIONS}
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder="Categoría"
              ariaLabel="Filtrar por categoría"
            />
          )}

          {SHOW_PRICE_FILTER && (
            <FilterDropdown
              icon={<ArrowDownUp size={16} />}
              options={PRICE_OPTIONS}
              value={maxPrice}
              onChange={handlePriceChange}
              placeholder="Precio"
              ariaLabel="Ordenar por precio"
            />
          )}
        </div>
      )}
    </div>
  );
}
