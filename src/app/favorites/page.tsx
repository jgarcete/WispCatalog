'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { HeartOff } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 } 
  }
};

export default function FavoritesPage() {
  const { ids, entities } = useSelector((state: RootState) => state.favorites);

  return (
    <section className="grid-section">
      <div className="container">
        <motion.div 
          className="grid-section__header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="grid-section__title">Tus Favoritos</h1>
        </motion.div>

        {ids.length === 0 ? (
          <motion.div 
            className="empty-state"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <HeartOff className="empty-state__icon" size={48} strokeWidth={1.5} />
            <h2 className="empty-state__title">Aún no tienes favoritos</h2>
            <p className="empty-state__description">
              Explora el catálogo y toca el icono de corazón en los productos que te encanten.
            </p>
            <Link href="/catalog" className="btn-primary">
              Explorar catálogo
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            className="product-grid"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {ids.map((id) => {
              const product = entities[id];
              return product ? (
                <motion.div key={id} variants={itemVariants} style={{ height: '100%' }}>
                  <ProductCard product={product} />
                </motion.div>
              ) : null;
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
