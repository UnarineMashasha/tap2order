import { Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import Customer from "../models/Customer";
import { AuthRequest } from "../middleware/authMiddleware";

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  const userId = req.user._id;

  const totalOrders = await Order.countDocuments({ user: userId });
  const totalProducts = await Product.countDocuments({ user: userId });
  const totalCustomers = await Customer.countDocuments({ user: userId });

  const revenueResult = await Order.aggregate([
    { $match: { user: userId } },
    { $group: { _id: null, totalRevenue: { $sum: "$total" } } },
  ]);

  const recentOrders = await Order.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    totalOrders,
    totalProducts,
    totalCustomers,
    totalRevenue: revenueResult[0]?.totalRevenue || 0,
    recentOrders,
  });
};
