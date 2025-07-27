// src/features/products/ProductCard.tsx
import { Product } from './types';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-100">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-lg hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
        {product.stock > 0 ? (
          <span className="text-sm text-green-600">In Stock</span>
        ) : (
          <span className="text-sm text-red-600">Out of Stock</span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;