import { Response } from "express";
import Customer from "../models/Customer";
import { AuthRequest } from "../middleware/authMiddleware";

export const getCustomers = async (req: AuthRequest, res: Response) => {
  const customers = await Customer.find({
    user: req.user._id,
  }).sort({ createdAt: -1 });

  res.json(customers);
};

export const createCustomer = async (req: AuthRequest, res: Response) => {
  const { name, phone, status } = req.body;

  const customer = await Customer.create({
    user: req.user._id,
    name,
    phone,
    totalOrders: 0,
    lastOrder: "No orders yet",
    status,
  });

  res.status(201).json(customer);
};

export const updateCustomer = async (req: AuthRequest, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  if (customer.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  customer.name = req.body.name || customer.name;
  customer.phone = req.body.phone || customer.phone;
  customer.status = req.body.status || customer.status;

  const updatedCustomer = await customer.save();

  res.json(updatedCustomer);
};

export const deleteCustomer = async (req: AuthRequest, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) {
    return res.status(404).json({
      message: "Customer not found",
    });
  }

  if (customer.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  await customer.deleteOne();

  res.json({
    message: "Customer deleted",
  });
};
