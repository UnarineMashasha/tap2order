import { Response } from "express";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/authMiddleware";

export const getProducts = async (req: AuthRequest, res: Response) => {
  const products = await Product.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(products);
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  const { name, category, price, status } = req.body;

  const product = await Product.create({
    user: req.user._id,
    name,
    category,
    price,
    status,
  });

  res.status(201).json(product);
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  if (product.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  product.name = req.body.name || product.name;
  product.category = req.body.category || product.category;
  product.price = req.body.price || product.price;
  product.status = req.body.status || product.status;

  const updateProduct = await product.save();

  res.json(updateProduct);
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  if (product.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  await product.deleteOne();

  res.json({
    message: "Product deleted",
  });
};
