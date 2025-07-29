// src/features/products/ProductsPage.tsx
import { useState } from 'react';
import ProductList from './ProductList';
import ProductForm from './ProductForm';
import { Button } from '@mui/material';

const ProductsPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button
          variant="contained"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Hide Form' : 'Add Product'}
        </Button>
      </div>

      {showForm && (
        <div className="mb-8">
          <ProductForm />
        </div>
      )}

      <ProductList />
    </div>
  );
};

export default ProductsPage;