'use client';

import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { fetchCatalog, resetProducts, setSearchQuery } from '@/store/productsSlice';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { SearchX } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 } 
  }
};

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-card__image skeleton" />
      <div className="skeleton-card__body">
        <div className="skeleton-card__line skeleton-card__line--short skeleton" />
        <div className="skeleton-card__line skeleton-card__line--medium skeleton" />
        <div className="skeleton-card__line skeleton-card__line--price skeleton" />
      </div>
    </div>
  );
}

const SKELETON_COUNT = 8;

export default function ProductGrid() {
  const dispatch = useDispatch<AppDispatch>();
  
  const { items, status, error, page, hasMore, searchQuery, selectedCategory, maxPrice } = useSelector(
    (state: RootState) => state.products
  );

  const loadProducts = useCallback(
    (currentPage: number, query: string, category: string) => {
      dispatch(fetchCatalog({ page: currentPage, query, category }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (items.length === 0 && status === 'idle') {
      loadProducts(0, searchQuery, selectedCategory);
    }
  }, [items.length, status, searchQuery, selectedCategory, loadProducts]);

  const sentinelRef = useInfiniteScroll({
    hasMore,
    isLoading: status === 'loading',
    onLoadMore: () => loadProducts(page, searchQuery, selectedCategory),
  });

  const handleSearch = (query: string, category: string = selectedCategory) => {
    loadProducts(0, query, category);
  };

  const handleRetry = () => {
    dispatch(resetProducts());
    dispatch(setSearchQuery(''));
    loadProducts(0, '', selectedCategory);
  };

  const isInitialLoad = status === 'loading' && items.length === 0;

  // Ordenamiento local por precio (la API no lo soporta)
  const filteredItems = [...items].sort((a, b) => {
    if (maxPrice === 'asc') return a.price - b.price;
    if (maxPrice === 'desc') return b.price - a.price;
    return 0;
  });

  return (
    <section className="grid-section">
      <div className="container">
        {}
        <motion.div 
          className="grid-section__header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h1 className="grid-section__title">Descubrir</h1>
          <SearchBar onSearch={handleSearch} />
        </motion.div>

        {}
        {status === 'failed' && items.length === 0 ? (
          <motion.div 
            className="error-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2>Algo salió mal</h2>
            <p className="error-state__message">
              {error ?? 'No se pudieron cargar los productos. Revisa tu conexión e inténtalo de nuevo.'}
            </p>
            <button className="btn-primary" onClick={handleRetry} type="button">
              Reintentar
            </button>
          </motion.div>
        ) : (
          <>
            {}
            <motion.div 
              className="product-grid"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {isInitialLoad
                ? Array.from({ length: SKELETON_COUNT }, (_, i) => (
                    <motion.div key={`skel-${i}`} variants={itemVariants}>
                      <SkeletonCard />
                    </motion.div>
                  ))
                : filteredItems.map((product) => (
                    <motion.div 
                      key={product.id} 
                      variants={itemVariants}
                      style={{ height: '100%' }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
            </motion.div>

            {}
            {hasMore && !isInitialLoad && (
              <div className="load-more" ref={sentinelRef}>
                {status === 'loading' ? (
                  <div className="spinner" />
                ) : (
                  <button
                    className="btn-secondary"
                    onClick={() => loadProducts(page, searchQuery, selectedCategory)}
                    type="button"
                  >
                    Cargar más
                  </button>
                )}
              </div>
            )}

            {}
            {status === 'succeeded' && filteredItems.length === 0 && (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <SearchX className="empty-state__icon" size={48} strokeWidth={1.5} />
                <h2 className="empty-state__title">No se encontraron productos</h2>
                <p className="empty-state__description">
                  Intenta con un término de búsqueda diferente o explora el catálogo completo.
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
