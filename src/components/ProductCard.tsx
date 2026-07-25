import Link from 'next/link';
import type { Product } from '@/types/product';
import FavoriteButton from '@/components/FavoriteButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discountedPrice = product.price;

  const originalPrice = +(
    product.price / (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Link href={`/product/${product.id}`} className="card" aria-label={`Ver ${product.title}`}>
      
      {}
      <div className="card__image-wrapper">
        <img className="card__image" src={product.thumbnail} alt={product.title} loading="lazy" />
        <div className="card__favorite">
          <FavoriteButton product={product} />
        </div>
      </div>
      
      {}
      <div className="card__body">
        <span className="card__category">{product.category}</span>
        <h3 className="card__title">{product.title}</h3>
        <div className="card__price-row">
          <span className="card__price">${discountedPrice.toFixed(2)}</span>
          
          {Math.round(product.discountPercentage || 0) > 0 && (
            <span className="card__price--original">${originalPrice}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
