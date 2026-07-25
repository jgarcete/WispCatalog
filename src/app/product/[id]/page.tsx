'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Tag, Star, Heart, HeartOff } from 'lucide-react';
import { motion } from 'framer-motion';
import FavoriteButton from '@/components/FavoriteButton';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';
import { toggleFavorite } from '@/store/favoritesSlice';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useToast } from '@/components/Toast';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();
  
  const { product, status, error } = useProductDetail(params.id);
  
  const isFavorite = useSelector((state: RootState) =>
    product ? state.favorites.ids.includes(product.id) : false
  );

  const handleToggleFavorite = () => {
    if (!product) return;
    dispatch(toggleFavorite(product));
    if (isFavorite) {
      showToast('Eliminado de favoritos', 'favorite-removed');
    } else {
      showToast('Agregado a favoritos', 'favorite-added');
    }
  };

  if (status === 'loading') {
    return (
      <section className="detail">
        <div className="container">
          <div className="detail__layout">
            <div className="detail__image-wrapper skeleton" />
            <div className="detail__info">
              <div className="skeleton" style={{ width: '30%', height: 14 }} />
              <div className="skeleton" style={{ width: '80%', height: 40 }} />
              <div className="skeleton" style={{ width: '25%', height: 32 }} />
              <div className="skeleton" style={{ width: '100%', height: 80 }} />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'failed' || !product) {
    return (
      <section className="detail">
        <div className="container">
          <motion.div 
            className="error-state"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2>No se pudo cargar el producto</h2>
            <p className="error-state__message">
              {error ?? 'El producto podría no existir o la conexión falló.'}
            </p>
            <button className="btn-primary" onClick={() => router.back()} type="button">
              <ArrowLeft size={18} /> Volver
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  const originalPrice = +(
    product.price / (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <section className="detail">
      <div className="container">
        {}
        <motion.button 
          className="detail__back" 
          onClick={() => router.back()} 
          type="button"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowLeft size={18} />
          Volver
        </motion.button>

        <div className="detail__layout">
          {}
          <motion.div 
            className="detail__image-wrapper"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          >
            <img
              className="detail__image"
              src={product.images[0] ?? product.thumbnail}
              alt={product.title}
            />
          </motion.div>

          {}
          <motion.div 
            className="detail__info"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.1 }}
          >
            <span className="detail__category">{product.category}</span>
            <h1 className="detail__title">{product.title}</h1>

            <div className="detail__price-row">
              <span className="detail__price">${product.price.toFixed(2)}</span>
              {Math.round(product.discountPercentage || 0) > 0 && (
                <>
                  <span className="detail__price--original">${originalPrice}</span>
                  <span className="detail__discount">
                    -{Math.round(product.discountPercentage)}%
                  </span>
                </>
              )}
            </div>

            <p className="detail__description">{product.description}</p>

            <div className="detail__meta">
              {product.brand && (
                <span className="detail__meta-tag">
                  <Tag size={14} />
                  {product.brand}
                </span>
              )}
              <span className="detail__meta-tag">
                <Star size={14} fill="currentColor" />
                {product.rating.toFixed(1)}
              </span>
              <span className="detail__meta-tag">
                {product.stock > 0 ? `${product.stock} en stock` : 'Agotado'}
              </span>
            </div>

            <div className="detail__actions">
              <FavoriteButton product={product} />
              <button
                className={`btn-primary ${isFavorite ? 'btn-primary--active' : ''}`}
                onClick={handleToggleFavorite}
                type="button"
              >
                {isFavorite ? <HeartOff size={18} strokeWidth={2} /> : <Heart size={18} strokeWidth={2} />}
                {isFavorite ? 'Eliminar de favoritos' : 'Guardar en favoritos'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
