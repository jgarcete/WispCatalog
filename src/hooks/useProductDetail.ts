import { useState, useEffect } from 'react';
import { fetchProductDetailRoute } from '@/routes/productRoutes';
import type { Product } from '@/types/product';

export function useProductDetail(id: string | string[] | undefined) {
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<'loading' | 'succeeded' | 'failed'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    if (!id || Array.isArray(id)) return;

    let cancelled = false;
    setTimeout(() => setStatus('loading'), 0);

    fetchProductDetailRoute(id)
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          setStatus('succeeded');
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message ?? 'Error al cargar el producto');
          setStatus('failed');
        }
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { product, status, error };
}
