import { Request, Response } from 'express';
import Product from '../models/products';

// Get all products (with pagination)
export const getProducts = async (req: Request, res: Response) => {
const page = parseInt(req.query.page as string) || 1;
const limit = parseInt(req.query.limit as string) || 20;
const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        Product.find().skip(skip).limit(limit),
    Product.countDocuments()
    ]);

    res.json({ data, total, page, limit });
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