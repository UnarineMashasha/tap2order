import { Response } from "express";
import Order from "../models/Order";
import { AuthRequest } from "../middleware/authMiddleware";

export const getOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(orders);
};

export const createOrder = async (req: AuthRequest, res: Response) => {
  const { customer, item, total, status } = req.body;

  const order = await Order.create({
    user: req.user._id,
    customer,
    item,
    total,
    status,
  });

  res.status(201).json(order);
};

export const updateOrder = async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  order.customer = req.body.customer || order.customer;
  order.item = req.body.item || order.item;
  order.total = req.body.total || order.total;
  order.status = req.body.status || order.status;

  const updatedOrder = await order.save();

  res.json(updatedOrder);
};

export const deleteOrder = async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }

  if (order.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  await order.deleteOne();

  res.json({
    message: "Order deleted",
  });
};
