// src/api/products.ts
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

// Define types for your product data
interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProductListResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with base config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout if 401 response
      useAuthStore.getState().logout();
    }
    return Promise.reject({
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      code: error.code,
    });
  }
);

export const getProducts = async (params = {}): Promise<ProductListResponse> => {
  try {
    const response = await api.get('/products', { params });
    return {
      data: response.data.data,
      total: response.data.total,
      page: response.data.page,
      limit: response.data.limit,
    };
  } catch (error) {
    throw error as ApiError;
  }
};

export const getProductById = async (id: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  try {
    const response = await api.patch(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error as ApiError;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await api.delete(`/products/${id}`);
  } catch (error) {
    throw error as ApiError;
  }
};

// Optional: Product image upload
export const uploadProductImage = async (id: string, imageFile: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.post(`/products/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.imageUrl;
  } catch (error) {
    throw error as ApiError;
  }
};