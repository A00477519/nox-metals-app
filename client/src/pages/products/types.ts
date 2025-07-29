// src/features/products/types.ts
export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    category?: string;
    stock: number;
    imageUrl?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface ProductListResponse {
    data: Product[];
    total: number;
    page: number;
    limit: number;
  }
  
  export interface ProductFormValues {
    name: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    image?: File;
  }