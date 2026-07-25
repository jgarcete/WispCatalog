'use client';

import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { resetProducts, setSearchQuery } from '@/store/productsSlice';

import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const searchQuery = useSelector((state: RootState) => state.products.searchQuery);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchQuery(value));
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      dispatch(resetProducts());
      onSearch(value);
    }, 300);
  };

  const handleClear = () => {
    dispatch(setSearchQuery(''));
    dispatch(resetProducts());
    onSearch('');
  };

  return (
    <div className="search">
      <Search className="search__icon" size={20} />
      
      <input className="search__input" type="text" placeholder="Buscar productos..." value={searchQuery} onChange={handleChange} aria-label="Buscar productos" />
      
      <AnimatePresence>
        {searchQuery.length > 0 && (
          <motion.button className="search__clear" onClick={handleClear} type="button" aria-label="Limpiar búsqueda" initial={{ opacity: 0, scale: 0.5, y: '-50%' }} animate={{ opacity: 1, scale: 1, y: '-50%' }} exit={{ opacity: 0, scale: 0.5, y: '-50%' }} transition={{ duration: 0.15 }}>
            <X size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
