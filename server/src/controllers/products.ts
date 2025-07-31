import { Request, Response } from 'express';
import Product from '../models/products';

// // Get all products (with pagination)
// export const getProducts = async (req: Request, res: Response) => {
// const page = parseInt(req.query.page as string) || 1;
// const limit = parseInt(req.query.limit as string) || 20;
// const skip = (page - 1) * limit;

//     const [data, total] = await Promise.all([
//         Product.find().skip(skip).limit(limit),
//     Product.countDocuments()
//     ]);

//     res.json({ data, total, page, limit });
// };

// Get all products (with pagination and filtering)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const skip = (page - 1) * limit;
    
    // Extract filter parameters
    const { search, category, sort, stock } = req.query;
    
    // Build query object
    let query: any = {};
    
    // Search filter - search in name and description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Stock filter
    if (stock !== undefined) {
      if (Number(stock) === 0) {
        query.stock = 0; // Out of stock
      } else {
        query.stock = { $gt: 0 }; // In stock
      }
    }
    
    // Sorting
    let sortObj: any = { createdAt: -1 }; // Default sort
    if (sort) {
      const [sortField, sortOrder] = (sort as string).split(':');
      sortObj = {};
      sortObj[sortField] = sortOrder === 'desc' ? -1 : 1;
    }
    
    // Execute queries
    const [data, total] = await Promise.all([
      Product.find(query).sort(sortObj).skip(skip).limit(limit),
      Product.countDocuments(query)
    ]);

    res.json({ data, total, page, limit });
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);
       if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
};

// Create product
export const createProduct = async (req: Request, res: Response) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(204).send();
};