import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../controller/customerController";
import express from "express";

import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").get(protect, getCustomers).post(protect, createCustomer);
router
  .route("/:id")
  .put(protect, updateCustomer)
  .delete(protect, deleteCustomer);

export default router;
