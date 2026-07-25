'use client';

import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import type { Product } from '@/types/product';
import { toggleFavorite } from '@/store/favoritesSlice';
import { useToast } from '@/components/Toast';

import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface FavoriteButtonProps {
  product: Product;
  className?: string;
}

export default function FavoriteButton({ product, className = '' }: FavoriteButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.ids.includes(product.id)
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Actualizar favoritos en el store
    dispatch(toggleFavorite(product));

    if (isFavorite) {
      showToast('Eliminado de favoritos', 'favorite-removed');
    } else {
      showToast('Agregado a favoritos', 'favorite-added');
    }
  };

  // Componente animado
  return (
    <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.8 }} className={`fav-btn ${isFavorite ? 'fav-btn--active' : 'fav-btn--inactive'} ${className}`} onClick={handleClick} aria-label={isFavorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'} type="button">
      <motion.div key={isFavorite ? 'fav' : 'unfav'} initial={{ scale: 0.3, opacity: 0, rotate: -30 }} animate={{ scale: 1, opacity: 1, rotate: 0, filter: isFavorite ? 'drop-shadow(0 0 12px rgba(193, 162, 122, 0.9))' : 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.15))' }} transition={{ type: 'spring', stiffness: 500, damping: 15 }}>
        <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} strokeWidth={2} />
      </motion.div>
    </motion.button>
  );
}
