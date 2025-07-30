// src/features/products/ProductList.tsx
import { useQuery } from 'react-query';
import { getProducts } from '../../api/products';
import ProductCard from './ProductCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import Pagination from '../../components/Pagination';
import { useState } from 'react';

const ProductList = () => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery(['products', { page, limit }], () =>
    getProducts({ page, limit, sort: 'createdAt:desc' })
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorAlert message={(error as Error).message} />;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              ...product,
              createdAt: typeof product.createdAt === 'string'
                ? product.createdAt
                : product.createdAt.toISOString(),
              updatedAt: product.updatedAt
                ? (typeof product.updatedAt === 'string'
                    ? product.updatedAt
                    : product.updatedAt.toISOString())
                : undefined,
            }}
          />
        ))}
      </div>

      {data && data.total > limit && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(data.total / limit)}
          onPageChange={setPage}
        />
      )}
    </div>
  );
};

export default ProductList;