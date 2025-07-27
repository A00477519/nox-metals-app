// src/features/products/ProductForm.tsx
import { useMutation, useQueryClient } from 'react-query';
import { createProduct, uploadProductImage } from '../../api/products';
import { useForm } from 'react-hook-form';
import { ProductFormValues } from './types';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingButton from '../../components/LoadingButton';

const ProductForm = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormValues>();

  const mutation = useMutation(
    async (formData: ProductFormValues) => {
      const product = await createProduct({
        name: formData.name,
        price: formData.price,
        description: formData.description,
        category: formData.category,
        stock: formData.stock,
      });

      if (formData.image) {
        await uploadProductImage(product.id, formData.image);
      }

      return product;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');
        reset();
        // Show success notification
      },
    }
  );

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Product Name</label>
        <input
          id="name"
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          step="0.01"
          {...register('price', {
            required: 'Price is required',
            min: { value: 0.01, message: 'Price must be positive' },
          })}
        />
        {errors.price && <span>{errors.price.message}</span>}
      </div>

      {/* Add other form fields similarly */}

      <div>
        <label htmlFor="image">Product Image</label>
        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              // Handle file upload
            }
          }}
        />
      </div>

      <LoadingButton
        loading={mutation.isLoading}
        type="submit"
      >
        Create Product
      </LoadingButton>

      {mutation.isError && (
        <ErrorAlert message={(mutation.error as Error).message} />
      )}
    </form>
  );
};

export default ProductForm;